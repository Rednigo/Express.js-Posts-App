const express = require('express');
const session = require('express-session');
const methodOverride = require('method-override');
const app = express();
const mongoose = require('mongoose');
const dotenv = require("dotenv");
dotenv.config();
const passport = require("passport");
const { loginCheck } = require("./auth/passport");
loginCheck(passport); 

// Mongo DB conncetion
const database = process.env.MONGOLAB_URI;
mongoose.connect(database)
 .then(() => console.log('e don connect'))
 .catch(err => console.log(err));

app.set('view engine', 'ejs');

//BodyParsing
app.use(express.urlencoded({extended: false}));
app.use(session({
    secret:'oneboy',
    saveUninitialized: true,
    resave: true
  }));
app.use(methodOverride('_method'));

app.use(passport.initialize());
app.use(passport.session());

// Redirect / to /login
app.get('/', (req, res) => {
  res.redirect('/login');
});

// Routes
app.use('/logout', require('./routes/logout'));
app.use('/', require('./routes/login'));
app.use('/', require('./routes/posts'));


const PORT = process.env.PORT || 4111;

app.listen(PORT, () => {
 console.log(`Server is running on port ${PORT}`);
});

