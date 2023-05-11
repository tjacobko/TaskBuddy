const mongoose = require('mongoose')
const taskModel = require('../models/taskModel')

// Gets all tasks
const getTasks = async (req, res) => {
    const tasks = await taskModel.find({}).sort({due: "asc", time: "asc"})

    res.status(200).json(tasks)
}

// Gets a single task
const getTask = async (req, res) => {
    const { id } = req.params

    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({error: "Invalid ID"})
    }

    const task = await taskModel.findById({_id: id})

    if (!task) {
        return res.status(400).json({error: "Workout not found"})
    }

    res.status(200).json(task)
}

// Posts a single task
const createTask = async (req, res) => {
    const {title, due, time, description} = req.body

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
        const task = await taskModel.create({title, due, time, description})

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

// PATCH a single task
const patchTask = async (req, res) => {
    const { id } = req.params

    if (!mongoose.isValidObjectId) {
        return res.status(400).json({error: "Invalid ID"})
    }

    // Checking if title and due are not within request body
    const { title, due } = req.body
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

    const task = await taskModel.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if (!task) {
        return res.status(400).json({error: "Could not update task"})
    }

    res.status(200).json(task)
}

module.exports = {
    getTasks,
    getTask,
    createTask,
    deleteTask,
    patchTask
}