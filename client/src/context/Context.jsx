import {useReducer,createContext,useState} from 'react'
import { Reducer } from './Reducer'

const initialState = {
    user:null,
    loading:false,
    error:null
}


export const UserContext = createContext()

export const ContextProvider = ({children})=>{
    const [persist,setPersist] = useState(JSON.parse(localStorage.getItem("persist"))  || false)
    const [state,dispatch] = useReducer(Reducer,initialState)

    return(
        <UserContext.Provider value={{state,dispatch,persist,setPersist}}>
            {children}
        </UserContext.Provider>
    )
}

