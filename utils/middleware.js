const logger = require('./logger')

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
    }

    logger.error(error.name)
    next(error)
}

module.exports ={
    requestLogger,
    unknownEndpoint,
    errorHandler
}