const jwt = require('jsonwebtoken')
const bycrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')


loginRouter.post('/',async(req,res)=>{
    const {username,password} = req.body
    console.log('request.body in login.js :>> ', req.body);
    const user = await User.findOne({username})
    const passwordCorrect = user == null 
    ? false
    : await bycrypt.compare(password, user.password)

    if (!(user && passwordCorrect)){
        return res.status(401).json({
            error:'invaild username or password'
        })
    }

    const userForToken = {
        username: user.username,
        id : user._id
    }

    const token = jwt.sign(userForToken,process.env.SECRET,{expiresIn:"120s"})

    res
        .status(200)
        .send({token,username:user.username,id:user._id})

})

module.exports = loginRouter