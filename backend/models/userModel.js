import mongoose from "mongoose";
import validator from 'validator';

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    username : {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: (value) => {
                return validator.isEmail(value);
            },
            message: 'Invalid email format',
        },
    },
    password: {
        type: String,
        minLength: 8,
        required: true,
    },
    profilePicture: {
        type: String,
        default: "",
    },
    followers: {
        type: [String],
        default: [],
    },
    following: {
        type: [String],
        default: [],
    },
    likedPosts: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Post' 
    }],
    bio: {
        type: String,
        maxlength: 360,
    },
    pronouns: {
        type: String,
        default: "",
        enum: [
            "",
            "he/him/his",
            "she/her/hers",
            "they/them/theirs",
            "ze/hir/hirs",
            "xe/xem/xyrs",
            "ey/em/eirs",
            "ve/ver/vers",
            "per/pers/perself",
            "e/em/es",
            "others",
        ],
    },
    versionControlProfile: {
        type: String,
        default: "",
        validate: {
            validator: (value) => {
                return !value || validator.isURL(value, { protocols: ['http', 'https'], require_protocol: true });
            },
            message: 'Invalid URL for versionControlProfile',
        },
    },
    website: {
        type: String,
        default: "",
        validate: {
            validator: (value) => {
                return !value || validator.isURL(value, { protocols: ['http', 'https'], require_protocol: true });
            },
            message: 'Invalid URL for website',
        },
    },
    blockedUsers: { 
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
        default: [] // By default nobody should be blocked
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    isBanned: {
        type: Boolean,
        default: false,
    }
},
{
    timestamps: true,
});

const User = mongoose.model('User', userSchema);
export default User;