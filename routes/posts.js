// routes/posts.js
const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// Index route - show all posts
router.get('/dashboard', async (req, res) => {
  try {
    const posts = await Post.find({});
    res.render('dashboard', { posts });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

// Create route - show form to create new post
router.get('/new', (req, res) => {
  res.render('new');
});

// Create route - add new post to DB
router.post('/dashboard', async (req, res) => {
    try {
      const { title, description } = req.body;
  
      // Check if user is logged in
      if (!req.isAuthenticated()) {
        return res.redirect('/login');
      }
  
      // Create a new post with the author set to the logged-in user's ObjectId
      const newPost = new Post({
        title,
        description,
        author: req.user._id,
      });
  
      // Save the post to the database
      await newPost.save();
  
      // Redirect to the dashboard
      res.redirect('/dashboard');
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  });

// Show route - show details of a specific post
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.render('show', { post });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

// Edit route - show form to edit a post
router.get('/:id/edit', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.render('edit', { post });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

// Update route - update a post in the DB
router.put('/:id', async (req, res) => {
  try {
    const { title, description, author } = req.body;
    await Post.findByIdAndUpdate(req.params.id, { title, description, author });
    res.redirect('/dashboard');
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

// Delete route - delete a post from the DB
router.delete('/:id', async (req, res) => {
    try {
      const postId = req.params.id;
      await Post.findOneAndDelete({ _id: postId });
      res.redirect('/dashboard');
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  });

module.exports = router;