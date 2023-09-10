import { createContext, useContext, useReducer } from "react"

const StateContext = createContext()

const ContextProvider = ({ reducer, initialState, children }) => {
    const stateValue = useReducer(reducer, initialState)
    return (
        <StateContext.Provider value={stateValue}>
            {children}
        </StateContext.Provider>
    )
}

const useStateValue = () => useContext(StateContext)

export { ContextProvider, useStateValue }
