// Import TensorFlow.js library


const tf = require('@tensorflow/tfjs');

// Sample user data with their liked posts
const userData = [
    { userId: 1, likedPosts: ['post1', 'post3', 'post5'] },
    { userId: 2, likedPosts: ['post2', 'post4', 'post6'] },
    // Add more user data as needed
];

// Sample post data with their content and creation date
const postData = [
    { postId: 'post1', content: 'Some text related to post 1', createdAt: new Date('2024-03-01') },
    { postId: 'post2', content: 'Some text related to post 2', createdAt: new Date('2024-03-02') },
    { postId: 'post3', content: 'Some text related to post 3', createdAt: new Date('2024-03-03') },
    { postId: 'post4', content: 'Some text related to post 4', createdAt: new Date('2024-03-04') },
    { postId: 'post5', content: 'Some text related to post 5', createdAt: new Date('2024-03-05') },
    { postId: 'post6', content: 'Some text related to post 6', createdAt: new Date('2024-03-06') },
    // Add more post data as needed
];

// Function to create word embeddings for post content
async function createWordEmbeddings() {
    const postContents = postData.map(post => post.content);
    const tokenizer = new tf.layers.Tokenizer();
    tokenizer.fitOnTexts(postContents);
    const sequences = tokenizer.textsToSequences(postContents);
    const paddedSequences = tf.keras.preprocessing.sequence.padSequences(sequences);
    const vocabSize = tokenizer.wordIndex.length + 1;
    const embeddingSize = 100; // Increase embedding size for richer representations
    const model = tf.sequential();
    model.add(tf.layers.embedding({ inputDim: vocabSize, outputDim: embeddingSize, inputLength: paddedSequences.shape[1] }));
    model.add(tf.layers.GlobalAveragePooling1D()); // Use GlobalAveragePooling for simplicity and efficiency
    await model.compile({ optimizer: 'adam', loss: 'binaryCrossentropy', metrics: ['accuracy'] });
    return model.predict(paddedSequences);
}

// Function to recommend posts for a given user
async function recommendPosts(userId) {
    const userLikes = getUserLikes(userId);
    const postEmbeddings = await createWordEmbeddings();

    // Combine user-post interaction data and post content embeddings
    const inputFeatures = [];
    const labels = [];
    userData.forEach(user => {
        const userVector = Array.from({ length: postEmbeddings.shape[1] }, () => 0); // Use shape[1] for post embedding size
        user.likedPosts.forEach(likedPost => {
            const postIndex = postData.findIndex(post => post.postId === likedPost);
            if (postIndex !== -1) {
                const postVector = postEmbeddings.slice([postIndex, 0], [1, postEmbeddings.shape[1]]);
                userVector.forEach((value, index) => {
                    userVector[index] += postVector.dataSync()[index]; // Access dataSync directly
                });
            }
        });
        inputFeatures.push(userVector);
        labels.push(user.userId === userId ? 1 : 0);
    });

    // Negative sampling: add some randomly selected negative samples
    for (let i = 0; i < userData.length * 2; i++) {
        const randomUserId = Math.floor(Math.random() * userData.length);
        if (randomUserId !== userId) {
            const userVector = Array.from({ length: postEmbeddings.shape[1] }, () => 0);
            inputFeatures.push(userVector);
            labels.push(0);
        }
    }

    // Convert to tensors
    const xs = tf.tensor2d(inputFeatures);
    const ys = tf.tensor1d(labels);

    // Build and train neural network model
    const model = tf.sequential();
    model.add(tf.layers.dense({ units: 128, activation: 'relu', inputShape: [postEmbeddings.shape[1]], kernelRegularizer: tf.regularizers.l2({ l2: 0.01 }) })); // Add L2 regularization
    model.add(tf.layers.dropout({ rate: 0.5 }));
    model.add(tf.layers.dense({ units: 64, activation: 'relu', kernelRegularizer: tf.regularizers.l2({ l2: 0.01 }) })); // Add L2 regularization
    model.add(tf.layers.dropout({ rate: 0.5 }));
    model.add(tf.layers.dense({ units: 1, activation: 'sigmoid' }));
    await model.compile({ optimizer: 'adam', loss: 'binaryCrossentropy', metrics: ['accuracy'] });
    await model.fit(xs, ys, { epochs: 20, batch_size: 32, callbacks: [tf.callbacks.earlyStopping({ monitor: 'val_loss', patience: 3 })] }); // Use early stopping

    // Make predictions for all posts
    const predictions = model.predict(tf.tensor2d(inputFeatures)); // Use inputFeatures instead of all post embeddings

    // Consider temporal dynamics and diversity
    const currentTime = new Date();
    const recommendationScores = predictions.arraySync().map((score, index) => {
        const postDate = postData[index % postData.length].createdAt; // Loop over post data if needed
        const timeDiff = Math.abs(currentTime - postDate);
        const daysSinceCreation = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)); // Convert time difference to days
        return { postId: postData[index % postData.length].postId, score: score / daysSinceCreation }; // Normalize score by days since creation
    });

    // Sort and return top recommended posts
    recommendationScores.sort((a, b) => b.score - a.score);
    return recommendationScores.map(post => post.postId);
}

// Function to get likes of a user
function getUserLikes(userId) {
    const user = userData.find(user => user.userId === userId);
    return user ? user.likedPosts : [];
}

// Example usage
recommendPosts(1).then(recommendedPosts => {
    console.log('Recommended posts for user 1:', recommendedPosts);
});
