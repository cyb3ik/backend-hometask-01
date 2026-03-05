import {db} from "../db/db"
import {Router, Request, Response} from "express"

export const testingRouter = Router()

testingRouter
    .delete("/all-data", (req: Request, res: Response) =>{
        db.videos = []
        res.sendStatus(204)
    })