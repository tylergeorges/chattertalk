import { useEffect, useState, useRef} from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { fetchHome, getLogin, loginAcc, createServer, logout, getTextChannel, sendMessage, setNotifis, createMessage } from "../actions/actions"
import axios from "axios"
import { useHistory } from "react-router-dom"
import { w3cwebsocket as W3CWebSocket } from "websocket"
import SideBar from "../components/SideBar"
import ServerChannels from "../components/ServerChannels"
import { ThemeProvider } from "@emotion/react"
import { Box, circularProgressClasses, createTheme, Grid, List, Typography } from "@mui/material"
import { CompareSharp } from "@mui/icons-material"

const mapStateToProps = (state) => ({
    login_status: state.login_status,
    currentuser: state.currentuser,
    servers: state.servers,
    currentchannel: state.currentchannel,
    isLoading: state.isLoading,
    auth_token: state.auth_token
})

const drawerWidth = 150
const theme = createTheme({
    palette: {
        background: {
            default: '#1F1C2C',
            dark: '#353241',
            light: '#423f51'
        },
        text: {
            primary: 'white',
            secondary: 'black',
        },
        action: {
            active: '#001E3C',
        },
        success: {
            light: '#81c784',
            main: '#66bb6a',
            dark: '#388e3c',
        },
    },
    components: {
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    backgroundColor: "#353241",
                    color: "red",
                }
            }
        }
    }

});



const TextChannelMsgs = (props) => {
    const [textContent, setTextContent] = useState('')
    const [messages, setMessages] = useState([])
    const [newmsg, setNewMessages] = useState()
    const [usersMentioned, setUsersMentioned] = useState([])
    const [currClient, setClient] = useState(null)
    const [update, setUpdate] = useState(false)
    
    const messageRef = useRef();
    const ws = useRef(null);
    const url = window.location.pathname.split('/').pop();
    const history = useHistory()
    
    const handleTextContent = (e) => {
        e.preventDefault()
    

        if(e.target.value.indexOf('@') >= 0){
            let users = e.target.value.split('@').pop()

            if(users.indexOf(" ") >= 0 && users.indexOf("#") >= 0){
               let usersInfo = users.substring(0, users.indexOf(" "))
               let userTag = '#' + usersInfo.split('#').pop()

              
                if(usersInfo !== '' &&  userTag.length === 5 && usersMentioned.includes(usersInfo) === false){
                    setUsersMentioned([...usersMentioned, usersInfo.trim()])
                    // e.target.value.classList.add('mention')
                 
                }
           
            }
      
           
        }
         setTextContent(e.target.value.trim())
        
        // setTextContent(e.target.value)
    }

    const sendMsg =  (e) => {
        e.preventDefault()
      
      
        if(usersMentioned.length > 0){
            props.createMessage(
                {
            'serverid':props.serverid,
            'channelid': props.channelid,
            'text_content': textContent,
            'users_mentioned': usersMentioned,
            'auth_token': props.auth_token, 
            'currentuser':props.currentuser,
            'channelid': props.channelid, 
            'isMention': true
        }
        )

            ws.current.send(JSON.stringify({
                'event': 'send_msg',
                'text_content': textContent,
               'users': usersMentioned,
               'currentuser': props.currentuser,
               'isMention': true
            }))
            setUsersMentioned([])
        }
        else if(usersMentioned.length == 0){
            props.createMessage(
                {
            'serverid':props.serverid,
            'channelid': props.channelid,
            'text_content': textContent,
            'users_mentioned': usersMentioned,
            'auth_token': props.auth_token, 
            'currentuser':props.currentuser,
            'channelid': props.channelid, 
            'isMention': false
        }
        )

            ws.current.send(JSON.stringify({
                'event': 'send_msg',
                'text_content': textContent,
               'users': usersMentioned,
               'currentuser': props.currentuser,
               'isMention': false
            }))
            setUsersMentioned([])
        }
        ws.current.onmessage =  (e) => {
            const data =  JSON.parse(e.data)
         //    props.setNotifis()
         console.log(data)
          if(data.model == 'chatroom.message'){
             
            setMessages((prevState)=>[...prevState, data])
            messageRef.current.scrollIntoView({ block: 'end', behavior: 'smooth' });
        }
        if(data[0].model === 'chatroom.notifications'){
            props.setNotifis(data)
        }
     }
     

    }


    useEffect( () => {
        // props.getTextChannel(props.serverid, props.channelid)
        ws.current = new W3CWebSocket(`ws://127.0.0.1:8000/channels/${props.serverid}/${props.channelid}/`);
        // setClient(client)

        
        ws.current.onopen =  (e) => {
            e.preventDefault()
            console.log('connected')
            
            ws.current.send(JSON.stringify({
                'event': 'receive_msgs',
            }))

            ws.current.send(JSON.stringify({
                'event': 'receive_notifs',
            }))
        }
        
           ws.current.onclose = () =>{
            console.log('close')
        }
        
        ws.current.onmessage =  (e) => {
               const data =  JSON.parse(e.data)
            //    props.setNotifis()
            console.log(data)
            if(messages.length === 0 && data[0].model === "chatroom.message" ){
                setMessages(data)
                // window.scrollTo(0, messageRef.current.offsetTop);
                messageRef.current.scrollIntoView({ block: 'end', behavior: 'smooth' });
            }
            // if(data.notifis){
            //     console.log(data)
            //         props.setNotifis(data)
                    
            //     }
            else if(data[0].model === "chatroom.notifications"){
                    props.setNotifis(data)
                    
                }
               
             if(data.model){
                
               setMessages([...messages, data])
               messageRef.current.scrollIntoView({ block: 'end', behavior: 'smooth' });
           }
      
        }
    
          
        return() =>{
            ws.current.close()
                       
               }
    
    }, [url])
 
    

    //! send msg button
   
    return (
           
        <>

            <div className="chatboxcon">
                
         {messages.map(msg => {
             var dateOptions = {hour: 'numeric', minute: 'numeric', hour12: true};
             var datetime = new Date(msg.fields.created_at).toLocaleString('en', dateOptions);
                return(
                    <div className='allmsgsCon'>
                        <div  className='allmessages'  style={msg.fields.isMention && msg.fields.user_mentioned === props.currentuser.id ? {background: 'rgba(255, 217, 61,0.3)', width: '100%'} : {}} >
                            <div className="userMsgInfoCon" >
                                <h4 className="userMsgUsername">{msg.fields.author.username}</h4>
                                <p className="userMsgTime" style={{fontSize: 'smaller'}}>{datetime}</p>
                            </div>

                             <p  key={msg.pk}  className='messagecontent'>{msg.fields.text_content}</p> 
                             </div>
                             </div>
                )
            }) }
            
            <div ref={messageRef}/>
            </div>
            <div className="messageconParent">
                    <form className="messageCon" autoC  omplete="off" >
                            <input type="text" placeholder="Send a message... " name="message" onChange={handleTextContent} id="messageInput" />
                            <button type="submit" style={{display:'none'}} onClick={sendMsg} >Send</button>
                    </form>
                    </div>
        </>
           
    )
}

export default connect(mapStateToProps, { logout, getTextChannel, sendMessage, setNotifis, createMessage })(TextChannelMsgs)