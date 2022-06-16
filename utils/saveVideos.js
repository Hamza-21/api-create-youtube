const fetch = require("node-fetch");
const mongoose = require("mongoose");
const dayjs = require("dayjs");
const cron = require("node-cron");
require("dotenv").config({ path: __dirname + `/../.env` });

const Video = require("../models/Videos");

const api_key = process.env.API_KEY;
const publishedAfter = dayjs().subtract(1, "hour").toISOString();

//Async Await go hand in hand because APIs can be slowwwww (remember to change the comment later pls)

async function saveVideos() {
  const collectVideos = await fetch(
    `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&order=date&type=video&q=${process.env.QUERY}&publishedAfter=${publishedAfter}&key=${api_key}`
  );
  const response = await collectVideos.json();
  console.log("Hello");
  //Bunch of data response fields to actually insert specific information into the database using some nifty JSON manipulation, kachow
  for (let i = 0; i < response.items.length; i++) {
    const video = new Video({
      video_title: response.items[i].snippet.title,
      video_description: response.items[i].snippet.description,
      video_id: response.items[i].id.videoId,
      published_datetime: response.items[i].snippet.publishTime,
      thumbnails: response.items[i].snippet.thumbnails.default.url,
    });
    video.save();
  }
}

function scheduleJob() {
  cron.schedule("*/10 * * * * *", saveVideos);
}

module.exports = scheduleJob;
