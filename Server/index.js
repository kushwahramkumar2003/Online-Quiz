const app = require("./src/App.js"); //import app
const config = require("./src/config/index.js"); //import config
const connect = require("./src/services/connectDB.js"); //import connect

//create a method

//run this method

(async () => {
  try {
    await connect(); //connect to DB

    app.on("error", (err) => {
      // error handling
      console.error("Error : ", err);
      throw err;
    });

    const port = config.PORT || 3000;

    app.listen(port, () =>
      //listen to port
      console.log(`Server running on port ${port} 🔥`)
    );
  } catch (error) {
    console.log("Error ---> ", error);

    throw error;
  }
})();
