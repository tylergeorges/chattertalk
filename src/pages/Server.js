import { useEffect, useState } from "react"
import { connect } from "react-redux"
import { fetchHome, getLogin, loginAcc, createServer, logout, getServer, createTextChannel } from "../actions/actions"
import SideBar from "../components/SideBar"
import Grid from '@mui/material/Grid'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ServerChannels from "../components/ServerChannels"
import { w3cwebsocket as W3CWebSocket } from "websocket"


const mapStateToProps = (state) => ({
    login_status: state.login_status,
    currentuser: state.currentuser,
    current_server: state.current_server,
    text_channels: state.text_channels,
    auth_token: state.auth_token,
    isLoading: state.isLoading,
    notifs: state.notifs,
    invite_code: state.invite_code,
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
    const url = window.location.pathname.split('/').pop();

    useEffect(() =>{
        props.getServer(props.match.params.server_id)
    },[url, props.notifs])


    if(props.isLoggedIn === null){
        return(
            <h2>LOADING...</h2>
        )
    }
    else if(props.isLoggedIn !== null){
    return (
        <ThemeProvider theme={theme}>
            <div className="serverCon">
                    <ServerChannels serverid={props.match.params.server_id} />
                    <SideBar serverid={props.match.params.server_id} />
            </div>
        </ThemeProvider>
    )
    }
}

export default connect(mapStateToProps, { logout, getServer, createServer, createTextChannel })(Server)