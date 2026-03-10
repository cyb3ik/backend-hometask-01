"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupApp = void 0;
const express_1 = __importDefault(require("express"));
const videoRouter_1 = require("./routers/videoRouter");
const testingRouter_1 = require("./routers/testingRouter");
const setupApp = (app) => {
    app.use(express_1.default.json());
    app.get("/", (req, res) => {
        res.status(200).send("Hello World!");
    });
    app.use("/hometask_01/api/videos", videoRouter_1.videoRouter);
    app.use("/hometask_01/api/testing", testingRouter_1.testingRouter);
    return app;
};
exports.setupApp = setupApp;
