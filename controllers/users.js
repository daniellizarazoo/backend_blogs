const bycrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
const { info,error } = require('../utils/logger')

usersRouter.get('/', async (req,res)=>{
    const users = await User.find({})
    users.forEach(user => console.log(user.toJSON()));
    res.json(users)
})

usersRouter.post('/', async (req,res)=>{

    const {username,email,password} = req.body
    const saltRounds = 10
    const passwordHash = await bycrypt.hash(password,saltRounds)

    const user = new User({
        username,
        email,
        password:passwordHash
    })

    const savedUser = await user.save()

    res.status(201).json(savedUser)
})

module.exports = usersRouter