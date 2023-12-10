// controllers/dashboardController.js
const Post = require("../models/Post");

const dashboardView = async (req, res) => {
  try {
    // Fetch posts from the database associated with the logged-in user
    const posts = await Post.find({ author: req.user._id });
    res.render("dashboard", { user: req.user, posts });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  dashboardView,
};
