import { useNavigate } from 'react-router-dom'
import { useTasksContext } from '../hooks/useTasksContext'

// date-fns
import format from 'date-fns/format'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const TaskDetails = ({ task }) => {
    const { dispatch } = useTasksContext()

    const handleClick = async (event) => {
        event.stopPropagation()

        const response = await fetch("/api/tasks/" + task._id, {
            method: "DELETE"
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({type: "DELETE_TASK", payload: json})
        }
    }

    const navigate = useNavigate()

    const goToDetails = () => {
        navigate("/tasks/" + task._id)
    }

    return (
        <div className="task-details" onClick={goToDetails}>
            <h4>{task.title}</h4>
            <p><strong>Due Date: </strong>{format(new Date(task.due.replace(/-/, '/').replace(/T.+/, '')), "MM/dd/yyyy")}</p>
            {task.time && <p><strong>Time Due: </strong>{format(new Date("2000-01-01T"+task.time), "hh:mm a")}</p>}
            <p>Created: {formatDistanceToNow(new Date(task.createdAt), { addSuffix: true })}</p>
            <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
        </div>
    )
}

export default TaskDetails