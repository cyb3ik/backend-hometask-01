import { UpdateVideoInputModel } from "../models/UpdateVideoInputModel";
import { FieldError } from "../types/fieldError";
import { Resolutions } from "../types/videoType";

const dateRegExp = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/

export const videoInputUpdateValidation = (data: UpdateVideoInputModel): FieldError[] => {
    const errors: FieldError[] = [] 

    if (!data.title || typeof(data.title) !== "string") {
        errors.push({message: "Invalid title", field: "title"})
    }

    if (!data.author || typeof(data.author) !== "string") {
        errors.push({message: "Invalid author", field: "author"})
    }

    if (typeof(data.canBeDownloaded) !== "boolean") {
        errors.push({message: "Invalid canBeDownloaded property", field: "canBeDownloaded"})
    }

    if (data.minAgeRestriction !== null && 
    (typeof(data.minAgeRestriction) !== "number" || data.minAgeRestriction > 18 || data.minAgeRestriction < 1)) {
        errors.push({message: "Invalid minAgeRestriction property", field: "minAgeRestriction"})
    }

    if (!data.publicationDate 
        || typeof(data.publicationDate) !== "string" 
        || !dateRegExp.test(data.publicationDate)) {
            errors.push({message: "Invalid publication date", field: "publicationDate"})
    }

    if (!Array.isArray(data.availableResolutions)) {
        errors.push({message: "Available resolutions must be an array", field: "availableResolutions"})

    } else if (data.availableResolutions.length) {
        const existingResolutins = Object.values(Resolutions)
        
        if (data.availableResolutions.length > existingResolutins.length 
            || data.availableResolutions.length < 1) {
                errors.push({message: "Invalid number of availableResolutions", field: "availableResolutions"})
        }

        for (const resolution of data.availableResolutions) {
            if (!existingResolutins.includes(resolution)) {
                errors.push({message: "Unknown resolution in availableResolutions:" + resolution, field: "availableResolutions"})
            }
            break
        }
    }

    return errors

}