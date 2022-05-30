import { useEffect, useState } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { fetchHome, createServer, logout, getServer, createTextChannel } from "../actions/actions"
import { CssBaseline, List,  } from "@mui/material"
import { ThemeProvider, createTheme } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import TagIcon from '@mui/icons-material/Tag';
import CreateChannelForm from "./forms/CreateChannelForm"
import { useHistory } from "react-router-dom"
import ServerInivte from "./forms/ServerInivte"
import AttachEmailIcon from '@mui/icons-material/AttachEmail';
import MeetingRoomIcon   from '@mui/icons-material/MeetingRoom';
const mapStateToProps = (state) => ({
    login_status: state.login_status,
    currentuser: state.currentuser,
    current_server: state.current_server,
    text_channels: state.text_channels,
    auth_token: state.auth_token,
    notifs: state.notifs,
    invite_code: state.invite_code,
    server_id: state.server_id
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
    const [showInviteCode, setShowInviteCode] = useState(false)
    const [textChannels, setTextChannels] = useState([])
    const [notifs, setNotifs] = useState([])
    const [currClient, setClient] = useState(null)
    const url = window.location.pathname.split('/').pop();
    
    useEffect(() => {
        // console.log(props)
        // props.getServer(props.server_id)
        // console.log(props.current_server)
        setTextChannels([...props.text_channels])
        setNotifs(props.notifs)
          
    
    }, [props.server_id])
    // props.notifs


    
    const handleChannelName = (e) => {
        e.preventDefault()

        setTextChannelName(e.target.value)
    }

    const createTextChannel = (e) => {
        e.preventDefault()

        setShowChannelForm(!showChannelForm)
        // props.createTextChannel({ server_id: props.serverid, text_channel_name: TextChannelName, token: props.auth_token })

    }
    const inviteUsers = (e) => {
        e.preventDefault()

        setShowInviteCode(!showInviteCode)
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
                <div className={showInviteCode === true ? 'blackScreen' :  'hide'} onClick={inviteUsers} />
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <div className="panelsCon" >
                <div className="channelsPanelRel">
                <div className="channelspanelCon">
                        <div className="serverNameCon" >
                            <h3>{props.current_server.server_name}</h3>
                        </div>

                        {/* <a href={props.invite_code}>{props.invite_code}</a> */}



                        <List className="channelscon"   >
                            <List item sx={{position: 'relative',display: 'flex',alignItems: 'center',justifyContent: 'flex-start',width: 100, left: 5 }}>    
                                    <h4 id="txtchannelheader">CHANNELS</h4>
                                    <AddIcon id="createChannelsIcon" onClick={createTextChannel}/>
                            </List>
                            
                            {props.text_channels.map(channels => {
                                return (
                                    <List key={channels.id}  item className={channels.id == props.channelid ? "channelsBg" : 'otherChannels' }  sx={{textOverflow: 'ellipsis', justifyContent: 'flex-start', display: 'flex',  width: '100%', alignItems: 'center', marginTop: '3%', bottom: 30,   borderRadius: 2 }}>
                                    <Link to={`/channels/${props.server_id}/${channels.id}`}>
                                            <div className="channellist"  id={channels.id} >
                                                <TagIcon className="channelhashtag" id={channels.id}  />
                                                <p id="txtchannelName" >{channels.text_channel_name}</p>
                                                {notifs.length > 0 ? notifs.map(notif => notif.text_channel === channels.id) ? 
                                                <>
                                                    {notifs.map(notif => {
                                                        return(
                                                            <> 
                                                    {notif.text_channel === channels.id ? 
                                                    notif.notifications !== 0 ?
                                                    <div className="notifiIcon"> 
                                                     <p id="channelNotifis">{notif.notifications}</p>
                                                    </div> : ''
                                                    
                                                    : ''}
                                                    </>
                                                ) })}
                                                </> : ' ' : ''}
                                            </div>
                                        </Link>
                                        
                                        {channels.id == props.channelid ? <AttachEmailIcon style={{position: 'absolute', right: '0', marginRight: '5px'}}onClick={inviteUsers}/> : ''}

                                    </List>
                                )
                            })}
                        </List>
                    </div>
                            <div className="userInfoCon">
                                <img style={{height: '35px'}} alt="userPFP" id='userInfoPfp'src={`${props.currentuser.profile_picture}`}></img>
                                <div className="userInfoSubCon">
                                <p id="userInfoUsername">{props.currentuser.username}</p>
                                <p id="usertag">{props.currentuser.user_tag}</p>
                                <MeetingRoomIcon  style={{fontSize:'20px'}} id="logout-btn"/>
                                </div>
                            </div>
                </div>
            </div>
            
            <div className={showInviteCode === true ?'innerForm' : 'dontShow'} > 
                        <ServerInivte />
            </div>

            <div className={showChannelForm === true ?'innerForm' : 'dontShow'} > 
                        <CreateChannelForm serverid={props.server_id}/>
            </div>
        </ThemeProvider>
        </div>
    )
}

export default connect(mapStateToProps, { logout, getServer, createServer, createTextChannel, fetchHome })(ServerChannels)