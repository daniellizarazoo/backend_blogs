const blogsRouter = require('express').Router()
const blog = require('../models/blog')
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


blogsRouter.get('/',async (req,res)=>{
    
    const blogs = await Blog.find({})
    res.json(blogs)
})

blogsRouter.get('/fromuser', async (req,res)=>{
    const userId = req.userId
    const blogsByUser = await Blog.find({userAuthor:userId})
    res.status(201).json(blogsByUser)

})

blogsRouter.get('/user/:Userid',async (req,res)=>{
    const UserId = req.params.Userid

    const blogsByUser = await Blog.find({userAuthor:UserId})
    res.status(201).json(blogsByUser)
})

blogsRouter.get('/:id?',async (req,res)=>{
    const id = req.params.id
    const blog = await Blog. findById (id)
    blog!=null 
    ? res.status(200).json(blog)
    : res.status(404).send('Blog was not found')
})

blogsRouter.post('/',async (req,res)=>{
    const body = req.body

    const user = await User.findById(req.userId)
    const blog = new Blog({
            title: body.title,
            author: body.author,
            url: body.url,
            likes: body.likes,
            userAuthor: user.id
        }
    )
    const result = await blog.save()
    res.status(201).json(result)
})

blogsRouter.delete('/:id',async (req,res) =>{

    const blogId = req.params.id
    const blog = await Blog.findById (blogId)

    if (blog.userAuthor.toString() !== req.userId){
        return res.status(401).json({error:"You are not the owner of the blog"})
    } else{
        const blog = await Blog.findOneAndDelete({userAuthor:req.userId})
        res.status(200).send('Blog eliminated')
    }
})

module.exports= blogsRouter