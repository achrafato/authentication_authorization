
export const StartLogin = ()=>{
    return {
        type:'Start_login'
    }
}

export const SuccessLogin = (data)=>{
    return{
        type:'Success_Login',
        payload:data
    }
}

export const FailedLogin = (error)=>{
    return{
        type:'Failed_Login',
        payload:error
    }
}

export const UpdateUser = (data)=>{
    return{
        type:'Update_User',
        payload:data
    }
}

export const RemoveUser = ()=>{
    return{
        type:'Remove_user'
    }
}