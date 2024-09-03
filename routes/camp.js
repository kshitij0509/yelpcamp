const express = require("express");
const router = express.Router();
const { isloggedin, isOwner, isreviewAuthor } = require("../middleware");
const multer = require("multer");
const { storage } = require("../cloudinary/index");
const upload = multer({ storage });

const { makeCampGround } = require("../controller/makeCampGround");
const {
  showCampground,
  newcampground,
  createcamp,
} = require("../controller/showCampground");
const {
  edit,
  update,
  remove,
  createReview,
  deleteReview,
} = require("../controller/edit");
const { validateCampground, validateReview } = require("../schemas");

// console.log({ validateCampground });
router.get("/campground", makeCampGround);
router.get("/campground/new", isloggedin, newcampground);
router.get("/campground/:id", showCampground);
router.post("/campground", upload.array("image"), createcamp);
router.get("/campground/:id/edit", isloggedin, isOwner, edit);
router.put("/campground/:id", isOwner, upload.array("image"), update);
router.delete("/campground/:id", isOwner, remove);
router.post("/campground/:id/review", isloggedin, validateReview, createReview);
router.delete(
  "/campground/:id/review/:reviewId",
  isloggedin,
  isreviewAuthor,
  deleteReview
);

module.exports = router;
