import { useContext } from 'react'
import { TasksContext } from '../context/TasksContext'

export const useTasksContext = () => {
    const context = useContext(TasksContext)
    
    if (!context) {
        throw (Error("useTasksContext may only be used inside of a TasksContextProvider"))
    }

    return context
}