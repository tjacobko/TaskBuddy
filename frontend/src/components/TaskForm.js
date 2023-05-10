import { useState } from 'react'
import { useTasksContext } from '../hooks/useTasksContext'

const TaskForm = () => {
    const { dispatch } = useTasksContext()

    const [title, setTitle] = useState("")
    const [due, setDue] = useState("")
    const [time, setTime] = useState("")
    const [description, setDescription] = useState("")
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const task = {title, due, time, description}

        const response = await fetch("/api/tasks", {
            method: "POST",
            body: JSON.stringify(task),
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
            setTitle("")
            setDue("")
            setTime("")
            setDescription("")
            setError(null)
            setEmptyFields([])
            console.log("Task Created", json)
            dispatch({type: "CREATE_TASK", payload: json})
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h3>Create a new task</h3>

            <label>Title: </label>
            <input 
                type="string"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className={emptyFields.includes("title") ? "error" : ""}
            />

            <label>Due Date: </label>
            <input 
                type="date"
                onChange={(e) => setDue(e.target.value)}
                value={due}
                className={emptyFields.includes("due") ? "error" : ""}
            />

            <label>Time Due (optional): </label>
            <input
                type="time"
                onChange={(e) => setTime(e.target.value)}
                value={time}
            />

            <label>Description (optional): </label>
            <input 
                type="string"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
            />

            <button>Submit New Task</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default TaskForm