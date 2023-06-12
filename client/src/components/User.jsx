import { useEffect ,useState} from 'react'
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import {useNavigate,useLocation} from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import { RemoveUser } from '../context/Actions'
import axios from 'axios'

const User = () => {
    const [users,setUsers]= useState([])
    const axiosPrivate = useAxiosPrivate()
    const navigate = useNavigate()
    const location = useLocation()
    const {state:{user},setPersist,dispatch} = useAuth()

    useEffect(()=>{
        let isMounted = true;
        const controller = new AbortController();

        const FetchAlluser = async()=>{
            try{
                const {data} = await axiosPrivate.get('/api/users/all',{
                    signal:controller.signal
                })
                isMounted && setUsers(data)
                console.log(data)
            }catch(err){
                console.log(err)
                // if the refreshToken is outdated
                if(err.response.status === 403){
                    navigate('/login',{state:{from:location},replace})
                }
            }
        }
        FetchAlluser()

        return ()=>{
            isMounted = false
            controller.abort()
        }

    },[])

    //Logout
    const logout = async()=>{
        try{

        await axios.post('/api/auth/logout')
        localStorage.setItem('persist',false)
        setPersist(false)
        dispatch(RemoveUser())
        navigate('/login',{state:{from:location},replace:true})

        }catch(err){
            console.log(err)
        }

    }

    return (
        <>
        <button onClick={logout}>logout</button>
        
        <div>{
            users.length > 0 ? users.map((user)=>
            user.username
            ):
            "empty list"
            }</div>
            
        </>
    )
}

export default User