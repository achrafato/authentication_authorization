

export const Reducer = (state,action)=>{

    switch(action.type){
        case 'Start_login':
            return {user:null,loading:true,error:null}

        case 'Success_Login':
            return {user:action.payload,loading:false,error:null}

        case 'Failed_Login':
            return {user:null,loading:false,error:action.payload}
        
        case 'Update_User':
            return {...state,user:{isAdmin:action.payload.isAdmin,accessToken:action.payload.accessToken}}

        case 'Remove_user':
            return {user:null,loading:false,error:null}
        default:
            return state
    }
}