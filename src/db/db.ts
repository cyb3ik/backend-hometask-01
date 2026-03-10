import { Resolutions, Video } from "../types/videoType"

export const db: { videos: Video[] } = {
  videos: [
  {
    id: 0,
    title: "Lol",
    author: "John",
    canBeDownloaded: true,
    minAgeRestriction: 16,
    createdAt: new Date(),
    publicationDate: new Date(),
    availableResolutions: [Resolutions.P144]
  }
  ]
}