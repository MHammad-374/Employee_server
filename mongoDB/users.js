const mongoose = require('mongoose')

function connectDB(uri) {
    mongoose.connect(uri)
        .then(() => {
            console.log('Connected to MongoDB')
        })
        .catch((err) => {
            console.log(err)
        })
}

module.exports = connectDB