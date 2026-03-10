import { CreateVideoInputModel } from "../models/CreateVideoInputModel";
import { FieldError } from "../types/fieldError";
import { Resolutions } from "../types/videoType";

export const videoInputCreateValidation = (data: CreateVideoInputModel): FieldError[] => {
    const errors: FieldError[] = []

    if (!data.title || typeof(data.title) !== "string") {
        errors.push({message: "Invalid title", field: "title"})
    }

    if (!data.author || typeof(data.author) !== "string") {
        errors.push({message: "Invalid author", field: "author"})
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