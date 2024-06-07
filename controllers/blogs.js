const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const { error } = require('../utils/logger')

// This are working on /api/blogs

blogsRouter.get('/',async (req,res)=>{
    
    const blogs = await Blog.find({})
    res.json(blogs)

})

blogsRouter.post('/',async (req,res)=>{
    const blog = new Blog(req.body)

    const result = await blog.save()
    res.status(201).json(result)
})

blogsRouter.get('/:id?',async (req,res)=>{
    const id = req.params.id
    const blog = await Blog. findById (id)
    res.status(200).json(blog)
})

module.exports= blogsRouter