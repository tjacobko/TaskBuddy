import { useContext } from 'react'
import { TaskDetailsContext } from '../context/TaskDetailsContext'

export const useTaskDetailsContext = () => {
    const context = useContext(TaskDetailsContext)

    if (!context) {
        throw(Error("useTaskDetailsContext should only be used within a TaskDetailsContextProvider."))
    }

    return context
}