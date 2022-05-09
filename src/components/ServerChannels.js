import { useEffect, useState } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { fetchHome, getLogin, loginAcc, createServer, logout, getServer, createTextChannel } from "../actions/actions"
import SideBar from "../components/SideBar"
import Grid from '@mui/material/Grid'
import { CssBaseline, List, ListItem, Toolbar } from "@mui/material"
import { ThemeProvider, createTheme } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import TagIcon from '@mui/icons-material/Tag';
import CreateChannelForm from "./forms/CreateChannelForm"
import { useHistory } from "react-router-dom"
import { w3cwebsocket as W3CWebSocket } from "websocket"
const mapStateToProps = (state) => ({
    login_status: state.login_status,
    currentuser: state.currentuser,
    current_server: state.current_server,
    text_channels: state.text_channels,
    auth_token: state.auth_token,
    notifs: state.notifs
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
const ServerChannels = (props) => {
    const history = useHistory()
    const [TextChannelName, setTextChannelName] = useState('')
    const [showChannelForm, setShowChannelForm] = useState(false)
    const [textChannels, setTextChannels] = useState([])
    const [notifs, setNotifs] = useState([])
    const [currClient, setClient] = useState(null)
    const url = window.location.pathname.split('/').pop();
    
    useEffect(() => {
        // console.log(props)
        props.getServer(props.serverid)
        
        setTextChannels([...props.text_channels])
        setNotifs(props.notifs)
          
    
    }, [props.notifs])



    
    const handleChannelName = (e) => {
        e.preventDefault()

        setTextChannelName(e.target.value)
    }

    const createTextChannel = (e) => {
        e.preventDefault()

        setShowChannelForm(!showChannelForm)
        // props.createTextChannel({ server_id: props.serverid, text_channel_name: TextChannelName, token: props.auth_token })

    }

    const toChannel = (e) => {
        e.preventDefault()
        const channel_id = e.target.id
        // console.log(e.target.id)
        history.push(`/channels/${props.serverid}/${channel_id}`)
    }

    return (
        <div className="serverChannelsCon">
                <div className={showChannelForm === true ? 'blackScreen' :  'hide'} onClick={createTextChannel} />
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <div className="panelsCon" >
                <div className="channelsPanelRel">
                <div className="channelspanelCon">
                        <div className="serverNameCon" >
                            <h3>{props.current_server.server_name}</h3>
                        </div>
                        <div className="channelscon">
                            <List item sx={{ display: 'inline-block', alignSelf: 'flex-start', alignItems: 'center', width: 170, }}>    
                                <div className="channelheadercon">
                                    <h4 id="txtchannelheader">CHANNELS</h4>
                                    <AddIcon id="createChannelsIcon" onClick={createTextChannel}/>
                                </div>
                            </List>
                            {props.text_channels.map(channels => {
                                return (
                                    <List  item sx={{  textOverflow: 'elipsis', alignItems: 'center',  display: 'inline-block', verticalAlign: 15, alignSelf: 'flex-start', width: 170, alignItems: 'center', marginTop: '3%', bottom: 30, right: 10, backgroundColor: 'background.dark', borderRadius: 2 }}>
                                        <Link to={`/channels/${props.serverid}/${channels.id}`}>
                                            <div className="channellist"  id={channels.id} >
                                                <TagIcon className="channelhashtag" id={channels.id}  />
                                                <p>{channels.text_channel_name}</p>
                                                {notifs.length > 0 ? notifs.map(notif => notif.text_channel === channels.id) ? 
                                                <>
                                                    {notifs.map(notif => {
                                                        return(
                                                            <> 
                                                    {notif.text_channel === channels.id ? 
                                                    notif.notifications !== 0 ?<div className="notifiIcon"> 
                                                     <p id="channelNotifis">
                                                    {notif.notifications}
                                                        </p>
                                                    </div> : ''
                                                    
                                                    : ''}
                                                    </>
                                                ) })}
                                                </> : ' ' : ''}
                                            </div>
                                        </Link>
                                    </List>
                                )
                            })}
                        </div>
                    </div>
                            <div className="userInfoCon">
                                <p id="userInfoUsername">{props.currentuser.username}</p>
                                <p id="usertag">{props.currentuser.user_tag}</p>
                            </div>
                </div>
            </div>
            
            <div className={showChannelForm === true ?'innerForm' : 'dontShow'} > 
                        <CreateChannelForm serverid={props.serverid}/>
                        </div>
        </ThemeProvider>
        </div>
    )
}

export default connect(mapStateToProps, { logout, getServer, createServer, createTextChannel, fetchHome })(ServerChannels)