import {db} from "../db/db"
import {Router, Request, Response} from "express"
import {Video} from "../types/videoType"
import { CreateVideoInputModel } from "../models/CreateVideoInputModel"
import { UpdateVideoInputModel } from "../models/UpdateVideoInputModel"
import { videoInputCreateValidation } from "../validation/videoInputCreateValidation"
import { createErrorsMessages } from "../utils"

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
        let foundVideo = db.videos.find(v => v.id === +req.params.id)

        if (!foundVideo) {
            res.status(404).send("ApiErrorResult")
        }
        else {
            
        }
        res.sendStatus(204)
    })

    .delete("/:id", (req: Request, res: Response) => {

        const foundVideo = db.videos.find(a => a.id == +req.params.id)

        if (!foundVideo) {
            res.status(404).send("ApiErrorResult")
        }

        else {
            db.videos.filter(v => v.id === +req.params.id)
        }

        res.sendStatus(204)
    })