const mongoose = require("mongoose");
const Campground = require("../models/campground");
const dbConnect = require("../config/database");
const cities = require("../seeds/cities");
const { places, descriptors } = require("../seeds/seedHelper");

const sample = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};
const seedb = async () => {
  await dbConnect();
  await Campground.deleteMany({});
  for (let i = 0; i < 19; i++) {
    const random19 = Math.floor(Math.random() * 19);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "66288aaaf4ba67c46b97fa51",
      location: `${cities[random19].city},${cities[random19].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      // image: "https://source.unsplash.com/collection/483251",
      description:
        "By placing reusable components in separate files or directories, you can include them in multiple templates or pages throughout the project. This promotes code reusability and makes it easier to maintain and update common elements across the website or application.",
      price,
      geometry: {
        type: "Point",
        coordinates: [cities[random19].longitude, cities[random19].latitude],
      },
      images: [
        {
          url: "https://res.cloudinary.com/dsjyfmfkz/image/upload/v1716200148/yelpCamp/nq5xxbtnytp0vag1lwhq.jpg",
          filename: "yelpCamp/nq5xxbtnytp0vag1lwhq",
        },
      ],
    });
    await camp.save();
  }
};

seedb().then(() => {
  mongoose.connection.close();
});
