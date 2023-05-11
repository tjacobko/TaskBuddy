import { useState } from 'react'
import { useTaskDetailsContext } from '../hooks/useTaskDetailsContext'

const TaskUpdateForm = ({ task }) => {
    const { taskDispatch } = useTaskDetailsContext()

    const [title, setTitle] = useState(task.title)
    const [due, setDue] = useState(task.due)
    const [time, setTime] = useState(task.time)
    const [description, setDescription] = useState(task.description)
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const updateTask = { title, due, time, description }

        const response = await fetch("/api/tasks/" + task._id, {
            method: "PATCH",
            body: JSON.stringify(updateTask),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        if (response.ok) {
            setError(null)
            setEmptyFields([])
            console.log("Successfully updated task.")
            taskDispatch({type: "SET_TASK", payload: json})
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h3>Update this task</h3>

            <label>Title:</label>
            <input 
                type="string"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className={emptyFields.includes("title") ? "error" : ""}
            />

            <label>Due Date:</label>
            <input 
                type="date"
                onChange={(e) => setDue(e.target.value)}
                value={due.replace(/T.+/, '')}
                className={emptyFields.includes("due") ? "error" : ""}
            />

            <label>Time Due (optional):</label>
            <input 
                type="time"
                onChange={(e) => setTime(e.target.value)}
                value={time}
            />

            <label>Description (optional):</label>
            <input 
                type="string"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
            />
            
            <button>Update Task</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default TaskUpdateForm