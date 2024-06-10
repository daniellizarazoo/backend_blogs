const logger = require('./logger')
const jwt = require('jsonwebtoken')

const requestLogger = (req,res,next) => {
    logger.info('Method: ', req.method)
    logger.info('Path :',req.path)
    logger.info('Body :',req.body)
    logger.info('- - -')
    next()
}

const unknownEndpoint = (req,res) => {
    res.status(404).send({error:'unknown endpoint'})
}

const errorHandler = (error,req,res,next) => {
    
    if (error.name=="CastError"){
        res.status(400).send('mal formatted id')
    } else if(error.name == "MongoServerError" && error.message.includes('E11000 duplicate key error')){
        return res.status(400).json(
            {error: 'Some value is already in the DB'}
        )
    }    else if (error.name=="JsonWebTokenError"){
        res.status(401).send('Authentication has failed. JSON Token failed')
    } else if (error.name=="TokenExpiredError"){
        return res.status(401).json({
            error:'token expired'
        })
    }

    logger.error(error.name)
    next(error)
}

const tokenExtractor = (req,res,next)=>{

    const authorization = req.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
        req.token = authorization.replace('Bearer ', '')
    }else {
        req.token = null
    }
    next()
}

const userExtractor = (req,res,next)=>{
    if (req.token==null){
        return res.status(400).send('No token')
    }
    const decodedToken = jwt.verify(req.token,process.env.SECRET)
    
    if(!decodedToken.id){
        return res.status(401).json({error:'token invalid'})
    }

    req.userId = decodedToken.id
    req.username = decodedToken.username
    next()
}

module.exports ={
    requestLogger,
    unknownEndpoint,
    errorHandler,
    tokenExtractor,
    userExtractor
}