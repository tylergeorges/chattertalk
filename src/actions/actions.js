import cookie from 'react-cookies'
import { useHistory } from "react-router-dom";

var axios = require("axios");
var axiosDefaults = require("axios/lib/defaults");
export const ADD_ACCOUNT = "ADD_ACCOUNT"

export const LOGIN_ACC = "LOGIN_ACC"
export const USER_NOTFI = "USER_NOTFI"
export const GET_CHANNEL = "GET_CHANNEL"

export const FETCH_CR_START = "FETCH_CR_START"
export const FETCH_CR_SUCCESS = "FETCH_CR_SUCCESS"
export const FETCH_CR_FAIL = "FETCH_CR_FAIL"
export const FETCH_CR_HOME = "FETCH_CR_HOME"
export const FETCH_CR_LOGIN = "FETCH_CR_LOGIN"
export const FETCH_CR_REGISTER = "FETCH_CR_REGISTER"
//CR short for "ChatRoom"

export const FETCH_LOG_OUT = "FETCH_LOG_OUT"
export const FETCH_SERVER = "FETCH_SERVER"
export const CREATE_CHANNEL = "CREATE_CHANNEL"
export const CREATE_SERVER = "CREATE_SERVER"
export const JOIN_SERVER = "JOIN_SERVER"
export const SET_NOTIFIS = "SET_NOTIFIS"
export const SET_MSGS = "SET_MSGS"
export const CREATE_MESSAGE = "CREATE_MESSAGE"
export const SET_CLIENT = "SET_CLIENT"


// const csrftoken = ('; '+ document.cookie).split(`; csrftoken=`).pop().split(';')[0];

const instance = axios.create({ 
    baseURL:'http://127.0.0.1:8000/',   
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json',
      }
   
})

export const fetchCr = () => (dispatch) =>{
    dispatch({type: FETCH_CR_START})
    instance 
    .get('/',)
    .then(data =>{
        dispatch({type: FETCH_CR_SUCCESS, payload: data})
    })
    .catch(err=>{
        dispatch({type: FETCH_CR_FAIL, payload: err.message})
        console.log(err.message)
    })
}


export const addAccount = (acc) => (dispatch) =>{
    const config = {headers:{"content-type":"multipart/form-data"}}
    dispatch({type: FETCH_CR_START})

    let formData = new FormData() 
    formData.append('profile_picture', acc.profile_picture);
    formData.append('username', acc.username);
    formData.append('password', acc.password);


    instance 
    .post('register', formData, config)
    .then(data =>{
        // dispatch({type: ADD_ACCOUNT, payload: data})
    })
    .catch(err=>{
        dispatch({type: FETCH_CR_FAIL, payload: err.message})
        console.log(err.message)
    })
}


export const fetchRegister = (acc) => (dispatch) =>{
    dispatch({type: FETCH_CR_START})

    instance 
    .get('register',)
    .then(data =>{
        dispatch({type: FETCH_CR_REGISTER, payload: data})
    })
    .catch(err=>{
        dispatch({type: FETCH_CR_FAIL, payload: err.message})
        console.log(err.message)
    })
}

export const loginAcc = (acc) =>   (dispatch) =>{
    
    dispatch({type: FETCH_CR_START})
     instance 
    .post('login',  JSON.stringify(acc))
    .then(data =>dispatch({type: LOGIN_ACC, payload: data}))
    .catch(err=>{
        dispatch({type: FETCH_CR_FAIL, payload: err.message})
        console.log(err.message)
    })
}
export const getLogin = (acc) => (dispatch) =>{
    dispatch({type: FETCH_CR_START})
    instance 
    .get('login')
    .then(data =>dispatch({type: FETCH_CR_LOGIN, payload: data}))
    .catch(err=>{
        dispatch({type: FETCH_CR_FAIL, payload: err.message})
        console.log(err.message)
    })
}

export const fetchHome = () =>  (dispatch) =>{
    dispatch({type: FETCH_CR_START})
    instance 
    .get(`/home`, )
    .then(data =>{
        console.log(data)
        dispatch({type: FETCH_CR_HOME, payload: data})
    })
    .catch(err=>{
        dispatch({type: FETCH_CR_FAIL, payload: 401})
        console.log(err.message)
    })
}

