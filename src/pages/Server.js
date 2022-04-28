import { useEffect, useState } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { fetchHome, getLogin, loginAcc, createServer, logout, getServer, createTextChannel} from "../actions/actions"
import axios from "axios"
import { useHistory } from "react-router-dom"
import SideBar from "../components/SideBar"
import Drawer from '@mui/material/Drawer'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { List, ListItem } from "@mui/material"
import { borders } from '@mui/system';
import HomeIcon from '@mui/icons-material/Home';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import AddIcon from '@mui/icons-material/Add';
import * as icon from '@mui/icons-material';
import TagIcon from '@mui/icons-material/Tag';
import ServerChannels from "../components/ServerChannels"
const mapStateToProps = (state) =>({
    login_status : state.login_status,
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
const Server = (props) => {
    
    const [TextChannelName, setTextChannelName] = useState('')



    const handleChannelName = (e) =>{
        e.preventDefault()
        
       setTextChannelName(e.target.value)
    }

    const createTextChannel = (e) =>{
        e.preventDefault()
        
        
        props.createTextChannel({server_id: props.match.params.server_id,text_channel_name: TextChannelName, token: props.auth_token})

    }

    const logout = (e) =>{
        e.preventDefault()

        props.logout()
    }

    return (
        <ThemeProvider theme={theme}>
            <Grid container className="serverCon">
            <Grid item >
            <SideBar />
            </Grid>
            <Grid item  >
            <ServerChannels serverid={props.match.params.server_id}/>
            </Grid>
            </Grid>
        </ThemeProvider>
    )
}

export default connect(mapStateToProps, { logout, getServer, createServer, createTextChannel })(Server)