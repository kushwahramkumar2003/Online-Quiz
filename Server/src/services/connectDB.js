const mongoose = require("mongoose");
const config = require("../config/index.js");

const connect = async () => {
  try {
    console.log(config.MONGODB_URL);
    await mongoose.connect(config.MONGODB_URL);
    console.log("DB Connected!!");
  } catch (error) {
    console.log("Error in connecting to DB ", error);
    throw error;
  }
};

module.exports = connect;
