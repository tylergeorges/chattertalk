import cookie from 'react-cookies'
import { useHistory } from "react-router-dom";

var axios = require("axios");
var axiosDefaults = require("axios/lib/defaults");
export const ADD_ACCOUNT = "ADD_ACCOUNT"

export const CREATE_POST = "CREATE_POST"
export const FOLLOW_USER = "FOLLOW_USER"
export const SEARCH_USER =  "SEARCH_USER"
export const GET_PROFILE = "GET_PROFILE"
export const FOLLOW_ACCOUNT = "FOLLOW_ACCOUNT"
export const LOGIN_ACC = "LOGIN_ACC"
export const USER_NOTFI = "USER_NOTFI"
export const UNFOLLOW_ACC = "UNFOLLOW_ACC"
export const GET_CHANNEL = "GET_CHANNEL"
export const REPLY_POST = "REPLY_POST"
export const DELETE_POST = "DELETE_POST"

export const FETCH_CR_START = "FETCH_CR_START"
export const FETCH_CR_SUCCESS = "FETCH_CR_SUCCESS"
export const FETCH_CR_FAIL = "FETCH_CR_FAIL"
export const FETCH_CR_HOME = "FETCH_CR_HOME"
export const FETCH_LOG_OUT = "FETCH_LOG_OUT"
export const FETCH_CR_LOGIN = "FETCH_CR_LOGIN"
export const FETCH_SERVER = "FETCH_SERVER"
export const CREATE_CHANNEL = "CREATE_CHANNEL"


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
   
    dispatch({type: FETCH_CR_START})

    instance 
    .post('register', JSON.stringify(acc))
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
        
        // dispatch({type: FETCH_SM_REGISTER, payload: data})
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
    // .then(data =>console.log(data))
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
        dispatch({type: FETCH_CR_HOME, payload: data})
    })
    .catch(err=>{
        dispatch({type: FETCH_CR_FAIL, payload: err.message})
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
        // dispatch({type: FETCH_CR_HOME, payload: data})
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
        // console.log(data)
        dispatch({type: GET_CHANNEL, payload: data})
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



export const logout = () =>  async(dispatch) =>{



    dispatch({type: FETCH_CR_START})
    instance 
    .get(`/logout`)
    .then(data =>{
        // dispatch({type: FETCH_CR_HOME, payload: data})
    })
    .catch(err=>{
        dispatch({type: FETCH_CR_FAIL, payload: err.message})
        console.log(err.message)
    })
}