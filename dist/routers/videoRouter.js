"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.videoRouter = void 0;
const db_1 = require("../db/db");
const express_1 = require("express");
const videoInputCreateValidation_1 = require("../validation/videoInputCreateValidation");
const utils_1 = require("../utils");
const videoInpuUpdatetValidation_1 = require("../validation/videoInpuUpdatetValidation");
exports.videoRouter = (0, express_1.Router)();
exports.videoRouter
    .get("/", (req, res) => {
    res.status(200).send(db_1.db.videos);
})
    .get("/:id", (req, res) => {
    const foundVideo = db_1.db.videos.find(a => a.id === Number(req.params.id));
    if (!foundVideo) {
        res.sendStatus(404);
        return;
    }
    res.status(200).send(foundVideo);
})
    .post("/", (req, res) => {
    const errors = (0, videoInputCreateValidation_1.videoInputCreateValidation)(req.body);
    if (errors.length > 0) {
        res.status(400).send((0, utils_1.createErrorsMessages)(errors));
        return;
    }
    const newVideo = Object.assign({ id: db_1.db.videos.length ? db_1.db.videos[db_1.db.videos.length - 1].id + 1 : 1, publicationDate: new Date(), createdAt: new Date(), canBeDownloaded: true, minAgeRestriction: null }, req.body);
    db_1.db.videos.push(newVideo);
    res.status(201).send(newVideo);
})
    .put("/:id", (req, res) => {
    const errors = (0, videoInpuUpdatetValidation_1.videoInputUpdateValidation)(req.body);
    if (errors.length > 0) {
        res.status(400).send((0, utils_1.createErrorsMessages)(errors));
        return;
    }
    let foundVideoIndex = db_1.db.videos.findIndex(v => v.id === Number(req.params.id));
    if (foundVideoIndex === -1) {
        res.sendStatus(404);
        return;
    }
    const foundVideo = db_1.db.videos[foundVideoIndex];
    foundVideo.title = req.body.title;
    foundVideo.author = req.body.author;
    foundVideo.availableResolutions = req.body.availableResolutions;
    foundVideo.canBeDownloaded = req.body.canBeDownloaded;
    foundVideo.minAgeRestriction = req.body.minAgeRestriction;
    foundVideo.publicationDate = req.body.publicationDate;
    res.sendStatus(204);
})
    .delete("/:id", (req, res) => {
    const foundVideoIndex = db_1.db.videos.findIndex(a => a.id == Number(req.params.id));
    if (foundVideoIndex === -1) {
        res.sendStatus(404);
    }
    else {
        db_1.db.videos.splice(foundVideoIndex, 1);
        res.sendStatus(204);
    }
});
