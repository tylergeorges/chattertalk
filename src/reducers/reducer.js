import { combineReducers } from "redux"
import { connectRouter } from 'connected-react-router'

import { ADD_ACCOUNT, CREATE_CHANNEL, CREATE_MESSAGE, CREATE_SERVER, FETCH_CR_FAIL, FETCH_CR_HOME, FETCH_CR_LOGIN, FETCH_CR_REGISTER, FETCH_CR_START, FETCH_CR_SUCCESS, FETCH_LOG_OUT, FETCH_SERVER, FETCH_SERVER_PREVIEW, GET_CHANNEL, GET_LOGIN, GET_SERVER_ID, HIDE_FORM, IS_LOGGEDIN, JOIN_SERVER, LOGIN_ACC, NEXT_STEP, SET_CLIENT, SET_MSGS, SET_NOTIFIS} from "../actions/actions"

export const initialState = ({
   currentuser: '',
   error: '',
   isLoading: null,
   isLoggedIn: null,
   login_status: null,
   servers: [],
   current_server: '',
   server_preview: '',
   text_channels: [],
   auth_token: '',
   notifs: [],
   msgs: [], 
   client: null,
   invite_code:'',
   hide_form: false,
   nextFormStep: false,
   server_id: null
})

 export default function reducer(state=initialState, action){
    switch(action.type){
        case FETCH_CR_START:
        return{
            ...state, isLoading:true,  error: ''
        }
        case FETCH_CR_FAIL:
        return{
            ...state, isLoading: false
        }
        case FETCH_CR_SUCCESS:
        return{
            ...state,  currentuser: state.currentuser, error: '', isLoading: false
        }
        case FETCH_CR_LOGIN:
            return{
                ...state,  error: '', isLoggedIn: Boolean(action.payload.data.isLoggedIn), isLoading: false
            }
        case FETCH_CR_REGISTER:
            return{
                ...state, isLoading:false,  error: '', isLoggedIn: Boolean(action.payload.data.isLoggedIn)
            }
        case LOGIN_ACC:
            return{
                ...state, isLoading:false,  error: '', auth_token: action.payload.data.Authorization, isLoggedIn: action.payload.data.isLoggedIn
            }
        case FETCH_LOG_OUT:
            return{
                ...state, isLoggedIn: false, isLoading: false
            }
        case ADD_ACCOUNT:
        return{
            ...state, isLoading:false, currentuser: action.payload.currentuser, error: ''
        }
        case HIDE_FORM:
        return{
            ...state, hide_form: !state.hide_form
        }
        case FETCH_CR_HOME:
            if(action.payload.data.data.servers){
                return{
                    ...state, 
                    currentuser: action.payload.data.data.currentuser, 
                    isLoading: false, 
                    servers: [...action.payload.data.data.servers], 
                    error: '', 
                    auth_token: action.payload.data.token, 
                    isLoggedIn: action.payload.data.data.isLoggedIn,
                    server_preview: state.server_preview,
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
        case FETCH_SERVER_PREVIEW:
            return{
                ...state, isLoading:false, 
                currentuser: state.currentuser, 
                error: '', 
                server_preview: action.payload.data.server, 
                auth_token: action.payload.data.token,
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
                ...state, isLoading:false, isLoggedIn: action.payload.data.isLoggedIn, server_id: Number(action.payload.data.data.server_id)
            }
        case SET_NOTIFIS:
            if(action.payload[0].user === state.currentuser.id){
                return{
                    ...state, isLoading:false, error: '', notifs: action.payload.length ? action.payload : [...state.notifs, action.payload], currentuser: state.currentuser
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
        case NEXT_STEP:
                return{
                    ...state, isLoading:false, error: '',   nextFormStep: !state.nextFormStep
                }
        case GET_SERVER_ID:
                return{
                    ...state, isLoading:false, error: '',   server_id: Number(action.payload)
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

