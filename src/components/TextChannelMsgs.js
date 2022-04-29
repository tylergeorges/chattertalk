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
    const [serverIcon, setServerIcon] = useState(null)
    const [messages, setMessages] = useState([])
    const [newMsg, setNewMsg] = useState('')
    const [currClient, setClient] = useState('')
    const ws = useRef(null);
    const messageRef = useRef();
 


    useEffect(() => {
        props.getTextChannel(props.serverid, props.channelid)
       
        
            // console.log(props)
            const serverId = props.serverid
            const channelId = props.channelid
            const client = new W3CWebSocket(`ws://127.0.0.1:8000/channels/${serverId}/${channelId}/`);


           

             client.onopen =  (e) => {
                e.preventDefault()
                console.log('connected')
            
            }
            client.onclose = () =>{
                console.log('close')
            }
            setClient(client)

           
            client.onmessage =  (e) => {
                const data = JSON.parse(e.data)
                //  document.querySelector('#chat-text').value += (data.map(msgs =>  `${msgs.fields.author.user}:${msgs.fields.text_content}`) + '\n')
                setMessages([...messages, data])
                
                // if(data.fields.author.user )
                messageRef.current.scrollIntoView({ block: 'end', behavior: 'smooth' });
            }
            return() =>{
                client.close()
                
            }  

    }, [])

    const handleTextContent = (e) => {
        e.preventDefault()
        setTextContent(e.target.value)
    }

    //! send msg button
    const sendMsg =  (e) => {
        e.preventDefault()
      
         currClient.send(JSON.stringify({
            'text_content': textContent,
        }))


    }

    const logout = (e) => {
        e.preventDefault()

        props.logout()
    }
    return (
           
        <>

                {/* <div className="channelsCon"> */}
                
                    
                
                {/* </div> */}
            <div className="chatboxcon">
             
            
            {messages.map(msg => {
                return(
                    <div className="allmsgsCon" >
                    {msg.map(message =>{
                        
                        return(
                          
                          <div className="allmessages">
                            <h4  >{message.fields.author.user} {message.fields.created_at}</h4>
                             <p ref={messageRef} key={message.pk} className="messagecontent">{message.fields.text_content}</p>
                             <div />
                             </div>
                             )
                            })}
                    </div>
                )
            })}
            
            </div>
                    <form className="messageCon" autoComplete="off">
                            <input type="text" placeholder="Send a message... " name="message" onChange={handleTextContent} id="messageInput" />
                            <button type="submit" style={{display:'none'}} onClick={sendMsg} >Send</button>
                    </form>
            
        </>
           
    )
}

export default connect(mapStateToProps, { logout, getTextChannel, sendMessage })(TextChannelMsgs)