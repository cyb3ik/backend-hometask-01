import {db} from "../db/db"
import {Router, Request, Response} from "express"
import {Video} from "../types/videoType"
import { CreateVideoInputModel } from "../models/CreateVideoInputModel"
import { UpdateVideoInputModel } from "../models/UpdateVideoInputModel"
import { videoInputCreateValidation } from "../validation/videoInputCreateValidation"
import { createErrorsMessages } from "../utils"
import { videoInputUpdateValidation } from "../validation/videoInpuUpdatetValidation"
import { HTTPStatusCode } from "../types/statusCodes"

export const videoRouter = Router()

videoRouter
    .get("/", (req: Request, res: Response) => {
        res.status(HTTPStatusCode.OK).send(db.videos)
    })

    .get("/:id", (req: Request<{id: string}>, res: Response<Video | null>) => {
        const foundVideo = db.videos.find(a => a.id === Number(req.params.id))

        if (!foundVideo) {
            res.sendStatus(HTTPStatusCode.NOT_FOUND)
            return
        }

        res.status(HTTPStatusCode.OK).send(foundVideo)
    })

    .post("/", (req: Request<{}, {}, CreateVideoInputModel>, res: Response) => {

        const errors = videoInputCreateValidation(req.body)

        if (errors.length > 0) {
            res.status(HTTPStatusCode.BAD_REQUEST).send(createErrorsMessages(errors))
            return
        }

        const newVideo: Video = {
            id: db.videos.length ? db.videos[db.videos.length - 1].id + 1 : 1,
            publicationDate: new Date().toISOString(),
            createdAt: new Date().toISOString(),
            canBeDownloaded: false,
            minAgeRestriction: null,
            ...req.body
        }

        db.videos.push(newVideo)

        res.status(HTTPStatusCode.CREATED).send(newVideo)
    })

    .put("/:id", (req: Request<{id: string}, {}, UpdateVideoInputModel>, res: Response) => {

        const errors = videoInputUpdateValidation(req.body)

        if (errors.length > 0) {
            res.status(HTTPStatusCode.BAD_REQUEST).send(createErrorsMessages(errors))
            return
        }

        let foundVideoIndex = db.videos.findIndex(v => v.id === Number(req.params.id))

        if (foundVideoIndex === -1) {
            res.sendStatus(HTTPStatusCode.NOT_FOUND)
            return
        }
        
        const foundVideo = db.videos[foundVideoIndex]

        foundVideo.title = req.body.title
        foundVideo.author = req.body.author
        foundVideo.availableResolutions = req.body.availableResolutions
        foundVideo.canBeDownloaded = req.body.canBeDownloaded
        foundVideo.minAgeRestriction = req.body.minAgeRestriction
        foundVideo.publicationDate = req.body.publicationDate

        res.sendStatus(HTTPStatusCode.NO_CONTENT)
    })

    .delete("/:id", (req: Request, res: Response) => {
        const foundVideoIndex = db.videos.findIndex(a => a.id == Number(req.params.id))

        if (foundVideoIndex === -1) {
            res.sendStatus(HTTPStatusCode.NOT_FOUND)
        }

        else {
            db.videos.splice(foundVideoIndex, 1)
            res.sendStatus(HTTPStatusCode.NO_CONTENT)
        }

    })