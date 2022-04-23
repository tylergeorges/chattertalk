import * as React from 'react';
import { useEffect, useState } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { fetchHome, getLogin, loginAcc, createServer, logout } from "../actions/actions"
import { useHistory } from "react-router-dom"
import Drawer from '@mui/material/Drawer'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { List, ListItem } from "@mui/material"
import { borders } from '@mui/system';
import HomeIcon from '@mui/icons-material/Home';
import {  ThemeProvider, createTheme } from '@mui/material/styles';
const mapStateToProps = (state) => ({
    login_status: state.login_status,
    currentuser: state.currentuser,
    servers: state.servers,
    auth_token: state.auth_token
})


const drawerWidth = 100
const theme = createTheme({
    palette: {
      background: {
        paper: '#fff',
      },
      text: {
        primary: 'black',
        secondary: 'white',
      },
      action: {
        active: '#001E3C',
      },
      success: {
        main: '#009688',
      },
    },
  });

const Sidebar = (props) => {
    const [serverName, setServerName] = useState('')
    const [serverIcon, setServerIcon] = useState(null)

    useEffect(() => {
        props.fetchHome()
    }, [])

    const handleServerName = (e) => {
        e.preventDefault()

        if (e.target.name == 'server_name') {
            setServerName(e.target.value)
        }
        if (e.target.name == 'server_icon') {
            setServerIcon(e.target.files)

        }
    }

    const createServer = (e) => {
        e.preventDefault()

        props.createServer({ server_name: serverName, server_icon: serverIcon[0], auth_token: props.auth_token })

    }

    const logout = (e) => {
        e.preventDefault()

        props.logout()
    }

    return (
        <ThemeProvider theme={theme}>
        <Box sx={{ display: 'flex',alignItems: 'center', textAlign: 'center' }}>

            <Drawer variant="permanent" anchor="left"  sx={{alignItems: 'center' , width: drawerWidth, flexShrink: 0, '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box', } }} >
                <Grid sx={{bgcolor: 'primary.main',}}container direction="column" justify="center"  align = "center"  >
                    <List justify="center"  align = "center">
                        <List item  xs = "false" sm = {4} md = {6}>
                            <HomeIcon  sx={{ bgcolor: 'primary.main', fontSize: 70, }}  className="serverIcons" />
                            </List>
                        {props.servers.map(servers => {
                            return (
                                <>
                                    {/* <h4>{servers.server_name}</h4> */}
                                    
                                    <List item  xs = 'false' sm = {4} md = {6}>
                                        <Link to={`/server/${servers.id}`}><img src={`http://127.0.0.1:8000${servers.server_icon}`} className="serverIcons" sx={{bgcolor: 'primary.main',  }} width="80%"/></Link>
                                    </List>
                                </>
                            )
                        })}
                    </List>
                </Grid>
            </Drawer>


            <form>
                <input type="text" name="server_name" onChange={handleServerName} />
                <input type="file" name="server_icon" onChange={handleServerName} />
                <button type="submit" onClick={createServer}>CREATE SERVER</button>
            </form>

        </Box>
        </ThemeProvider>
    )
}

export default connect(mapStateToProps, { logout, fetchHome, createServer })(Sidebar)