const userRoute = require('./routes/user_route')
const connectDB = require('./mongoDB/users')
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const morgan = require('morgan')
const dotenv = require('dotenv')

const app = express()
dotenv.config()
app.use(cors())
app.use(morgan('dev'))
app.use(express.json());

connectDB(process.env.MONGO_URI)

app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.use('/users', userRoute)

const port = process.env.PORT || 3000
const host = process.env.HOST || 'localhost'
app.listen(port, () => {
    console.log(`Example app listening at http://${host}:${port}`)
})