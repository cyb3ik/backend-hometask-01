import request from "supertest";
import express from "express"
import { setupApp } from "../setup-app";
import { Resolutions} from "../types/videoType";
import { CreateVideoInputModel } from "../models/CreateVideoInputModel";
import { HTTPStatusCode } from "../types/statusCodes";
import { UpdateVideoInputModel } from "../models/UpdateVideoInputModel";

describe('Video API', () => {
  const app = express()
  setupApp(app)

  const testCreateVideoInput: CreateVideoInputModel = {
    title: "some title",
    author: "some author",
    availableResolutions: [Resolutions.P144]
  }

  const testUpdateVideoInput: UpdateVideoInputModel = {
    title: "some changed title",
    author: "some changed author",
    availableResolutions: [Resolutions.P360],
    canBeDownloaded: true,
    minAgeRestriction: 16,
    publicationDate: "2026-03-10T20:46:13.248Z"
  }

  beforeAll(async () => {
    await request(app).delete('/hometask_01/api/testing/all-data').expect(HTTPStatusCode.NO_CONTENT)
  })

  it('should return all videos; GET /videos', async () => {
    await request(app)
      .post('/hometask_01/api/videos')
      .send({ ...testCreateVideoInput})
      .expect(HTTPStatusCode.CREATED)
    
    await request(app)
      .post('/hometask_01/api/videos')
      .send({ ...testCreateVideoInput, title: "some another title"})
      .expect(HTTPStatusCode.CREATED)

    const videosList = await request(app)
      .get('/hometask_01/api/videos')
      .expect(HTTPStatusCode.OK)
    
    expect(videosList.body).toBeInstanceOf(Array)
    expect(videosList.body.length).toEqual(2)
  })

  it('should return video by id; GET /videos/:id', async () => {
    const createResponse = await request(app)
      .post('/hometask_01/api/videos')
      .send({ ...testCreateVideoInput, name: "some another title 2"})
      .expect(HTTPStatusCode.CREATED)

    const getResponse = await request(app)
      .get(`/hometask_01/api/videos/${createResponse.body.id}`)
      .expect(HTTPStatusCode.OK)
    
    expect(getResponse.body).toEqual({
      ...createResponse.body,
      id: expect.any(Number),
      createdAt: expect.any(String),
      canBeDownloaded: false,
      minAgeRestriction: null,
      publicationDate: expect.any(String)
    })
  })

  it('should create new video; POST /videos', async () => {
    const allVideosBefore = await request(app)
      .get('/hometask_01/api/videos')
      .expect(HTTPStatusCode.OK)

    await request(app)
      .post('/hometask_01/api/videos')
      .send({ ...testCreateVideoInput, name: "some another title 3"})
      .expect(HTTPStatusCode.CREATED)

    const allVideosAfter = await request(app)
      .get('/hometask_01/api/videos')
      .expect(HTTPStatusCode.OK)

    expect(allVideosAfter.body.length).toBe(allVideosBefore.body.length + 1)
  })

  it('should update video; PUT /videos/:id', async () => {
    const createResponse = await request(app)
      .post('/hometask_01/api/videos')
      .send({ ...testCreateVideoInput, name: "some another title 4"})
      .expect(HTTPStatusCode.CREATED)
    
    await request(app)
      .put(`/hometask_01/api/videos/${createResponse.body.id}`)
      .send({ ...testUpdateVideoInput})
      .expect(HTTPStatusCode.NO_CONTENT)

    const getResponse = await request(app)
      .get(`/hometask_01/api/videos/${createResponse.body.id}`)
      .expect(HTTPStatusCode.OK)
    
    expect(getResponse.body).toEqual({
      ...createResponse.body,
      ...testUpdateVideoInput
    })
  })

  it('should delete video by id; DELETE /videos/:id', async () => {
    const createResponse = await request(app)
      .post('/hometask_01/api/videos')
      .send({ ...testCreateVideoInput, name: "some another title 4"})
      .expect(HTTPStatusCode.CREATED)

    await request(app)
      .get(`/hometask_01/api/videos/${createResponse.body.id}`)
      .expect(HTTPStatusCode.OK)

    await request(app)
      .delete(`/hometask_01/api/videos/${createResponse.body.id}`)
      .expect(HTTPStatusCode.NO_CONTENT)

    await request(app)
      .get(`/hometask_01/api/videos/${createResponse.body.id}`)
      .expect(HTTPStatusCode.NOT_FOUND)
  })

  it('should not read video with nonexistent id; GET /videos/:id', async () => {
    const videosList = await request(app)
      .get('/hometask_01/api/videos')
      .expect(HTTPStatusCode.OK)

    await request(app)
      .get(`/hometask_01/api/videos/${videosList.body.length + 1}`)
      .expect(HTTPStatusCode.NOT_FOUND)
  })

  it('should not create video with invalid input data; POST /videos', async () => {
    const allVideosBefore = await request(app)
      .get('/hometask_01/api/videos')
      .expect(HTTPStatusCode.OK)

    await request(app)
      .post('/hometask_01/api/videos')
      .send({ ...testCreateVideoInput, title: "some reaaaaaaaaaaaaaaaaaaaaaaaaaaalyyyyyyyyyyyyyyyyyyyyyyyyyy looooooooooong title"})
      .expect(HTTPStatusCode.BAD_REQUEST)

    const allVideosAfter = await request(app)
      .get('/hometask_01/api/videos')
      .expect(HTTPStatusCode.OK)

    expect(allVideosAfter.body.length).toBe(allVideosBefore.body.length)
  })

  it('should not update video with invalid input data; PUT /videos/:id', async () => {
    const createResponse = await request(app)
      .post('/hometask_01/api/videos')
      .send({ ...testCreateVideoInput, name: "some another title 5"})
      .expect(HTTPStatusCode.CREATED)

    const originalVideo = await request(app)
      .get(`/hometask_01/api/videos/${createResponse.body.id}`)
      .expect(HTTPStatusCode.OK)

    await request(app)
      .put(`/hometask_01/api/videos/${createResponse.body.id}`)
      .send({ ...testUpdateVideoInput, title: "some reaaaaaaaaaaaaaaaaaaaaaaaaaaalyyyyyyyyyyyyyyyyyyyyyyyyyy looooooooooong title"})
      .expect(HTTPStatusCode.BAD_REQUEST)

    const notUpdatedVideo = await request(app)
      .get(`/hometask_01/api/videos/${createResponse.body.id}`)
      .expect(HTTPStatusCode.OK)

    expect(notUpdatedVideo.body).toEqual({ ...originalVideo.body })
  })
});