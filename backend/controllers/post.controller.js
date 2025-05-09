import Post from "../models/post.model.js";
import User from "../models/user.model.js";
import { v2 as cloudinary} from 'cloudinary'
export const createPost = async (req, res)=>{
    try {
        const { text } = req.body;
        let {img} = req.body;
        const userId = req.user._id.toString();

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({message: "User not found"})
        if (!text ){
            return res.status(404).json({message: `Post must have both text and image ${text}`})
        }

        if (img){
            const uploadedResponse = await cloudinary.uploader.upload(img)
            img = uploadedResponse.secure_url;
        }
        const newPost = new Post({
            user:userId,
            text,
            img
        })
        
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json({error:"Internal server error"});
        console.log("Error in createPost controller: ", error);
    }
};
export const deletePost = async (req, res)=>{
    try {
        const post = await Post.findById(req.params.id)
        if(!post){
            return res.status(404).json({error: "post not found"})
        }
        if(post.user.toString()!== req.user._id.toString()){
            return res.status(404).json({error: "you are not authorised"})
        }
        if (post.img){
            const imgId = post.img.split("/").pop().split(".")[0];
            await cloudinary.uploader.destroy(imgId);
        }
        await Post.findByIdAndDelete(req.params.id); //delete the post from mongo
    } catch (error) {
        cosole.log("Error in deletePost controller: ", error);
        res.status(500).json({error: "Internal server error"});
    }
};
export const commetntOnPost = async (req, res)=>{
    try {
        const {text} = req.body;
        const postId = req.params.id;
        const userId = req.user._id;

        if (!text){
            return res.status(400).json({ error: "Text field is required"})
        }
        const post = await Post.findById(postId);
        if (!post){
            return res.status(404).json({error: "Post not found"})
        }
        const comment = { user: userId, text};
        post.comments.push(comment);
        await post.save();

        res.status(200).json(post);

    } catch (error) {
        console.log("Error in commentOnPost controller:", error);
        res.status(500).json({error: "Internal server error"});
    }
};
export const linkeUnlikePost = async (req, res)=>{
    try {
        const userId = req.user._id;
        const {id:postId} = req.params;

        const post = await Post.findById(postId);

        if(!post){
            return res.status(404).json({error: "post not found"});
        }

        const userLikedPost = post.likes.includes(userId);

        if(userLikedPost){
            await Post.updateOne({_id:postId}, {$pull: {likes: userId}})
            await User.updateOne({_id:userId}, {$pull: {linkedPosts: postId}})
            res.status(200).json({message: "Post unliked successfully"})
        }else {
            post.likes.push(userId);
            await User.updateOne({_id: userId}, {$push: {linkedPosts: postId}});
            await post.save();
            const notification = new Notification({
                from: userId,
                to: post.user,
                type: "like",
            });
            await notification.save();

            res.status(200).json({ message: "post liked successfully"})
        }
    } catch (error) {
        console.log("Eroro in like unlike post")
        res.status(500).json({erro: "Internal server error"})
    }
};
export const getAllPost = async (req, res)=>{
    try {
        const posts = await Post.find()
        .sort({ crearedAt: -1})
        .populate({
            path: "user",
            select: "-password",
        })
        .populate({
            path: "comments.user",
            select:"-password",
        });
        if (posts.length === 0){
            return res.status(200).json([]);
        }
        res.status(200).json(posts);
    } catch (error) {
        console.log("Error in getAllPosts controller:" , error)
        res.status(500).json({error: "Internal server error"});
    }
};
export const getLikedPosts = async (req, res)=>{
    const userId = req.params.id;
    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({error: "User not found"});

        const likedPosts = await Post.find({_id: {$in : user.likedPosts}})
        .populate({
            path: "user",
            select: "-password",
        })
        .populate({
            path: "comments.user",
            select: "-password",
        });

        res.status(200).json(likedPosts);
    } catch (error){
        console.log("Error in getliked posts constroller: ", error);
        res.status(500).json({message: "internal server error"});
    }
}
export const getFollwingPosts = async (req,  res)=>{
    try {
        const userId = req.user._id;
        const user = await User.findById(UserId);
        if (!user) return res.status(404).json({ error: "User not found"})
        const follwing = user.following;
        
        const feedPosts = await Post.find({ user: { $in: following}})
        .sort({
            path: "user",
            select: "-password",
        })
        .populate({
            path: "comments.user",
            select: "-password",
        });
        res.status(200).json(feedPosts);
    } catch (error) {
        console.log("Error in getFollowingPosts controller:", error);
        res.status(500).json({ error: "Internal server error"})
    }
}
export const getUserPosts = async ( req, res)=>{
    try {
        const { username} = req.params;

        const user = await User.findOne({ username});
        if(!user) return res.status(404).json({error : "User not found"});

        const posts = await Post.find({user:user._id}).sort({
            path: "user",
            select: "-passward",
        }).populate({
            path: "comments.user",
            select: "-password",
        });

        res.status(200).json(posts);

    } catch (error) {
        cosole.log("Error in get user posts controller:", error);
        res.status(500).json({error: "Internal server error"});
    }
}