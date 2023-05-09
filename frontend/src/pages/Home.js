import { useEffect } from 'react'
import { useTasksContext } from '../hooks/useTasksContext'

// components
import TaskDetails from '../components/TaskDetails'
import TaskForm from '../components/TaskForm'

const Home = () => {
    const {tasks, dispatch} = useTasksContext()

    useEffect(() => {
        const fetchTasks = async () => {
            const response = await fetch("/api/tasks")
            const json = await response.json()

            if (response.ok) {
                dispatch({type: "SET_TASKS", payload: json})
            }
        }

        fetchTasks()
    }, [dispatch])

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