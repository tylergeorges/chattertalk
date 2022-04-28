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
const mapStateToProps = (state) => ({
    login_status: state.login_status,
    currentuser: state.currentuser,
    current_server: state.current_server,
    text_channels: state.text_channels,
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
const ServerChannels = (props) => {

    const [TextChannelName, setTextChannelName] = useState('')
    const [showServerForm, setShowServerForm] = useState(false)

    useEffect(() => {
        // console.log(props)
        props.getServer(props.serverid)
    }, [])

    const handleChannelName = (e) => {
        e.preventDefault()

        setTextChannelName(e.target.value)
    }

    const createTextChannel = (e) => {
        e.preventDefault()

        setShowServerForm(!showServerForm)
        // props.createTextChannel({ server_id: props.serverid, text_channel_name: TextChannelName, token: props.auth_token })

    }

    const logout = (e) => {
        e.preventDefault()

        props.logout()
    }

    return (
        <div className="serverChannelsCon">
            <Toolbar />
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <div className="panelsCon">
                        <div onClick={createTextChannel} style={showServerForm === true ? {backgroundColor: 'black', position:'fixed', zIndex: '1000', height: '100%', width: '200%', opacity: '0.5'}: {display: 'none'}}/>
                {/* <List > */}
                {/* <SideBar /> */}
                <div className="channelsPanelRel">
                <div className="channelspanelCon">
                    {/* <List xs='false' sm={4} md={6} sx={{ display: 'flex', justifyContent: 'flex-start', flexDirection: 'column', backgroundColor: 'background.light', width: 200, height: '100%', position: 'fixed', top: 0 }}> */}
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
                                    <List item sx={{ display: 'inline-block', verticalAlign: 15, alignSelf: 'flex-start', width: 170, alignItems: 'center', marginTop: '4%', bottom: 30, right: 10, backgroundColor: 'background.dark', borderRadius: 2 }}>
                                        <Link to={`/channels/${props.serverid}/${channels.id}`}>
                                            <div className="channellist">
                                                <TagIcon id="channelhashtag" />
                                                {channels.text_channel_name}
                                            </div>
                                        </Link>
                                    </List>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
            
            <div className={showServerForm === true ?'innerForm' : 'dontShow'} > 
                        <CreateChannelForm serverid={props.serverid}/>
                        </div>
            {/* <form>
                <input placeholder="text-channel-name" onChange={handleChannelName} />
                <button type="submit" onClick={createTextChannel}>Create Channel</button>
            </form> */}


        </ThemeProvider>
        </div>
    )
}

export default connect(mapStateToProps, { logout, getServer, createServer, createTextChannel, fetchHome })(ServerChannels)