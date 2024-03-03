import User from "../models/userModel.js";
import Post from "../models/postModel.js";

// CREATE Post
const createPost = async (req, res) => {
	try {
		const { postedBy, text, img } = req.body;
		if (!postedBy || !text) {
			return res.status(400).json({ error: "Postedby and text fields are required" });
		}

		const user = await User.findById(postedBy);
		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		if (user._id.toString() !== req.user._id.toString()) {
			return res.status(401).json({ error: "Unauthorized to create post" });
		}

		const maxLength = 5000;
		if (text.length > maxLength) {
			return res.status(400).json({ error: `Text must be less than ${maxLength} characters` });
		}

		const newPost = new Post({ postedBy, text, img });
		await newPost.save();

		res.status(201).json({message: "Post created succesfully!", newPost});
	} catch (err) {
		res.status(500).json({ error: err.message });
		console.log(err);
	}
};

// GET Post by ID
const getPost = async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);
		if (!post) {
			return res.status(404).json({ message: "Post not found" });
		}
		return res.status(200).json(post);
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
};

// DELETE Post
const deletePost = async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);
		if (!post) {
			return res.status(404).json({ message: "Post not found" });
		}
		if (post.postedBy.toString() !== req.user._id.toString()) {
			return res.status(401).json({message : "Unauthorized to delete post"});
		}
		await Post.findByIdAndDelete(req.params.id);
		res.status(200).json({message: "Post deleted succesfully!"});
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
};

// LIKE AND UNLIKE POST
const likeUnlikePost = async (req, res) => {
	try {
		const {id:postId} = req.params;
		const userId = req.user._id;
		const post = await Post.findById(postId);
		if (!post) {
			return res.status(404).json({ message: "Post not found" });
		}
		const userLikedPost = post.likes.includes(userId);
		if(userLikedPost){
			//unlike post
			await Post.updateOne({_id: postId}, {$pull: {likes: userId}});
			res.status(200).json({message: "Post unliked succesfully!"});
		}else{
			//like post
			post.likes.push(userId);
			await post.save();
			res.status(200).json({message: "Post liked succesfully!"});
		}

	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
};

// REPLY
const replyToPost = async (req, res) => {
	try {
		const { text } = req.body;
		const postId = req.params.id;
		const userId = req.user._id;
		const userProfilePicture = req.user.profilePicture;
		const username = req.user.username;

		if(!text){
			return res.status(400).json({ message : "Text field is required"});
		}

		const post = await Post.findById(postId);
		if(!post){
			return res.status(400).json({ message : "Post not found!"});
		}

		const reply = {userId, text, userProfilePicture, username};

		post.replies.push(reply);
		await post.save();

		return res.status(200).json({ message: "Reply added successfully!", post });

	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
};

// Feed
/*
const getFeedPosts = async (req, res) => {
	try {
		const userId = req.user._id;
		const user = await User.findById(userId);
		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		const following = user.following;

		const feedPosts = await Post.find({ postedBy: { $in: following } }).sort({ createdAt: -1 });

		res.status(200).json(feedPosts);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};*/
const getFeedPosts = async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const following = user.following;

        // Fetch posts based on the users the current user follows and the user's interactions
        const feedPosts = await Post.find({
            $or: [
                { postedBy: { $in: following } }, // Posts by users the current user is following
                { likes: { $in: [userId] } } // Posts that the user has liked
            ]
        }).sort({ createdAt: -1 });

        res.status(200).json(feedPosts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export { createPost, getPost, deletePost, likeUnlikePost, replyToPost,  getFeedPosts };