import * as React from 'react';
import { useEffect, useState } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { fetchHome, getLogin, loginAcc, createServer, logout } from "../../actions/actions"
import { useHistory } from "react-router-dom"
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
            light: '##413f47'
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

const CreateChannelForm = (props) => {
    const [TextChannelName, setTextChannelName] = useState('')
    useEffect(() => {
        // props.getServer(props.serverid)
    }, [])


    const handleChannelName = (e) => {
        e.preventDefault()
        

        if(e.target.value.indexOf(' ') >= 0 ){
            e.target.value = e.target.value.split(' ').join('-')

            setTextChannelName(e.target.value.split(' ').join('-'))
        }
        if(e.target.value.indexOf('--') !== -1 ){
            e.target.value = e.target.value.split('--').join('-')
            setTextChannelName(e.target.value.split('--').join('-'))
        }
        else{
            setTextChannelName(e.target.value)

        }

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
       

            <>
                        <form className="serverForm" >
                            <h1 id='serverformheader'>CREATE A CHANNEL</h1>

                        <div className='forminputCon'>
                        <label htmlFor="servernameinput" style={{fontSize: '14px', marignLeft: '0'}} id="servernamelabel">CHANNEL NAME</label>
                        <input className="forminput" id="servernameinput"onChange={handleChannelName} pattern="[^\s]+" />
                        </div>
                        <button type="submit" onClick={createTextChannel} id="createServerBtn">Create</button>
                        </form>
            </>

         
    )
}

export default connect(mapStateToProps, { logout, fetchHome, createServer })(CreateChannelForm)