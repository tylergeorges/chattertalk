import { ADD_ACCOUNT, CREATE_CHANNEL, CREATE_MESSAGE, FETCH_CR_FAIL, FETCH_CR_HOME, FETCH_CR_LOGIN, FETCH_CR_START, FETCH_CR_SUCCESS, FETCH_SERVER, GET_CHANNEL, GET_LOGIN, LOGIN_ACC, SET_NOTIFIS} from "../actions/actions"

const initialState = ({
   currentuser: '',
   error: '',
   isLoading: false,
   isLoggedIn: false,
   login_status: '',
   servers: [],
   current_server: '',
   text_channels: [],
   auth_token: '',
   notifs: []
})

export default function reducer(state=initialState, action){
    switch(action.type){
        case FETCH_CR_START:
            console.log('loading')
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
        case FETCH_CR_LOGIN:
            return{
                ...state, isLoading:false,  error: '', isLoggedIn: action.payload.data.isLoggedIn
            }
        case LOGIN_ACC:
            return{
                ...state, isLoading:false,  error: '', auth_token: action.payload.data.Authorization, isLoggedIn: action.payload.data.isLoggedIn
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
            return{
                ...state, isLoading:false, currentuser: state.currentuser, error: '', current_server: action.payload.data.data.current_server, text_channels: action.payload.data.data.text_channels, auth_token: action.payload.data.token
            }
        case CREATE_CHANNEL:
            return{
                ...state, isLoading:false, currentuser: state.currentuser, error: '', current_server: action.payload.data.data.current_server,
            }
        case GET_CHANNEL:

            return{
                ...state, isLoading:false, currentuser: action.payload.data.current_user, error: '', auth_token: action.payload.data.token,
            }
        case SET_NOTIFIS:
            return{
                ...state, isLoading:false, error: '', notifs: action.payload.length ? [...action.payload] : [...state.notifs, action.payload]
            }
        
        case CREATE_MESSAGE:

            return{
                ...state, isLoading:false, error: '', notifs: action.payload.data.notifis ? [...state.notifs, action.payload.data.notifis]: state.notifs
            }
        
        default: return state
    }
}