import {db} from "../db/db"
import {Router, Request, Response} from "express"
import {Video} from "../types/types"
import { CreateVideoInputModel } from "../models/CreateVideoInputModel"

export const videoRouter = Router()

videoRouter
    .get("/", (req: Request, res: Response) => {
        res.status(200).send(db.videos)
    })

    .get("/:id", (req: Request<{id: number}>, res: Response) => {
        const foundVideo = db.videos.find(a => a.id == +req.params.id)

        if (!foundVideo) {
            res.status(404).send("ApiErrorResult")
        }

        res.status(200).send(foundVideo)
    })

    .post("/", (req: Request<{}, CreateVideoInputModel>, res: Response) => {
        const newVideo: Video = {
            id: db.videos.length ? db.videos[db.videos.length - 1].id + 1 : 1,
            publicationDate: new Date(),
            createdAt: new Date(),
            ...req.body
        }

        db.videos.push(newVideo)

        res.status(201).send(newVideo)
    })

    .put("/:id", (req: Request, res: Response) => {
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