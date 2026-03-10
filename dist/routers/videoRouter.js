"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.videoRouter = void 0;
const db_1 = require("../db/db");
const express_1 = require("express");
const videoInputCreateValidation_1 = require("../validation/videoInputCreateValidation");
const utils_1 = require("../utils");
const videoInpuUpdatetValidation_1 = require("../validation/videoInpuUpdatetValidation");
const statusCodes_1 = require("../types/statusCodes");
exports.videoRouter = (0, express_1.Router)();
exports.videoRouter
    .get("/", (req, res) => {
    res.status(statusCodes_1.HTTPStatusCode.OK).send(db_1.db.videos);
})
    .get("/:id", (req, res) => {
    const foundVideo = db_1.db.videos.find(a => a.id === Number(req.params.id));
    if (!foundVideo) {
        res.sendStatus(statusCodes_1.HTTPStatusCode.NOT_FOUND);
        return;
    }
    res.status(statusCodes_1.HTTPStatusCode.OK).send(foundVideo);
})
    .post("/", (req, res) => {
    const errors = (0, videoInputCreateValidation_1.videoInputCreateValidation)(req.body);
    if (errors.length > 0) {
        res.status(statusCodes_1.HTTPStatusCode.BAD_REQUEST).send((0, utils_1.createErrorsMessages)(errors));
        return;
    }
    const newVideo = Object.assign({ id: db_1.db.videos.length ? db_1.db.videos[db_1.db.videos.length - 1].id + 1 : 1, publicationDate: new Date().toISOString(), createdAt: new Date().toISOString(), canBeDownloaded: false, minAgeRestriction: null }, req.body);
    db_1.db.videos.push(newVideo);
    res.status(statusCodes_1.HTTPStatusCode.CREATED).send(newVideo);
})
    .put("/:id", (req, res) => {
    const errors = (0, videoInpuUpdatetValidation_1.videoInputUpdateValidation)(req.body);
    if (errors.length > 0) {
        res.status(statusCodes_1.HTTPStatusCode.BAD_REQUEST).send((0, utils_1.createErrorsMessages)(errors));
        return;
    }
    let foundVideoIndex = db_1.db.videos.findIndex(v => v.id === Number(req.params.id));
    if (foundVideoIndex === -1) {
        res.sendStatus(statusCodes_1.HTTPStatusCode.NOT_FOUND);
        return;
    }
    const foundVideo = db_1.db.videos[foundVideoIndex];
    foundVideo.title = req.body.title;
    foundVideo.author = req.body.author;
    foundVideo.availableResolutions = req.body.availableResolutions;
    foundVideo.canBeDownloaded = req.body.canBeDownloaded;
    foundVideo.minAgeRestriction = req.body.minAgeRestriction;
    foundVideo.publicationDate = req.body.publicationDate;
    res.sendStatus(statusCodes_1.HTTPStatusCode.NO_CONTENT);
})
    .delete("/:id", (req, res) => {
    const foundVideoIndex = db_1.db.videos.findIndex(a => a.id == Number(req.params.id));
    if (foundVideoIndex === -1) {
        res.sendStatus(statusCodes_1.HTTPStatusCode.NOT_FOUND);
    }
    else {
        db_1.db.videos.splice(foundVideoIndex, 1);
        res.sendStatus(statusCodes_1.HTTPStatusCode.NO_CONTENT);
    }
});
