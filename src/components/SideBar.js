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
import { List, ListItem, Toolbar } from "@mui/material"
import { borders } from '@mui/system';
import HomeIcon from '@mui/icons-material/Home';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import AddIcon from '@mui/icons-material/Add';
import ServerForm from './forms/ServerForm';
const mapStateToProps = (state) => ({
    login_status: state.login_status,
    currentuser: state.currentuser,
    servers: state.servers,
    auth_token: state.auth_token
})

// --main-bg-color:  #1F1C2C;
// --lighter-bg-color:   #353241;
// ---button-color: #7F00FF;
// --light-gray: #dadce1;

const drawerWidth = 100
const theme = createTheme({
    palette: {
        background: {
            default: '#1F1C2C',
            dark: '#353241',
            light: '#413f47'
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

const Sidebar = (props) => {
    const [serverName, setServerName] = useState('')
    const [showServerForm, setShowServerForm] = useState(false)

    useEffect(() => {
        props.fetchHome()
    }, [])

    const createServerForm = (e) =>{
        e.preventDefault()

        setShowServerForm(!showServerForm)
    }

    const logout = (e) => {
        e.preventDefault()

        props.logout()
    }

    return (

        <div className='serverSideBar' >
            {/* <Toolbar /> */}
        <ThemeProvider theme={theme} >
            <CssBaseline/>

            {/* <Drawer  variant="permanent" anchor="left" sx={{ display: 'flex', alignItems: 'center', bgcolor: 'black', width: drawerWidth, flexShrink: 0, '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box', } }} > */}
             <div className='sidebar' >
                 <div onClick={createServerForm} style={showServerForm === true ? {backgroundColor: 'black', position:'fixed', zIndex: '1000', height: '100%', width: '200%', opacity: '0.5'}: {display: 'none'}}/>
                <List justify="center" align="center" >

                    <List item="true" xs="false" sm={4} md={6} >
                        <Link to="/home"> <HomeIcon sx={{ color: 'white', bgcolor: 'background.default', fontSize: 70}} className="serverIcons" /></Link>
                    </List>

                    {props.servers.map(servers => {
                        return (
                            <>
                                {/* <h4>{servers.server_name}</h4> */}

                                <List item="true" xs='false' sm={4} md={6} >
                                    <Link to={`/server/${servers.id}`}><img src={`http://127.0.0.1:8000${servers.server_icon}`} className="serverIcons" width="70px" /></Link>
                                </List>
                            </>
                        )
                    })}
                    <List item="true" xs="false" sm={4} md={6}>
                        <AddIcon sx={{ bgcolor: 'background.default', fontSize: 70, }} className="addServerBtn" onClick={createServerForm}/>
                    </List>
                </List>
             </div>
                         <div className={showServerForm === true ?'innerForm' : 'dontShow'} > 
                         <ServerForm />
                        </div>
                    </ThemeProvider>
        </div>
    )
}

export default connect(mapStateToProps, { logout, fetchHome, createServer })(Sidebar)