const assert = require('node:assert')
const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')
const helper = require('./test_helper')


const api = supertest(app)


describe('initiali database has one user', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    const passwordHash = await bcrypt.hash('password', 10)
    const user = new User({ username: 'nmikovic', passwordHash })
    await user.save()
  })

  test('perform get', async () => {
    const result = await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(result.body.length, 1)
  })

  test('add new user successfully', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mikica',
      name: 'Mikica Mikic',
      password: 'hehil'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    assert(usernames.includes(newUser.username))

  })

  test('trigger short username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mi',
      password: 'hehil'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    assert.match(result.body.error, /username.*is shorter/)
  })

  test('trigger short password', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mihhh',
      password: 'he'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    assert(result.body.error.includes('password min length is 3'))
  })

  test('trigger already taken username', async () => {
    const usersAtStart = await helper.usersInDb()
    const newUser = {
      username: usersAtStart[0].username,
      password: '123',
      name: usersAtStart[0].name
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    assert(result.body.error.includes('to be unique'))
  })

  test('trigger username required', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      password: 'hes'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    assert.match(result.body.error, /username.*required/)
  })

})

after(async () => {
  mongoose.connection.close()
})