import { FieldError } from "./types/fieldError";

export const createErrorsMessages = (errors: FieldError[]): { errorsMessages: FieldError[] } => {
    return { errorsMessages: errors }
}