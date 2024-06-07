const config = require('./utils/config')
const logger = require('./utils/logger')
const {requestLogger,unknownEndpoint,errorHandler} = require('./utils/middleware')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogs')

mongoose.connect(config.MONGODB_URI)
    .then(()=>logger.info('Connected to MongoDB'))
    .catch((error)=>logger.error('error connecting to mongodb',error.message))

app.use(cors())
app.use(express.json())
if (process.env.NODE_ENV !== 'test'){
    app.use(morgan('dev'));
}
app.use(requestLogger)
app.use('/api/blogs',blogsRouter)
app.use(unknownEndpoint)
app.use(errorHandler)

module.exports = app