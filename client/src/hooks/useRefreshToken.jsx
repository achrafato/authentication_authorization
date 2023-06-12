// import axios from '../assets/axios'
import axios from 'axios'
import useAuth from './useAuth'
import {UpdateUser} from '../context/Actions'

const useRefreshToken = () => {

    const {dispatch} = useAuth()

    const refresh = async()=>{
        try{
            const {data} = await axios.get('/api/refresh/new',
                                            {withCredentials: true}
            )
            dispatch(UpdateUser(data))
            return data
        }catch(err){
            console.error(err)
        }
    }

    return refresh
}

export default useRefreshToken