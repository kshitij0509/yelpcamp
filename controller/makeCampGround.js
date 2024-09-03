const Campground = require("../models/campground");
const catchAsync = require("../utils/catchAsync");

exports.makeCampGround = catchAsync(async (req, res) => {
  const allcampground = await Campground.find({});
  res.render("campgrounds/index", { allcampground });
});
