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
import { CopyAll } from '@mui/icons-material';
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
    const [isHovered, setIsHovered] = useState(null)
    const url = window.location.pathname.split('/').pop();

    
    // useEffect(() => {
    //     if(props.home === undefined){
    //         props.fetchHome()
    //     }
    // }, [url])

    const createServerForm = (e) =>{
        e.preventDefault()

        setShowServerForm(!showServerForm)
    }

    const handleHover = (e) =>{
        e.preventDefault()
        setIsHovered(e.target.id)

    }

    const handleHoverExit = (e) =>{
        e.preventDefault()
        setIsHovered(null)
    }


    return (

        <>

                 <div onClick={createServerForm} className={showServerForm   === true ? 'blackScreen' :  'hide'} />
             <div className='sidebarRel' >
                <div className='sidebar'> 
                        
                    <div className='icons-sidebarCon' >
                        <div className={isHovered == 'homeIcon' ? 'arrow-left' : 'hide-arrow' }/><p className={isHovered == 'homeIcon' ? 'servername-sidebar' : 'hide-servername' }>Home</p>
                            <Link to="/home" >
                                <div className='texticons-sidebar'>
                                <HomeIcon style={{fontSize:'70px'}}onMouseEnter={handleHover} onMouseLeave={handleHoverExit} id="homeIcon" />
                                </div>
                            </Link>
                        </div>
                       

                    {props.servers.map(servers => {
                        return (
                            <div className='sidebarIconsCon' >

                            <div className='servername-sidebarCon' >
                            <div className={isHovered == servers.id ? 'arrow-left' : 'hide-arrow' }/><p className={isHovered == servers.id ? 'servername-sidebar' : 'hide-servername' } >{servers.server_name}</p>
                             </div>
                             
                             <div className={props.serverid == servers.id ? "currServerBar" : isHovered == servers.id ? 'hoverServerBar' :  'none' }/> 
                             <Link to={`/channels/${servers.id}/${servers.id + 2}`}>
                             <img src={`${servers.server_icon_url}`} id={servers.id} onMouseEnter={handleHover} onMouseLeave={handleHoverExit} className={props.serverid == servers.id ? "currentServerIcon" : "serverIcons"} width="70px" height='70px' />
                             </Link>
                            </div>
                        )
                    })}
                                <div className='icons-sidebarCon'>
                                <div className='addicons-sidebar'>
                                <div className={isHovered == 'addserver-sidebar' ? 'arrow-left' : 'hide-arrow' }/><p style={{color:'white'}}className={isHovered == 'addserver-sidebar' ? 'servername-sidebar' : 'hide-servername' }>Add A Server</p>
                                <AddIcon style={{  fontSize: '70' }}  onClick={createServerForm} id="addserver-sidebar" onMouseEnter={handleHover} onMouseLeave={handleHoverExit}/>
                                </div>
                                </div>
               
                   
                    </div>
             </div>
                         <div className={showServerForm === true && props.currentuser !== '' ?'innerForm' : 'dontShow'} > 
                         <ServerForm />
                        </div>
         <CssBaseline/>
        </>
    )
}

export default connect(mapStateToProps, { logout, fetchHome, createServer })(Sidebar)