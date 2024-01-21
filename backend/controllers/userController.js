import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/helpers/generateTokenAndSetCookie.js";

//getUserProfile
const getUserProfile = async (req, res) => {
  const { username } = req.params;
  try {
    const user = await User.findOne({username}).select("-password").select("-updatedAt");
    if(!user) return res.status(400).json({message : "User not found"});
    res.status(200).json(user);

  } catch (err) {
    res.status(500).json({ message : err.message });
    console.log("Error in getUserProfile:", err.message);
  }  
};

// User Sigm Up
const signupUser = async (req, res) => {
    try {
        const { name, email, username, password } = req.body;
        const user = await User.findOne({$or: [{email},{username}]});

        if(user){
            return res.status(400).json({message : "User already exists"});
        }

        //Hashing password
        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(password, salt);

        //Create new user
        const newUser = new User({
            name,
            email,
            username,
            password : hashedPassword
        });

        //Save new user to db
        await newUser.save();

        if(newUser){
            generateTokenAndSetCookie(newUser._id, res);
            res.status(201).json({
                _id : newUser._id,
                name : newUser.name,
                email : newUser.email,
                username : newUser.username
            })
        }
        else{
            res.status(400).json({message : "Invalid user data"});
        }
    } catch (err) {
        res.status(500).json({ message : err.message });
        console.log("Error in signupUser:", err.message);
    }
};

// User Log In
const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({username});
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");
         
        if (!user || !isPasswordCorrect) return res.status(400).json({message: "Invalid username or password!"});

        generateTokenAndSetCookie(user._id, res);

        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            username : user.username,
        })

    } catch (err) {
        res.status(500).json({ message : err.message });
        console.log("Error in loginUser:", err.message);
    }
};

//User Log Out
const logoutUser = async (req, res) => {
    try {
        res.cookie("jwt", "", {maxAge:1});
        res.status(200).json({ message : "User logged out successfully!" });
    } catch (err) {
        res.status(500).json({ message : err.message });
        console.log("Error in loginUser:", err.message);
    }
};

//Following and unfollowing users
const followUnFollowUser = async (req, res) => {
	try {
		const { id } = req.params;
		const userToModify = await User.findById(id);
		const currentUser = await User.findById(req.user._id);

		if (id === req.user._id.toString())
			return res.status(400).json({ error: "You cannot follow/unfollow yourself" });

		if (!userToModify || !currentUser) return res.status(400).json({ error: "User not found" });

		const isFollowing = currentUser.following.includes(id);

		if (isFollowing) {
			// Unfollow user
			await User.findByIdAndUpdate(id, { $pull: { followers: req.user._id } });
			await User.findByIdAndUpdate(req.user._id, { $pull: { following: id } });
			res.status(200).json({ message: "User unfollowed successfully" });
		} else {
			// Follow user
			await User.findByIdAndUpdate(id, { $push: { followers: req.user._id } });
			await User.findByIdAndUpdate(req.user._id, { $push: { following: id } });
			res.status(200).json({ message: "User followed successfully" });
		}
	} catch (err) {
		res.status(500).json({ error: err.message });
		console.log("Error in followUnFollowUser: ", err.message);
	}
};

// Update User Profile
const updateUser = async (req, res) => {
    const { name, email, username, profilePicture, password, bio, pronouns, versionControlProfile, website } = req.body;
    const userId = req.user._id;
    try {
        let user = await User.findById(userId);
        if(!user) return res.status(400).json({ message: "User not found" });

        if(req.params.id !== userId.toString()) return res.status(400).json({ message: "You can only update the profile of yourself, you cant do the same other users!" });

        if(password){
            const salt = await bcrypt.genSalt(12);
            const hashedPassword = await bcrypt.hash(password, salt);
            user.password = hashedPassword;
        }

        user.name = name || user.name;
        user.email = email || user.email;
        user.username = username || user.username;
        user.profilePicture = profilePicture || user.profilePicture;
        user.bio = bio || user.bio;
        user.pronouns = pronouns || user.pronouns;
        user.versionControlProfile = versionControlProfile || user.versionControlProfile;
        user.website = website || user.website;

        user = await user.save();

        // Respond with the updated user object
        res.status(200).json({ message: "User updated successfully", user });
        
    } catch (err) {
        res.status(500).json({ error: err.message });
		console.log("Error in updateUser: ", err.message);
    }
};


export { signupUser , loginUser, logoutUser, followUnFollowUser, updateUser, getUserProfile };