const express = require('express')
const {
    getTasks,
    getTask,
    createTask,
    deleteTask
} = require('../controllers/tasksController')

const router = express.Router()

// GET all tasks
router.get("/", getTasks)

// GET a single task
router.get("/:id", getTask)

// POST a single task
router.post("/", createTask)

// DELETE a single task
router.delete("/:id", deleteTask)

module.exports = router