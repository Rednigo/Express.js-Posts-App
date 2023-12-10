const express = require('express');

const {registerView, loginView, registerUser, loginUser } = require('../controllers/loginController');


const { protectRoute } = require("../auth/protect");
const { dashboardView } = require("../controllers/dashboardController");

const router = express.Router();

//GET requests
router.get('/register', registerView);
router.get('/login', loginView);
router.get("/dashboard", protectRoute, dashboardView);

//POST requests
router.post("/register", registerUser);
router.post("/login", loginUser);


module.exports = router;