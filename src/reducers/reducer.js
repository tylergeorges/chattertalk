import { ADD_ACCOUNT, CREATE_CHANNEL, FETCH_CR_FAIL, FETCH_CR_HOME, FETCH_CR_LOGIN, FETCH_CR_START, FETCH_CR_SUCCESS, FETCH_SERVER, GET_CHANNEL, GET_LOGIN, LOGIN_ACC} from "../actions/actions"

const initialState = ({
   currentuser: '',
   error: '',
   isLoading: false,
   login_status: '',
   servers: [],
   current_server: '',
   text_channels: [],
   auth_token: ''
})

export default function reducer(state=initialState, action){
    switch(action.type){
        case FETCH_CR_START:
        return{
            ...state, isLoading:true, currentuser: state.currentuser, error: '', 
        }
        case FETCH_CR_FAIL:
        return{
            ...state, isLoading:false, currentuser: state.currentuser, error: action.payload, 
        }
        case FETCH_CR_SUCCESS:
        return{
            ...state, isLoading:false, currentuser: state.currentuser, error: '', 
        }
        case LOGIN_ACC:
           console.log(action.payload.data.Authorization)
            return{
                ...state, isLoading:false,  error: '', auth_token: action.payload.data.Authorization
            }
        case ADD_ACCOUNT:
        return{
            ...state, isLoading:false, currentuser: action.payload.currentuser, error: ''
        }
        case FETCH_CR_HOME:
            return{
                ...state, isLoading:false, currentuser: action.payload.data.data.currentuser, error: '', servers: action.payload.data.data.servers, auth_token: action.payload.data.token
            }
        case FETCH_SERVER:
            console.log(action.payload.data.token)
            return{
                ...state, isLoading:false, currentuser: state.currentuser, error: '', current_server: action.payload.data.data.current_server, text_channels: action.payload.data.data.text_channels, auth_token: action.payload.data.token
            }
        case CREATE_CHANNEL:
            console.log(action.payload)
            return{
                ...state, isLoading:false, currentuser: state.currentuser, error: '', current_server: action.payload.data.data.current_server,
            }
        case GET_CHANNEL:
            console.log(action.payload.data.current_user)
            return{
                ...state, isLoading:false, currentuser: action.payload.data.current_user, error: '', auth_token: action.payload.data.token,
            }
        
        default: return state
    }
}