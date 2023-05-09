require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')

const tasksRouter = require('./routes/tasksRouter')

const app = express()

// middleware
app.use(express.json())

// use router
app.use("/api/tasks", tasksRouter)

mongoose.connect(process.env.MONGO_DB)
    .then(() => {
        // listen for requests
        app.listen(process.env.PORT, () => {
            console.log("Listening on Port " + process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })