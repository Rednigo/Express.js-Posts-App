// routes/logout.js
const express = require('express');
const router = express.Router();

// Logout route
router.get('/', (req, res) => {
  // Assuming you are using sessions, you can clear the session and redirect to the login page
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } else {
      res.redirect('/login'); // Redirect to the login page after logout
    }
  });
});

module.exports = router;
