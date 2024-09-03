const express = require("express");
const router = express.Router();
const User = require("../models/user");
const catchAsync = require("../utils/catchAsync");
const passport = require("passport");

router.get("/register", (req, res) => {
  res.render("auth/register");
});
router.post(
  "/register",
  catchAsync(async (req, res, next) => {
    try {
      const { email, username, password } = req.body;
      const user = new User({ email, username });
      const registerUser = await User.register(user, password);
      req.login(registerUser, (err) => {
        if (err) {
          return next(err);
        } else {
          req.flash("success", "Welcome to yelp Camp");
          res.redirect("/campground");
        }
      });
    } catch (e) {
      req.flash("error", e.message);
      res.redirect("/register");
    }
  })
);
router.get("/login", (req, res) => {
  res.render("auth/login");
});
router.post(
  "/login",
  (req, res, next) => {
    req.oldSession = { returnTo: req.session.returnTo };
    next();
  },
  passport.authenticate("local", {
    failureFlash: true,
    failureRedirect: "/login",
  }),
  (req, res) => {
    req.flash("success", "welcome back!!!");
    const redirectUrl = req.oldSession.returnTo || "/campground";
    //delete req.session.returnTo;
    res.redirect(redirectUrl);
  }
);
router.get("/logout", (req, res) => {
  req.logout(() => {
    req.flash("success", "good bye");
    res.redirect("/campground");
  });
});
module.exports = router;
