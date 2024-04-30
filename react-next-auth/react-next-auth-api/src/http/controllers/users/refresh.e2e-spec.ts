import { app } from '@/app'
import request from 'supertest'

describe('Refresh Token (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  test('[PACTH] /token/refresh', async () => {
    await request(app.server).post('/accounts').send({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    const authResponse = await request(app.server).post('/sessions').send({
      email: 'johndoe@example.com',
      password: '123456',
    })

    const cookies = authResponse.get('Set-Cookie')

    const response = await request(app.server)
      .patch('/token/refresh')
      .set('Cookie', cookies ?? [])
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      access_token: expect.any(String),
    })
    // expect(response.get('Set-Cookie')).toEqual([
    //   expect.stringContaining('refreshToken='),
    // ])
  })
})
