import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

// date-fns
import format from 'date-fns/format'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const Task = () => {
    const [task, setTask] = useState(null)

    const { id } = useParams()

    useEffect(() => {
        const fetchTask = async () => {
            const response = await fetch("/api/tasks/" + id)
            const json = await response.json()

            if (response.ok) {
                setTask(json)
            }
        }

        fetchTask()
    }, [id])

    if (!task) {
        return <h1>Loading Task Details</h1>
    }

    return (
        <div className="task">
            <h1>{task.title}</h1>
            <p><strong>Due Date: </strong>{format(new Date(task.due.replace(/-/, '/').replace(/T.+/, '')), "MM/dd/yyyy")}</p>
            <p>Task Created: {formatDistanceToNow(new Date(task.createdAt), { addSuffix: true })}</p>
            {
                task.description
                &&
                <div className="description">
                    <h3>Description:</h3>
                    <p>{task.description}</p>
                </div>
            }
        </div>
    )
}

export default Task