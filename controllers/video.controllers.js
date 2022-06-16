const Video = require("../models/Videos");
const mongoose = require("mongoose");
const query = new mongoose.Query();

const getVideos = async (req, res) => {
  try {
    const videos = await Video.find()
      .skip(+req.query.page)
      .limit(+req.query.limit)
      .sort("-published_datetime");
    res.json(videos);
  } catch (err) {
    res.json({ message: err });
  }
};

const searchVideos = async (req, res) => {
  try {
    const filter = new RegExp(req.params.search, "i");
    // console.log(typeof req.query.page);
    const videos = await Video.find(
      {
        $or: [
          {
            video_title: filter,
          },
          { video_description: filter },
        ],
      },
      "video_title video_description video_id thumbnails published_datetime",
      { skip: +req.query.page, limit: +req.query.limit }
    );
    res.json(videos);
  } catch (err) {
    res.json({ message: err });
    console.log(err);
  }
};

module.exports = { getVideos, searchVideos };
