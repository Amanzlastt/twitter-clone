import express from 'express'
import { protectRoute } from '../middleware/protectRoute.js';
import { commetntOnPost, createPost, deletePost, getAllPost, getFollwingPosts, getLikedPosts, getUserPosts, linkeUnlikePost } from '../controllers/post.controller.js';

const router = express.Router();
router.get("/all", protectRoute, getAllPost);
router.get("/following", protectRoute, getFollwingPosts);
router.get("getUserPosts", protectRoute, getUserPosts);
router.post("/like/:id", protectRoute, linkeUnlikePost);
router.get("/likes/:id", protectRoute, getLikedPosts);
router.post("/create",protectRoute,createPost);
router.delete("/:id",protectRoute, deletePost);
router.post("/comment/:id", protectRoute, commetntOnPost);
export default router;