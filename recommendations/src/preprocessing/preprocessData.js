// Import the Natural library
const natural = require('natural');

// Sample post data with their content
const postData = [
    { postId: 'post1', content: 'Some text related to post 1' },
    { postId: 'post2', content: 'Some text related to post 2' },
    { postId: 'post3', content: 'Some text related to post 3' },
    // Add more post data as needed
];

// Function to preprocess post text
function preprocessData(postData) {
    // Extract post text
    const postTexts = postData.map(post => post.content);

    // Tokenize and count word frequencies
    const tokenizer = new natural.WordTokenizer();
    const features = postTexts.map(text => {
        const tokens = tokenizer.tokenize(text);
        const wordFreq = {};
        tokens.forEach(token => {
            wordFreq[token] = (wordFreq[token] || 0) + 1;
        });
        return wordFreq;
    });

    return features;
}

// Example usage
const numericalFeatures = preprocessData(postData);
console.log('Numerical features:', numericalFeatures);

// Export the preprocessData function
module.exports = preprocessData;