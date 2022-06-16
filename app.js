const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const morgan = require("morgan");
const saveVideos = require("./utils/saveVideos");
// const { DB_CONNECTION } = require("./secrets");

//CONNECTION TO THE DATABASE
mongoose.connect(process.env.DB_CONNECTION, () => {
  console.log(process.env.DB_CONNECTION);
});

//IMPORT ROUTES (ALSO USING MIDDLEWARE JUST IN CASE THERE NEEDS TO BE MORE FUNCTIONALITY)
const videoRoute = require("./routes/video.routes");

app.use(morgan("tiny"));
app.use("/videos", videoRoute);

//ROUTES
app.set("view engine", "ejs");

app.use((req, res, next) => {
  res.status(404).json({
    status: "404",
    message: "Page does not exist",
  });
});

saveVideos();

app.listen(3000, console.log("We are listening"));
