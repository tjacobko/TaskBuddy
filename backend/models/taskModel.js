const mongoose = require('mongoose')

const Schema = mongoose.Schema

const TaskModel = new Schema({
    title: {
        type: String,
        required: true
    },
    due: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: false
    }
}, { timestamps: true })

module.exports = mongoose.model("tasks", TaskModel)