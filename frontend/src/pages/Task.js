import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useTaskDetailsContext } from '../hooks/useTaskDetailsContext'

// components
import Details from '../components/Details'
import TaskUpdateForm from '../components/TaskUpdateForm'

const Task = () => {
    const {task, taskDispatch} = useTaskDetailsContext()

    const { id } = useParams()

    useEffect(() => {
        const fetchTask = async () => {
            const response = await fetch("/api/tasks/" + id)
            const json = await response.json()

            if (response.ok) {
                taskDispatch({type: "SET_TASK", payload: json})
            }
        }

        fetchTask()
    }, [taskDispatch, id, task])

    return (
        <div className="task">
            {task && <Details task={task} />}
            {task && <TaskUpdateForm task={task} />}
        </div>
    )
}

export default Task