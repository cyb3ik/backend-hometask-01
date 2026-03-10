import { Resolutions } from "../types/videoType"

export type UpdateVideoInputModel = {
    title: string,
    author: string,
    availableResolutions: Resolutions[],
    canBeDownloaded: boolean,
    minAgeRestriction: number | null,
    publicationDate: Date
}