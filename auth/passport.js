// js
const bcrypt = require("bcryptjs");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/User");

const loginCheck = (passport) => {
  passport.use(
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
      // Check customer
      User.findOne({ email: email })
        .then((user) => {
          if (!user) {
            console.log("Wrong email");
            return done(null, false, { message: "Incorrect email" });
          }
          // Match Password
          bcrypt.compare(password, user.password, (error, isMatch) => {
            if (error) throw error;
            if (isMatch) {
              return done(null, user);
            } else {
              console.log("Wrong password");
              return done(null, false, { message: "Incorrect password" });
            }
          });
        })
        .catch((error) => done(error));
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id)
      .then((user) => {
        done(null, user);
      })
      .catch((error) => {
        done(error, null);
      });
  });
};

module.exports = {
  loginCheck,
};
