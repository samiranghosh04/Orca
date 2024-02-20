import mongoose from "mongoose";
import User from "./userModel";

const postSchema = mongoose.Schema({
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    text: {
        type: String,
        maxLength: 5000,
    },
    img: {
        type: String,
    },
    likes: {
        type: [mongoose.Schema.ObjectId],
        ref: User,
        default: [],
    },
    replies: [{
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,  
        },
        text: {
            type: String,
            maxLength: 5000,
        },
        img: {
            type: String,
        },
        userProfilePicture: {
            type: String,
        },
        username: {
            type: String,
        },
    }],
}, 
{
    timestamps: true
});

const Post = mongoose.model('Post', postSchema);

export default Post;
