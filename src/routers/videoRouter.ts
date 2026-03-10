import {db} from "../db/db"
import {Router, Request, Response} from "express"
import {Video} from "../types/videoType"
import { CreateVideoInputModel } from "../models/CreateVideoInputModel"
import { UpdateVideoInputModel } from "../models/UpdateVideoInputModel"
import { videoInputCreateValidation } from "../validation/videoInputCreateValidation"
import { createErrorsMessages } from "../utils"
import { videoInputUpdateValidation } from "../validation/videoInpuUpdatetValidation"

export const videoRouter = Router()

videoRouter
    .get("/", (req: Request, res: Response) => {
        res.status(200).send(db.videos)
    })

    .get("/:id", (req: Request<{id: string}>, res: Response<Video | null>) => {
        const foundVideo = db.videos.find(a => a.id === Number(req.params.id))

        if (!foundVideo) {
            res.sendStatus(404)
            return
        }

        res.status(200).send(foundVideo)
    })

    .post("/", (req: Request<{}, {}, CreateVideoInputModel>, res: Response) => {

        const errors = videoInputCreateValidation(req.body)

        if (errors.length > 0) {
            res.status(400).send(createErrorsMessages(errors))
            return
        }

        const newVideo: Video = {
            id: db.videos.length ? db.videos[db.videos.length - 1].id + 1 : 1,
            publicationDate: new Date(),
            createdAt: new Date(),
            canBeDownloaded: true,
            minAgeRestriction: null,
            ...req.body
        }

        db.videos.push(newVideo)

        res.status(201).send(newVideo)
    })

    .put("/:id", (req: Request<{id: string}, {}, UpdateVideoInputModel>, res: Response) => {

        const errors = videoInputUpdateValidation(req.body)

        if (errors.length > 0) {
            res.status(400).send(createErrorsMessages(errors))
            return
        }

        let foundVideoIndex = db.videos.findIndex(v => v.id === Number(req.params.id))

        if (foundVideoIndex === -1) {
            res.sendStatus(404)
            return
        }
        
        const foundVideo = db.videos[foundVideoIndex]

        foundVideo.title = req.body.title
        foundVideo.author = req.body.author
        foundVideo.availableResolutions = req.body.availableResolutions
        foundVideo.canBeDownloaded = req.body.canBeDownloaded
        foundVideo.minAgeRestriction = req.body.minAgeRestriction
        foundVideo.publicationDate = req.body.publicationDate

        res.sendStatus(204)
    })

    .delete("/:id", (req: Request, res: Response) => {
        const foundVideoIndex = db.videos.findIndex(a => a.id == Number(req.params.id))

        if (foundVideoIndex === -1) {
            res.sendStatus(404)
        }

        else {
            db.videos.splice(foundVideoIndex, 1)
            res.sendStatus(204)
        }

    })