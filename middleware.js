const ExpressError = require("./utils/ExpressError");
const Campground = require("./models/campground");
const Review = require("./models/review");
const isloggedin = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.returnTo = req.originalUrl;
    req.flash("error", "you must be signed in ");
    return res.redirect("/login");
  }
  next();
};

const isOwner = async (req, res, next) => {
  const { id } = req.params;
  const campground = await Campground.findById(id);
  if (!campground.author.equals(req.user._id)) {
    req.flash("error", "you do not have permission ");
    return res.redirect(`/campground/${id}`);
  }
  next();
};

const isreviewAuthor = async (req, res, next) => {
  const { id, reviewId } = req.params;
  const review = await Review.findById(reviewId);
  if (!review.author.equals(req.user._id)) {
    req.flash("error", "you do not have permission ");
    return res.redirect(`/campground/${id}`);
  }
  next();
};

module.exports = { isloggedin, isOwner, isreviewAuthor };
