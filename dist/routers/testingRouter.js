"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testingRouter = void 0;
const db_1 = require("../db/db");
const express_1 = require("express");
const statusCodes_1 = require("../types/statusCodes");
exports.testingRouter = (0, express_1.Router)();
exports.testingRouter
    .delete("/all-data", (req, res) => {
    db_1.db.videos = [];
    res.sendStatus(statusCodes_1.HTTPStatusCode.NO_CONTENT);
});
