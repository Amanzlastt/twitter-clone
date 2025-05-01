import User from "../models/user.model.js";
import bcrypt from 'bcryptjs';
import { v2 as cloudinary } from 'cloudinary';

export const getUserProfile = async (req,res)=>{
    const {username} = req.params;
    try {
        const user = await User.findOne({username}).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found"})
        }
        res.status(200).json(user);
    } catch (error) {
        console.log("Error in getUserProfile: ", error.message);
        res.status(500).json({ error: error.message});
    }
} 

export const followUnfollowUser = async (req, res)=>{
    try {
        const {id} = req.params;
        const userToModify = await User.findById(id);
        const currentUser = await User.findById(req.user._id);

        if(id === req.user._id.toString()){
            return res.status(400).json({error:"you can't follow/unfollow your self"})
        }
        if(!userToModify  || !currentUser) return res.status(400).json({ error: "user not found"});
        
        const isFollowing = currentUser.following.includes(id);
        if(isFollowing){
            // unfollow user
            await User.findByIdAndUpdate(id, {$pull:{follower: req.user._id}});
            await User.findByIdAndUpdate(req.user._id, {$pull: {following : id}});
            res.status(200).json({message : "User unfollowed successfully"})
        }else{
            // follow user
            await User.findByIdAndUpdate(id, {$push:{follower: req.user._id}});
            await User.findByIdAndUpdate(req.user._id, {$push: {following : id}});

            const newNotification = new Notification({
                type : "follow",
                from: req.user._id,
                to: userToModify._id
            });

            await newNotification.save();

            res.status(200).json({message : "User followed successfully"})
        }
    } catch (error) {
        console.log("Error in followUnfollow: ", error.message);
        res.status(500).json({ error: error.message});
    }
}

export const getSuggestedUsers = async (req, res)=>{
    try {
        const userId = req.user._id;
        const usersFollowedByMe = await User.findById(userId).select("following");
        const users = await User.aggregate([
            {
                $match:{
                    _id: {$ne:userId}
                }
            },
            { $sample:{size:10}}
        ])

        const filteredUsers = users.filter(user=>!usersFollowedByMe.following.includes(user._id));
        const suggestedUsers = filteredUsers.slice(0, 4);

        suggestedUsers.forEach(user=> user.password= null)
        res.status(200).json(suggestedUsers);
    } catch (error) {
        console.log("Error in suggested user: ", error.message);
        res.status(500).json({ error: error.message});
    }
}

export const updateUserProfile = async (req, res) => {
    const { fullName, email, username, currentPassword, newPassword, bio, link } = req.body;
    let { profileImg, coverImg } = req.body;

    const userId = req.user._id;

    try {
        let user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        if ((!newPassword && currentPassword) || (newPassword && !currentPassword)) {
            return res.status(400).json({ message: "Please provide both new password and current password" });
        }

        if (currentPassword && newPassword) {
            if (newPassword.length < 6) {
                return res.status(400).json({ message: "Password must be at least 6 characters" });
            }
            const isMatch = await bcrypt.compare(currentPassword, user.password);
            if (!isMatch) return res.status(400).json({ message: "Current password is incorrect" });

            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(newPassword, salt);
        }

        if (email && email !== user.email) {
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: "Email is already in use." });
            }
            user.email = email; // Update the email
        }

        if (profileImg) {
            if (user.profileImg) {
                await cloudinary.uploader.destroy(user.profileImg.split("/").pop().split(".")[0]);
            }
            const uploadedResponse = await cloudinary.uploader.upload(profileImg);
            user.profileImg = uploadedResponse.secure_url; // Assign directly
        }

        if (coverImg) {
            if (user.coverImg) {
                await cloudinary.uploader.destroy(user.coverImg.split("/").pop().split(".")[0]);
            }
            const uploadedResponse = await cloudinary.uploader.upload(coverImg);
            user.coverImg = uploadedResponse.secure_url; // Assign directly
        }

        user.fullName = fullName || user.fullName;
        user.username = username || user.username;
        user.bio = bio || user.bio;
        user.link = link || user.link;

        await user.save();
        user.password = undefined; // Clear password for response

        return res.status(200).json(user);

    } catch (error) {
        console.log("Error in updateUser: ", error.message);
        return res.status(500).json({ error: error.message });
    }
};