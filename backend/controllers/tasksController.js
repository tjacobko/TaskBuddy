const mongoose = require('mongoose')
const taskModel = require('../models/taskModel')

// Gets all tasks
const getTasks = async (req, res) => {
    const tasks = await taskModel.find({}).sort({due: "asc", time: "asc"})

    res.status(200).json(tasks)
}

// Posts a single task
const createTask = async (req, res) => {
    const {title, due, time} = req.body

    const emptyFields = []

    if (!title) {
        emptyFields.push("title")
    }
    if (!due) {
        emptyFields.push("due")
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({error: "Please fill out all required fields", emptyFields})
    }

    try {
        const task = await taskModel.create({title, due, time})

        res.status(200).json(task)
    }
    catch (error) {
        res.status(400).json({error: error.message})
    }
}

// Delete a single task
const deleteTask = async (req, res) => {
    const { id } = req.params

    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({error: "Invalid ID"})
    }

    const task = await taskModel.findOneAndDelete({_id: id})

    if (!task) {
        return res.status(400).json({error: "Could not delete task"})
    }

    res.status(200).json(task)
}

module.exports = {
    getTasks,
    createTask,
    deleteTask
}