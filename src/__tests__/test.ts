import request from "supertest";
import express from "express"
import { setupApp } from "../setup-app";

const app = express()

setupApp(app)
 
describe("GET /", () => {
  it("should return 'Hello World!'", async () => {
    const res = await request(app).get("/");
    expect(res.status).toBe(200);
    expect(res.text).toBe("Hello World!");
  });
});