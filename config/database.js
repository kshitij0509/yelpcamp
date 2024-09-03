const mongoose = require("mongoose");
require("dotenv").config();

const dbConnect = () => {
  mongoose
    .connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log(".............DB CONNECTION SUCCESSFUL.................");
    })
    .catch((error) => {
      console.log(error.message);
      console.log(".............PROBLEM IN DB CONNECTION.............");
      process.exit(1);
    });
};

module.exports = dbConnect;
