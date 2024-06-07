const {test,describe,after,beforeEach} = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const { application } = require('express')

const api = supertest(app)

const initialBlogs = [
    {
        title: "Geeks for GEEKS",
        author: "Sam Altman",
        url: "geeksforgeeks.com",
        likes: 230
    },
    {
        title: "Movie M3A",
        author: "Daniel Lizarazo",
        url: "moviem3a.blogspot.com",
        likes: 542
    }
]

describe('PROBANDO BASE DE DATOS',()=>{
    
    beforeEach(async () => {
        await Blog.deleteMany({})
        let BlogObject = new Blog(initialBlogs[0])
        await BlogObject.save()
        BlogObject = new Blog(initialBlogs[1])
        await BlogObject.save()
      })
    
    test('there are two blogs',async () =>{
        const response = await api.get('/api/blogs')

        assert.strictEqual(response.body.length, initialBlogs.length)
    })

    test('likes en primer blog es 230',async()=>{
        const response = await api.get('/api/blogs')

        assert.strictEqual(response.body[0].likes,initialBlogs[0].likes)
    })
    
    after(async ()=>{
        await mongoose.connection.close()
    })
})