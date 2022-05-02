import { useEffect, useState, useRef} from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { fetchHome, getLogin, loginAcc, createServer, logout, getTextChannel, sendMessage } from "../actions/actions"
import axios from "axios"
import { useHistory } from "react-router-dom"
import { w3cwebsocket as W3CWebSocket } from "websocket"
import SideBar from "../components/SideBar"
import ServerChannels from "../components/ServerChannels"
import { ThemeProvider } from "@emotion/react"
import { Box, createTheme, Grid, List, Typography } from "@mui/material"

const mapStateToProps = (state) => ({
    login_status: state.login_status,
    currentuser: state.currentuser,
    servers: state.servers,
    currentchannel: state.currentchannel,
    isLoading: state.isLoading
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
    const [usersMentioned, setUsersMentioned] = useState([])
    const [currClient, setClient] = useState(null)
    const [update, setUpdate] = useState(false)
    const messageRef = useRef();

    const history = useHistory()

    useEffect( () =>  {
        let client = props.client
        setClient(client)
        console.log(client)

        if(currClient !== null){
            
            client.onopen =  (e) => {
                e.preventDefault()
                console.log('connected')
                currClient.send(JSON.stringify({
                    'event': 'receive_msgs',
               }))
         
            
     //        client.send(JSON.stringify({
     //         'event': 'receive_msgs',
     //    }))
     
        }
           console.log(currClient)
           currClient.onclose = () =>{
            console.log('close')
        }
           currClient.onmessage =  (e) => {
               const data =  JSON.parse(e.data)
               // if(data.fields.created_in === channelId){
                   console.log(data)
                if(data[0].model == 'chatroom.message'){
                    setMessages([data])
                }
                     messageRef.current.scrollIntoView({ block: 'end', behavior: 'smooth' });
                  
               // }
                
           }
           return() =>{
            currClient.close()
                       
               }
          
        }
    
    }, [currClient])

    const handleTextContent = (e) => {
        e.preventDefault()


        if(e.target.value.indexOf('@') >= 0){
            let users = e.target.value.split('@').pop()

            if(users.indexOf(" ") >= 0 && users.indexOf("#") >= 0){
               let usersInfo = users.substring(0, users.indexOf(" "))
               let userTag = '#' + usersInfo.split('#').pop()

              
                if(usersInfo !== '' &&  userTag.length === 5 && usersMentioned.includes(usersInfo) === false){
                    setUsersMentioned([...usersMentioned, usersInfo.trim()])
                }
           
            }
      
           
        }
        console.log(usersMentioned)
         setTextContent(e.target.value.trim())
        
        // setTextContent(e.target.value)
    }

    //! send msg button
    const sendMsg =  (e) => {
        e.preventDefault()
      
      
        console.log(usersMentioned ? 'true': 'false')
        if(usersMentioned){
            currClient.send(JSON.stringify({
                'event': 'send_msg',
                'text_content': textContent,
               'users': usersMentioned,
           }))
        }
        else{
            currClient.send(JSON.stringify({
                'text_content': textContent,
            }))
        }


    }
    return (
           
        <>

            <div className="chatboxcon">
             
            
         {  messages.map(msg => {
             console.log(messages)
                return(
                    <div className="allmsgsCon" >
                    {msg.map(message =>{
                        var dateOptions = {hour: 'numeric', minute: 'numeric', hour12: true};
                        var datetime = new Date(message.fields.created_at).toLocaleString('en', dateOptions);
                        return(
                          <div className="allmessages">
                            <div className="userMsgInfoCon">
                                <h4 className="userMsgUsername">{message.fields.author.user}</h4>
                                <p className="userMsgTime" style={{fontSize: 'smaller'}}>{datetime}</p>
                            </div>

                             <p ref={messageRef} key={message.pk} className="messagecontent">{message.fields.text_content}</p>
                             <div />
                             </div>
                             )
                            })}
                    </div>
                )
            }) }
            
            </div>
                    <form className="messageCon" autoComplete="off">
                            <input type="text" placeholder="Send a message... " name="message" onChange={handleTextContent} id="messageInput" />
                            <button type="submit" style={{display:'none'}} onClick={sendMsg} >Send</button>
                    </form>
            
        </>
           
    )
}

export default connect(mapStateToProps, { logout, getTextChannel, sendMessage })(TextChannelMsgs)