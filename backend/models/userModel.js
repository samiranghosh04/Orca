import mongoose from "mongoose";

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
    bio: {
        type: String,
        maxlength: 360,
    },
    pronouns: {
        type: String,
        default: "",
        enum: [
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
    }
},
{
    timestamps: true,
});

const User = mongoose.model('User', userSchema);
export default User;