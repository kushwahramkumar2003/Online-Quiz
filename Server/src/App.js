const express = require("express");
const routes = require("./routes/index.routes.js");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", routes);

// app.use("*", (req, res) => {
//   res.status(404).json({ error: "not found" });
// });

app.get("/", (req, res) => {
  res.send("Hello World!");
});

module.exports = app;
