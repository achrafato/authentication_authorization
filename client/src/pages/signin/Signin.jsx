import React from 'react'
import './signin.css'
import { useState,useEffect,useRef} from 'react'

//axios
import axios from 'axios'
//custom-hook
import useAuth from '../../hooks/useAuth'

//actions
import {StartLogin,SuccessLogin,FailedLogin} from '../../context/Actions'
//router-dom
import {useLocation,useNavigate} from 'react-router-dom'

const Signin = () => {

    const  {setPersist,dispatch} = useAuth()

    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')

    const input = useRef()

    useEffect(()=>{
        input.current.focus()
    },[])

    useEffect(()=>{
        setError('')
    },[username,password])

    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || '/' 

    console.log(location.state.from)
    const handleSubmit = async(e)=>{
        e.preventDefault()
        
        dispatch(StartLogin)
        try{
            const {data} = await axios.post('/api/auth/signin',
            {username,password},
            {
                headers:{'Content-Type': 'application/json'},
                withCredentials:true}
        )
            localStorage.setItem('persist',JSON.stringify(true))
            setPersist(true)//persist login
            dispatch(SuccessLogin(data))

            navigate(location.state.from,{replace:true})//if user click on goBack he will not return to loginpage

        }catch(err){
            dispatch(FailedLogin(err))
            if(err?.response){
                setError('No server response')
            }else if(err?.response?.status === 400){
                setError('issue with credentials')
            }else if (err?.response?.status === 401){
                setError('Unauthorized')
            }else{
                setError('Login failed')
            }
        }
    }

    return (
        <div className="signin">
            <div className="container">
                <form onSubmit={handleSubmit}>

                    <div className="item">
                        <label htmlFor='user'>Username</label>
                        <input type="text"
                        ref={input}
                        id="user"
                        value={username}
                        onChange={(e)=> setUsername(e.target.value)}/>
                    </div>

                    <div className="item">
                        <label htmlFor='passwrod'>Password</label>
                        <input type="password" id="passwrod" value={password} onChange={(e)=> setPassword(e.target.value)}/>
                    </div>

                    <button type='submit'>Sign in</button>
                    
                </form>
            </div>
        </div>
    )
}

export default Signin