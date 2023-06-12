import {useContext} from 'react'
import {UserContext} from '../context/Context'


const useAuth = () => {
    return useContext(UserContext)
}

export default useAuth
