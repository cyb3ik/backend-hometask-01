"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const videoType_1 = require("../types/videoType");
exports.db = {
    videos: [
        {
            id: 0,
            title: "Lol",
            author: "John",
            canBeDownloaded: true,
            minAgeRestriction: 16,
            createdAt: new Date().toISOString(),
            publicationDate: new Date().toISOString(),
            availableResolutions: [videoType_1.Resolutions.P144]
        }
    ]
};
