import { useEffect, useState } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { fetchHome, getLogin, loginAcc, createServer, logout } from "../actions/actions"
import axios from "axios"
import { useHistory } from "react-router-dom"
import SideBar from "../components/SideBar"
import { Box, createTheme, CssBaseline, Grid } from "@mui/material"
import { ThemeProvider } from "@emotion/react"
import HomeLists from "../components/HomeLists"
import TextChannelMsgs from "../components/TextChannelMsgs"
import ServerChannels from "../components/ServerChannels"
const mapStateToProps = (state) =>({
    login_status : state.login_status,
    currentuser: state.currentuser,
    servers: state.servers,
    auth_token: state.auth_token
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
const Home = (props) => {
    const [serverName, setServerName] = useState('')
    const [serverIcon, setServerIcon] = useState(null)

    useEffect(() =>{
        props.fetchHome()
    },[])

    const handleServerName = (e) =>{
        e.preventDefault()
        
        if(e.target.name == 'server_name'){
            setServerName(e.target.value)
        }
        if(e.target.name == 'server_icon'){
            setServerIcon(e.target.files)
            
            }
    }

    const createServer = (e) =>{
        e.preventDefault()
  
        props.createServer({server_name: serverName, server_icon: serverIcon[0], auth_token: props.auth_token})

    }

    const logout = (e) =>{
        e.preventDefault()

        props.logout()
    }

    return (
        <ThemeProvider theme={theme}>
            {/* <SideBar /> */}
            <div className="serversCon">
            <Grid container >
                    <Grid item sx={{zIndex: 10000}} >
                        <SideBar />
                    </Grid>
                    <Grid item >
                        <HomeLists serverid={props.match.params.server_id} />
                    </Grid>
                <Grid item className="channelsmsgs"  sx={{height: 300}}>
                <h1>Home</h1>
            <h3>Welcome {props.currentuser.username + props.currentuser.user_tag}</h3>
                </Grid >
            </Grid>
            </div>

{/* 
            <div className="homeCon">
            <div className="homeContent">
            <h1>Home</h1>
            <h3>Welcome {props.currentuser.username + props.currentuser.user_tag}</h3>
            </div>
            </div> */}
          

            <button onClick={logout}>Logout</button>
        </ThemeProvider>
    )
}

export default connect(mapStateToProps, { logout, fetchHome, createServer })(Home)