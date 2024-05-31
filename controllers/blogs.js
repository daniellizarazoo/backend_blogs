const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const { error } = require('../utils/logger')

// This are working on /api/blogs

blogsRouter.get('/',(req,res,next)=>{
    Blog.find({})
        .then((blogs)=>{
            res.status(201).send(blogs)
        })
        .catch(err=>next(err))
})

blogsRouter.post('/',(req,res,next)=>{
    const blog = new Blog(req.body)
    blog.save()
        .then((result)=>{
            res.status(201).json(result)
        })
        .catch(err=>next(err))
})

module.exports= blogsRouter