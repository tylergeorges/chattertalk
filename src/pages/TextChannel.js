import { useEffect, useState, useRef } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { fetchHome, getLogin, loginAcc, createServer, logout, getTextChannel, sendMessage } from "../actions/actions"
import axios from "axios"
import { useHistory } from "react-router-dom"
import { w3cwebsocket as W3CWebSocket } from "websocket"
import SideBar from "../components/SideBar"
import ServerChannels from "../components/ServerChannels"
import { ThemeProvider } from "@emotion/react"
import { Box, createTheme, Grid, List, Toolbar, Typography } from "@mui/material"
import TextChannelMsgs from "../components/TextChannelMsgs"

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



const TextChannel = (props) => {

    return (
        <ThemeProvider theme={theme}>
            {props.isLoading && <div>Loading...</div>}
            <Grid container className="serverCon">
                    <Grid item  >
                        <SideBar />
                    </Grid>
                    <Grid item >
                       {props.match.params.server_id && <ServerChannels serverid={props.match.params.server_id} />}
                    </Grid>
                <Grid item className="channelsmsgs" >
                   {props.match.params.text_id && props.match.params.server_id && <TextChannelMsgs serverid={props.match.params.server_id} channelid={props.match.params.text_id} />}
                </Grid >
            </Grid>
        </ThemeProvider>
    )
}

export default connect(mapStateToProps, { logout, getTextChannel, sendMessage })(TextChannel)