const request = require('supertest')
const app = require('../app')


// ID driver sample yang ceritanya dah punya subscription
const driverId = 1
// ID driver sample yang kga punya subscription
const driverIdNoSub = 2
// ID SHUTTLE RECORD TYPE PICKUP
const idPickup = 1
// ID SHUTTLE RECORD TYPE DELIVER
const idDeliver = 2


// PICKUP TEST
describe('POST /records/pickup', () => {
  test('POST /records/pickup [SUCCESS TEST]', async () => {
    const response = await request(app)
      .post('/records/pickup')
      .send({ driverId })
    expect(response.status).toBe(201)
    expect(response.body).toBeInstanceOf(Object)
    expect(response.body).toHaveProperty('data')
  })

  test('POST /records/pickup [FAILED TEST DO NOT HAVE SUB]', async () => {
    const response = await request(app)
      .post('/records/pickup')
      .send({ driverId: driverIdNoSub })
    expect(response.status).toBe(404)
    expect(response.body).toBeInstanceOf(Object)
    expect(response.body).toHaveProperty('message', 'You do not have any subscription')
  })

  test('POST /records/pickup [FAILED TEST DRIVER DO NOT EXIST ]', async () => {
    const response = await request(app)
      .post('/records/pickup')
      .send({ driverId: 6969 })
    expect(response.status).toBe(500)
    expect(response.body).toBeInstanceOf(Object)
    expect(response.body).toHaveProperty('message', 'Internal server error')
  })
})

describe('PATCH /records/pickup/status/:id', () => {
  test('PATCH /records/pickup/status/:id [SUCCESS TEST UPDATE STATUS TO ON THE WAY]', async () => {
    const response = await request(app)
      .patch(`/records/pickup/status/${idPickup}`)
    expect(response.status).toBe(201)
    expect(response.body).toBeInstanceOf(Object)
    expect(response.body).toHaveProperty('message', `data status change to On the way`)
  })
  
  test('PATCH /records/pickup/status/:id [FAILED TEST TYPE NOT MATCH]', async () => {
    const response = await request(app)
      .patch(`/records/pickup/status/${idDeliver}`)
    expect(response.status).toBe(404)
    expect(response.body).toBeInstanceOf(Object)
    expect(response.body).toHaveProperty('message', `Type Not Match`)
  })
  
  test('PATCH /records/pickup/status/:id [FAILED TEST DATA NOT FOUND]', async () => {
    const response = await request(app)
      .patch(`/records/pickup/status/6969}`)
    expect(response.status).toBe(500)
    expect(response.body).toBeInstanceOf(Object)
    expect(response.body).toHaveProperty('message', 'Internal server error')
  })
})

describe('PATCH /records/pickup/arrive/:id', () => {
  test('PATCH /records/pickup/arrive/:id [SUCCESS TEST UPDATE STATUS TO ON THE WAY]', async () => {
    const response = await request(app)
      .patch(`/records/pickup/arrive/${idPickup}`)
    expect(response.status).toBe(201)
    expect(response.body).toBeInstanceOf(Object)
    expect(response.body).toHaveProperty('message', expect.any(String))
  })
  
  test('PATCH /records/pickup/arrive/:id [FAILED TEST TYPE NOT MATCH]', async () => {
    const response = await request(app)
      .patch(`/records/pickup/status/${idDeliver}`)
    expect(response.status).toBe(404)
    expect(response.body).toBeInstanceOf(Object)
    expect(response.body).toHaveProperty('message', `Type Not Match`)
  })
  
  test('PATCH /records/pickup/arrive/:id [FAILED TEST DATA NOT FOUND]', async () => {
    const response = await request(app)
      .patch(`/records/pickup/status/6969}`)
    expect(response.status).toBe(500)
    expect(response.body).toBeInstanceOf(Object)
    expect(response.body).toHaveProperty('message', 'Internal server error')
  })
})


// DELIVER TEST
describe('POST /records/deliver', () => {
  test('POST /records/deliver [SUCCESS TEST]', async () => {
    const response = await request(app)
      .post('/records/deliver')
      .send({ driverId })
    expect(response.status).toBe(201)
    expect(response.body).toBeInstanceOf(Object)
    expect(response.body).toHaveProperty('data')
  })

  test('POST /records/deliver [FAILED TEST DO NOT HAVE SUB]', async () => {
    const response = await request(app)
      .post('/records/deliver')
      .send({ driverId: driverIdNoSub })
    expect(response.status).toBe(404)
    expect(response.body).toBeInstanceOf(Object)
    expect(response.body).toHaveProperty('message', 'You do not have any subscription')
  })

  test('POST /records/deliver [FAILED TEST DRIVER DO NOT EXIST ]', async () => {
    const response = await request(app)
      .post('/records/deliver')
      .send({ driverId: 6969 })
    expect(response.status).toBe(500)
    expect(response.body).toBeInstanceOf(Object)
    expect(response.body).toHaveProperty('message', 'Internal server error')
  })
})

describe('PATCH /records/deliver/status/:id', () => {
  test('PATCH /records/deliver/status/:id [SUCCESS TEST UPDATE STATUS TO ON THE WAY]', async () => {
    const response = await request(app)
      .patch(`/records/deliver/status/${idDeliver}`)
    expect(response.status).toBe(201)
    expect(response.body).toBeInstanceOf(Object)
    expect(response.body).toHaveProperty('message', `data status change to On the way`)
  })
  
  test('PATCH /records/deliver/status/:id [FAILED TEST TYPE NOT MATCH]', async () => {
    const response = await request(app)
      .patch(`/records/deliver/status/${idPickup}`)
    expect(response.status).toBe(404)
    expect(response.body).toBeInstanceOf(Object)
    expect(response.body).toHaveProperty('message', `Type Not Match`)
  })
  
  test('PATCH /records/deliver/status/:id [FAILED TEST DATA NOT FOUND]', async () => {
    const response = await request(app)
      .patch(`/records/deliver/status/6969}`)
    expect(response.status).toBe(500)
    expect(response.body).toBeInstanceOf(Object)
    expect(response.body).toHaveProperty('message', 'Internal server error')
  })
})

describe('PATCH /records/deliver/arrive/:id', () => {
  test('PATCH /records/deliver/arrive/:id [SUCCESS TEST UPDATE STATUS TO ON THE WAY]', async () => {
    const response = await request(app)
      .patch(`/records/deliver/arrive/${idDeliver}`)
    expect(response.status).toBe(201)
    expect(response.body).toBeInstanceOf(Object)
    expect(response.body).toHaveProperty('message', expect.any(String))
  })
  
  test('PATCH /records/deliver/arrive/:id [FAILED TEST TYPE NOT MATCH]', async () => {
    const response = await request(app)
      .patch(`/records/deliver/status/${idPickup}`)
    expect(response.status).toBe(404)
    expect(response.body).toBeInstanceOf(Object)
    expect(response.body).toHaveProperty('message', `Type Not Match`)
  })
  
  test('PATCH /records/deliver/arrive/:id [FAILED TEST DATA NOT FOUND]', async () => {
    const response = await request(app)
      .patch(`/records/deliver/status/6969}`)
    expect(response.status).toBe(500)
    expect(response.body).toBeInstanceOf(Object)
    expect(response.body).toHaveProperty('message', 'Internal server error')
  })
})