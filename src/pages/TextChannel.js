import { useEffect, useState, useRef } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { getTextChannel, sendMessage, setMsgs, setNotifis, setClient, getServer, setServer, fetchHome } from "../actions/actions"
import { w3cwebsocket as W3CWebSocket } from "websocket"
import SideBar from "../components/SideBar"
import ServerChannels from "../components/ServerChannels"
import { ThemeProvider } from "@mui/material/styles"
import { Box, createTheme, Grid, List, Toolbar, Typography } from "@mui/material"
import TextChannelMsgs from "../components/TextChannelMsgs"
import { Redirect } from "react-router-dom"
const mapStateToProps = (state) => ({
    login_status: state.login_status,
    currentuser: state.currentuser,
    servers: state.servers,
    currentchannel: state.currentchannel,
    isLoading: state.isLoading,
    isLoggedIn: state.isLoggedIn,
    notifs: state.notifs
})

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



const TextChannel = (props) => {
    const [textContent, setTextContent] = useState('')
    const [messages, setMessages] = useState([])
    const [usersMentioned, setUsersMentioned] = useState([])
    const [currClient, setClient] = useState(null)
    const [update, setUpdate] = useState(false)
    const messageRef = useRef(null);

    const url = window.location.pathname.split('/').pop();


    useEffect(() => {
        props.fetchHome()
        
        if(props.isLoading === false && props.isLoggedIn == true ){
            
    
        props.getServer(props.match.params.server_id)
        props.setServer(props.match.params.server_id)
        
        props.getTextChannel({server_id:props.match.params.server_id, channel_id:props.match.params.text_id})
        const client = new W3CWebSocket(`wss://chatroom-app-tylergeorges.herokuapp.com/channels/${props.match.params.server_id}/${props.match.params.text_id}/`);
        props.setClient(client)

        props.setMsgs([])
        
        
        client.onopen =  (e) => {
            e.preventDefault()
            console.log('connected')
            
            client.send(JSON.stringify({
                'event': 'receive_msgs',
            }))

            client.send(JSON.stringify({
                'event': 'receive_notifs',
            }))
        }
        
        client.onclose = () =>{
            console.log('close')
        }
        
        client.onmessage =  (e) => {
               const data =  JSON.parse(e.data)
               if(typeof(data) === 'object' && data.model === "chatroom.message"){
                 props.setMsgs(data)
             //    messageRef.current.scrollIntoView({ block: 'end', behavior: 'smooth' });
            }
             if(messages.length === 0 && data[0].model === "chatroom.message" ){
                props.setMsgs(data)
                // messageRef.current.scrollIntoView({ block: 'end', behavior: 'smooth' });
            }
  
             if(data[0].model === "chatroom.notifications"){
                    props.setNotifis(data)
                    
                }
               
      
        }
    
          
        return() =>{
            client.close()
                       
               }
      
            }

    }, [url,props.isLoggedIn])
    // 
 

     if(props.isLoading == false && props.isLoggedIn === false ){
        return(
            <>
            <Redirect to="/login"/>
            
            </>
        )
    }
    return (
        <ThemeProvider theme={theme}>
            {/* {props.isLoading && <div>Loading...</div>} */}
            <Grid container  >
                    <Grid>
                        <SideBar  serverid={props.match.params.server_id}/>
                    </Grid>
                    <Grid >
                      <ServerChannels   channelid={props.match.params.text_id}/>
                    </Grid>
                <Grid  className="channelsmsgs" >
                 <TextChannelMsgs messageRef={messageRef} serverid={props.match.params.server_id} channelid={props.match.params.text_id} /> 
                </Grid >
            </Grid>
        </ThemeProvider>
    )
}

export default connect(mapStateToProps, {getTextChannel, sendMessage, setMsgs, setNotifis, setClient,getServer,fetchHome,setServer})(TextChannel)