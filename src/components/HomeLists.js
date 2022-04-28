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
const HomeLists = (props) => {

    const [TextChannelName, setTextChannelName] = useState('')

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


        props.createTextChannel({ server_id: props.serverid, text_channel_name: TextChannelName, token: props.auth_token })

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
                <div className="channelsPanelRel">
                <div className="channelspanelCon">
                        <div className="serverNameCon" >
                            <h3>Friends</h3>
                        </div>
                        {/* <div className="channelscon">
                            <List item sx={{ display: 'inline-block', alignSelf: 'flex-start', alignItems: 'center', width: 170, }}>    
                                <div className="channelheadercon">
                                    <h4 id="txtchannelheader">FRIENDS</h4>
                                </div>
                            </List>
                        </div> */}
                    </div>
                </div>
            </div>
         


        </ThemeProvider>
        </div>
    )
}

export default connect(mapStateToProps, { logout, getServer, createServer, createTextChannel, fetchHome })(HomeLists)