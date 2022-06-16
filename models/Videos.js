const mongoose = require("mongoose");
require("dotenv").config({ path: __dirname + `/../.env` });
// const { QUERY } = require("../secrets");

// const query = `cooking`;

const addVideos = new mongoose.Schema({
  video_title: {
    type: String,
    required: true,
  },
  video_description: {
    type: String,
    required: false,
  },
  video_id: {
    type: String,
    required: true,
  },
  published_datetime: {
    type: String,
    required: true,
  },
  thumbnails: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model(`${process.env.QUERY}`, addVideos);
