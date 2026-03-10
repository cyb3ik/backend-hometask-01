import { Resolutions, Video } from "../types/videoType"

export const db: { videos: Video[] } = {
  videos: [
  {
    id: 0,
    title: "Lol",
    author: "John",
    canBeDownloaded: true,
    minAgeRestriction: 16,
    createdAt: new Date().toISOString(),
    publicationDate: new Date().toISOString(),
    availableResolutions: [Resolutions.P144]
  }
  ]
}