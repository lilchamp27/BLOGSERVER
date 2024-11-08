const express = require('express');
const posts = require('../models/post');
const router = express.Router();

router.get('/posts', async (req, res) => {     
    try {
        const postss = await posts.find();
        res.status(200).json({ success: true, data: postss });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching posts", error: error.message });
    }
});

router.post('/add-post', async (req, res) => {
    const { title, description, tags, category, postImg } = req.body;

    try {
        const newPost = new posts({ title, description, tags, category, postImg });
        const savedPost = await newPost.save();
        res.status(201).json({ success: true, data: savedPost });
    } catch (error) {
        res.status(500).json({ success: false, message: "Incorrect format", error: error.message });
    }
});

// Get a single post by ID
router.get('/post/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const post = await posts.findById(id);
        if (!post) {
            return res.status(404).json({ success: false, message: 'Post not found' });
        }
        res.status(200).json({ success: true, data: post });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching post', error: error.message });
    }
});

router.put('/update-post/:postId', async (req, res) => {
    const { postId } = req.params;
    const { title, description } = req.body;

    try {
        const updatedPost = await posts.findByIdAndUpdate(postId, { title, description }, { new: true });
        if (!updatedPost) {
            return res.status(404).json({ success: false, message: "Post not found" });
        }
        res.status(200).json({ success: true, data: updatedPost });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete('/delete-post/:postId', async (req, res) => {
    const { postId } = req.params;

    try {
        const deletedPost = await posts.findByIdAndDelete(postId);
        if (!deletedPost) {
            return res.status(404).json({ success: false, message: 'Post not found' });
        }
        res.status(200).json({ success: true, message: 'Post deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