export const createServer = (serverInfo) =>  async(dispatch) =>{
    const config = {headers:{"content-type":"multipart/form-data", Authorization:`Token ${serverInfo.auth_token}`}}

    let formData = new FormData(); // creates a new FormData object
    formData.append('server_name', serverInfo.server_name);
    formData.append('server_icon', serverInfo.server_icon); // add your file to form data

    dispatch({type: FETCH_CR_START})
    instance 
    .post(`/home`, formData, config)
    .then(data =>{
        dispatch({type: CREATE_SERVER, payload: data})
    })
    .catch(err=>{
        dispatch({type: FETCH_CR_FAIL, payload: err.message})
        console.log(err.message)
    })
}

export const joinServer = (serverInfo) =>  async(dispatch) =>{
    const config = {headers:{Authorization:`Token ${serverInfo.auth_token}`}}
    console.log(serverInfo)

    dispatch({type: FETCH_CR_START})
    instance 
    .post(`/server/${serverInfo.invite_code}/members/${serverInfo.user_id}/`, serverInfo, config)
    .then(data =>{
        console.log(data)
        dispatch({type: JOIN_SERVER, payload: data})
    })
    .catch(err=>{
        dispatch({type: FETCH_CR_FAIL, payload: err.message})
        console.log(err.message)
    })
}

export const getServer = (server_id) => (dispatch) =>{

    dispatch({type: FETCH_CR_START})
    instance 
    .get(`/server/${server_id}/`)
    .then(data =>{
        dispatch({type: FETCH_SERVER, payload: data})
    })
    .catch(err=>{
        dispatch({type: FETCH_CR_FAIL, payload: err.message})
        console.log(err.message)
    })
}

export const setNotifis = (notifis) => (dispatch) =>{
    dispatch({type: SET_NOTIFIS, payload: notifis})
   
}
export const setMsgs = (msgs) => (dispatch) =>{
    dispatch({type: SET_MSGS, payload: msgs})
   
}
export const setClient = (client) => (dispatch) =>{
    dispatch({type: SET_CLIENT, payload: client})
   
}


export const createTextChannel = (channel_info) => (dispatch) =>{
    dispatch({type: FETCH_CR_START})
    instance 
    .post(`/server/${channel_info.server_id}/`, {text_channel_name: channel_info.text_channel_name, server_id: channel_info.server_id}, {headers:{Authorization: `Token ${channel_info.token}`}})
    .then(data =>{
        dispatch({type: CREATE_CHANNEL, payload: data})
    })
    .catch(err=>{
        dispatch({type: FETCH_CR_FAIL, payload: err.message})
        console.log(err.message)
    })
}
export const getTextChannel = (server_id, channel_id) => (dispatch) =>{

    dispatch({type: FETCH_CR_START})
    instance 
    .get(`/channels/${server_id}/${channel_id}/`, )
    .then(data =>{
        dispatch({type: GET_CHANNEL, payload: data})
    })
    .catch(err=>{
        dispatch({type: FETCH_CR_FAIL, payload: err.message})
        console.log(err.message)
    })
}
export const createMessage = (msginfo) => (dispatch) =>{
    dispatch({type: FETCH_CR_START})
    instance 
    .post(`/channels/${msginfo.serverid}/${msginfo.channelid}/`, 
    {
        text_content: msginfo.text_content, users_mentioned: msginfo.users_mentioned, 
        author: msginfo.currentuser, created_in:msginfo.channelid, isMention: msginfo.isMention}, {headers:{Authorization: `Token ${msginfo.auth_token}`}})
    .then(data =>{
        dispatch({type: CREATE_MESSAGE, payload: data})
    })
    .catch(err=>{
        dispatch({type: FETCH_CR_FAIL, payload: err.message})
        console.log(err.message)
    })
}
export const sendMessage = (message) => (dispatch) =>{


    dispatch({type: FETCH_CR_START})
    instance 
    .post(`/channels/${message.server_id}/${message.channel_id}/`, message , {headers:{Authorization:`Token ${message.token}`}})
    .then(data =>{
        // dispatch({type: CREATE_CHANNEL, payload: data})
    })
    .catch(err=>{
        dispatch({type: FETCH_CR_FAIL, payload: err.message})
        console.log(err.message)
    })
}



export const logout = () =>  (dispatch) =>{

    dispatch({type: FETCH_CR_START})
    instance 
    .get(`/logout`)
    .then(data =>{
        dispatch({type: FETCH_LOG_OUT})
    })
    .catch(err=>{
        dispatch({type: FETCH_CR_FAIL, payload: err.message})
        console.log(err.message)
    })
}