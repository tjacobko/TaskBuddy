import { createContext, useReducer } from 'react'

export const TaskDetailsContext = createContext()

export const taskDetailsReducer = (state, action) => {
    switch (action.type) {
        case "SET_TASK":
            return {
                task: action.payload
            }
        case "CLEAR_TASK":
            return {
                task: action.payload
            }
        default:
            return state
    }
}

export const TaskDetailsContextProvider = ({ children }) => {
    const [state, taskDispatch] = useReducer(taskDetailsReducer, {
        task: null
    })

    return (
        <TaskDetailsContext.Provider value={{...state, taskDispatch}}>
            {children}
        </TaskDetailsContext.Provider>
    )
}