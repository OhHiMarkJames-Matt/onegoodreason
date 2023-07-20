'use client'

import React, { useContext, useReducer } from "react"
import { reducer } from "./reducer"

const StateContext = React.createContext();
const DispatchContext = React.createContext();

export function useStateContext(){
    return useContext(StateContext);
}
export function useDispatchContext(){
    return useContext(DispatchContext);
}

export default function ReducerProvider({ children }){
    const [state, dispatch] = useReducer(reducer, {
        isModalToggled: false,
    })
    return (
        <StateContext.Provider value={state}>
            <DispatchContext.Provider value={dispatch}>
                {children}
            </DispatchContext.Provider>
        </StateContext.Provider>
    )
}