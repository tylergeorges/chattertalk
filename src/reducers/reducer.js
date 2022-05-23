import { ADD_ACCOUNT, CREATE_CHANNEL, CREATE_MESSAGE, CREATE_SERVER, FETCH_CR_FAIL, FETCH_CR_HOME, FETCH_CR_LOGIN, FETCH_CR_REGISTER, FETCH_CR_START, FETCH_CR_SUCCESS, FETCH_LOG_OUT, FETCH_SERVER, GET_CHANNEL, GET_LOGIN, JOIN_SERVER, LOGIN_ACC, SET_CLIENT, SET_MSGS, SET_NOTIFIS} from "../actions/actions"

const initialState = ({
   currentuser: '',
   error: '',
   isLoading: false,
   isLoggedIn: null,
   login_status: '',
   servers: [],
   current_server: '',
   text_channels: [],
   auth_token: '',
   notifs: [],
   msgs: [], 
   client: null,
   invite_code:''
})

export default function reducer(state=initialState, action){
    switch(action.type){
        case FETCH_CR_START:
        return{
            ...state, isLoading:true,  error: '', currentuser: state.currentuser
        }
        case FETCH_CR_FAIL:
        return{
            ...state, isLoading:false, currentuser: state.currentuser, error: action.payload
        }
        case FETCH_CR_SUCCESS:
        return{
            ...state, isLoading:false, currentuser: state.currentuser, error: ''
        }
        case FETCH_CR_LOGIN:
            return{
                ...state, isLoading:false,  error: '', isLoggedIn: action.payload.data.isLoggedIn
            }
        case FETCH_CR_REGISTER:
            return{
                ...state, isLoading:false,  error: '', isLoggedIn: action.payload.data.isLoggedIn
            }
        case LOGIN_ACC:
            return{
                ...state, isLoading:false,  error: '', auth_token: action.payload.data.Authorization, isLoggedIn: action.payload.data.isLoggedIn
            }
        case FETCH_LOG_OUT:
            return{
                ...state, isLoggedIn: false
            }
        case ADD_ACCOUNT:
        return{
            ...state, isLoading:false, currentuser: action.payload.currentuser, error: ''
        }
        case FETCH_CR_HOME:
            if(action.payload.data.data.servers){
                return{
                    ...state, isLoading:false,currentuser: action.payload.data.data.currentuser, servers: [...action.payload.data.data.servers], error: '', auth_token: action.payload.data.token, isLoggedIn: action.payload.data.data.isLoggedIn
                }
            }
            
        case FETCH_SERVER:
            return{
                ...state, isLoading:false, 
                currentuser: state.currentuser, 
                error: '', 
                current_server: action.payload.data.data.current_server, 
                text_channels: [...action.payload.data.data.text_channels], 
                auth_token: action.payload.data.token,
                invite_code:action.payload.data.data.invite_code
            }
        case CREATE_SERVER:
            // action.payload.data.server.server_icon[0].pop()
            return{
                ...state, isLoading:false, currentuser: state.currentuser, error: '', current_server: state.current_server, servers: [...state.servers, action.payload.data], auth_token: state.token
            }
        case JOIN_SERVER:
            return{
                ...state, isLoading:false, currentuser: state.currentuser, error: '', current_server: state.current_server, servers: state.servers, auth_token: state.token
            }
        case CREATE_CHANNEL:
            return{
                ...state, isLoading:false, currentuser: state.currentuser, error: '', current_server: state.current_server,text_channels: [...state.text_channels, action.payload.data.chanel]
            }
        case GET_CHANNEL:
            return{
                ...state, isLoading:false, currentuser: action.payload.data.current_user, error: '', auth_token: action.payload.data.token,
            }
        case SET_NOTIFIS:
            if(action.payload[0].user === state.currentuser.id){
                return{
                    ...state, isLoading:false, error: '', notifs: action.payload.length ? [...action.payload] : [...state.notifs, action.payload], currentuser: state.currentuser
                }
            }else{
                return{
                    ...state, isLoading:false, error: '', notifs: state.notifs, currentuser: state.currentuser
                }
            }
        case SET_MSGS:
            if(!action.payload.model){
                return{
                    ...state, isLoading:false, error: '',  currentuser: state.currentuser, msgs: [...action.payload]
                }
            }
            else{
                return{
                    ...state, isLoading:false, error: '',  currentuser: state.currentuser, msgs: [...state.msgs, action.payload]
                }
            }
        case SET_CLIENT:
                return{
                    ...state, isLoading:false, error: '',  currentuser: state.currentuser, client: action.payload
                }
        case CREATE_MESSAGE:
            if(action.payload.data.notifis.user_mentioned === state.currentuser.id){
                return{
                    ...state, isLoading:false, error: '', notifs: action.payload.data.notifis ? [...state.notifs, action.payload.data.notifis]: state.notifs, currentuser: state.currentuser
                }
            
            }else{
                return{
                    ...state, isLoading:false, error: '', notifs: state.notifs, currentuser: state.currentuser
                }
            }
        default: return state
    }
}