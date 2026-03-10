import express, { Express, Request, Response } from "express"
import { videoRouter } from "./routers/videoRouter"
import {db} from "./db/db"
import { testingRouter } from "./routers/testingRouter"
import { HTTPStatusCode } from "./types/statusCodes"
 
export const setupApp = (app: Express) => {
  app.use(express.json())

  app.get("/", (req: Request, res: Response) => {
        res.status(HTTPStatusCode.OK).send("Hello World!");
  });

  app.use("/hometask_01/api/videos", videoRouter)
  app.use("/hometask_01/api/testing", testingRouter)

  return app
}