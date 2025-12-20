const assert = require('node:assert')
const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')


const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

describe('note api tests', () => {

  test('all notes are returned in json format', async () => {
    const result = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(result.body.length, helper.initialBlogs.length)
  })

  test('verify name of property id', async () => {
    const blogs = await helper.blogsInDb()
    assert(Object.keys(blogs[0]).find((element) => element.includes('id')))
  })

  test('insert new blog to database', async () => {
    const newBlog = {
      title: 'Zivot i prikljucenija',
      author: 'Dositej Obradovic',
      url: 'https://www.knjizare-vulkan.rs/domaci-klasici/6699-zivot-i-prikljucenija',
      likes: 100
    }
    const result = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    assert.ok(result.body.id)
    // eslint-disable-next-line no-unused-vars
    const { id, ...otherFields } = result.body
    assert.deepStrictEqual(otherFields, newBlog)

    const totalBlogs = await helper.blogsInDb()
    assert.strictEqual(totalBlogs.length, helper.initialBlogs.length + 1)
  })

  test('insert blog with missing likes property', async () => {
    const newBlog = {
      title: 'Zivot i prikljucenija',
      author: 'Dositej Obradovic',
      url: 'https://www.knjizare-vulkan.rs/domaci-klasici/6699-zivot-i-prikljucenija',
    }

    const result = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)

    assert.deepStrictEqual(result.body.likes, 0)
  })

  test('insert blog with missing url property fails', async () => {
    const newBlog = {
      title: 'Zivot i prikljucenija',
      author: 'Dositej Obradovic',
    }
    const result = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    assert.match(result.body.error, /url.*required/)
  })

  test('insert blog with missing title property fails', async () => {
    const newBlog = {
      author: 'Dositej Obradovic',
      url: 'https://www.knjizare-vulkan.rs/domaci-klasici/6699-zivot-i-prikljucenija',
    }

    const result = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    assert.match(result.body.error, /title.*required/)
  })

  test('successfully deleted note if id exists', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    const contents = blogsAtEnd.map(blog => blog.title)
    assert(!contents.includes(blogToDelete.title))
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)
  })

  test('error when trying to delete non-existing blog', async () => {
    await api
      .delete('/api/blogs/123')
      .expect(400)
  })

  test('successfully edited blog', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToEdit = { ...blogsAtStart[0], title: 'Test edited title' }

    await api
      .put(`/api/blogs/${blogToEdit.id}`)
      .send(blogToEdit)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    const contents = blogsAtEnd.map(blog => blog.title)
    assert(contents.includes(blogToEdit.title))
  })

  test('error when trying to edit non-existing blog', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToEdit = { ...blogsAtStart[0], title: 'Test edited title' }
    await Blog.findByIdAndDelete(blogToEdit.id)

    await api
      .put(`/api/blogs/${blogToEdit.id}`)
      .send(blogToEdit)
      .expect(404)
  })
})

after(async () => {
  await mongoose.connection.close()
})