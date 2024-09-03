const Campground = require("../models/campground");
const ExpressError = require("../utils/ExpressError");
const catchAsync = require("../utils/catchAsync");
const mbxGeoCoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapBoxToken = process.env.MAPBOX_TOKEN;
const geocoder = mbxGeoCoding({ accessToken: mapBoxToken });

exports.showCampground = catchAsync(async (req, res) => {
  const showcampground = await Campground.findById(req.params.id)
    .populate({ path: "reviews", populate: "author" })
    .populate("author");
  if (!showcampground) {
    req.flash("error", "cannot find the campground!!!!");
    return res.redirect("/campground");
  }

  res.render("campgrounds/show", { showcampground });
});

exports.newcampground = (req, res) => {
  res.render("campgrounds/new");
};
exports.createcamp = catchAsync(async (req, res, next) => {
  const geoData = await geocoder
    .forwardGeocode({
      query: req.body.campground.location,
      limit: 1,
    })
    .send();
  const campground = new Campground(req.body.campground);
  campground.geometry = geoData.body.features[0].geometry;
  campground.images = req.files.map((f) => ({
    url: f.path,
    filename: f.filename,
  }));
  campground.author = req.user._id;
  await campground.save();
  req.flash("success", "successfully made a new compground");
  console.log(req.body, req.files);

  return res.redirect(`/campground/${campground._id}`);
});
