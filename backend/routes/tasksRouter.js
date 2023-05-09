const express = require('express')
const {
    getTasks,
    createTask,
    deleteTask
} = require('../controllers/tasksController')

const router = express.Router()

// GET all tasks
router.get("/", getTasks)

// POST a single task
router.post("/", createTask)

// DELETE a single task
router.delete("/:id", deleteTask)

module.exports = router