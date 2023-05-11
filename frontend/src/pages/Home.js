import { useEffect } from 'react'
import { useTasksContext } from '../hooks/useTasksContext'
import { useTaskDetailsContext } from '../hooks/useTaskDetailsContext'

// components
import TaskDetails from '../components/TaskDetails'
import TaskForm from '../components/TaskForm'

const Home = () => {
    const {tasks, dispatch} = useTasksContext()
    const { taskDispatch } = useTaskDetailsContext()

    useEffect(() => {
        const fetchTasks = async () => {
            const response = await fetch("/api/tasks")
            const json = await response.json()

            if (response.ok) {
                dispatch({type: "SET_TASKS", payload: json})
                taskDispatch({type: "CLEAR_TASK", payload: null})
            }
        }

        fetchTasks()
    }, [dispatch, taskDispatch])

    return (
        <div className="home">
            <div className="tasks">
                {tasks && tasks.map((t) => (
                    <TaskDetails
                        key={t._id}
                        task={t}
                    />
                ))}
            </div>
            <TaskForm />
        </div>
    )
}

export default Home