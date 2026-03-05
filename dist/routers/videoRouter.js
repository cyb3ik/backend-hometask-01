"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.videoRouter = void 0;
const db_1 = require("../db/db");
const express_1 = require("express");
exports.videoRouter = (0, express_1.Router)();
exports.videoRouter
    .get("/", (req, res) => {
    res.status(200).send(db_1.db.videos);
})
    .get("/:id", (req, res) => {
    const foundVideo = db_1.db.videos.find(a => a.id == +req.params.id);
    if (!foundVideo) {
        res.status(404).send("ApiErrorResult");
    }
    res.status(200).send(foundVideo);
})
    .post("/", (req, res) => {
    const newVideo = Object.assign({ id: db_1.db.videos.length ? db_1.db.videos[db_1.db.videos.length - 1].id + 1 : 1, publicationDate: new Date(), createdAt: new Date() }, req.body);
    db_1.db.videos.push(newVideo);
    res.status(201).send(newVideo);
})
    .put("/:id", (req, res) => {
    let foundVideo = db_1.db.videos.find(a => a.id == +req.params.id);
    if (!foundVideo) {
        res.status(404).send("ApiErrorResult");
    }
    else {
    }
    res.sendStatus(204);
});
