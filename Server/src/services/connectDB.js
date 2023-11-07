const mongoose = require("mongoose");
const config = require("../config/index.js");

const connect = async () => {
  try {
    await mongoose.connect(config.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("DB Connected!!");
  } catch (error) {
    console.log("Error in connecting to DB ", error);
    throw error;
  }
};

module.exports = connect;
