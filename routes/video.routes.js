const express = require("express");
const router = express.Router();
const { getVideos, searchVideos } = require("../controllers/video.controllers");

router.get("/", getVideos);

router.get("/:search", searchVideos);

module.exports = router;
