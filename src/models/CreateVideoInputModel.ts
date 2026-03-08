import { Resolutions } from "../types/videoType"

export type CreateVideoInputModel = {
    title: string,
    author: string,
    availableResolutions: Resolutions[]
}