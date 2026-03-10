import request from "supertest";
import express from "express"
import { setupApp } from "../src/setup-app";

const app = express()

setupApp(app)
 
describe("Video API /", () => {

  it("should read all videos", async () => {
    
  })
});