import {db} from "../db/db"
import {Router, Request, Response} from "express"
import { HTTPStatusCode } from "../types/statusCodes"

export const testingRouter = Router()

testingRouter
    .delete("/all-data", (req: Request, res: Response) =>{
        db.videos = []
        res.sendStatus(HTTPStatusCode.NO_CONTENT)
    })