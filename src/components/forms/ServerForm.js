import * as React from 'react';
import { useEffect, useState } from "react"
import { connect } from "react-redux"
import { fetchHome,  createServer, logout } from "../../actions/actions"
import {  createTheme } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import * as icon from '@mui/icons-material';


const mapStateToProps = (state) => ({
    login_status: state.login_status,
    currentuser: state.currentuser,
    servers: state.servers,
    auth_token: state.auth_token,
    isLoading: state.isLoading
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

const ServerForm = (props) => {
    const [serverName, setServerName] = useState('')
    const [serverIcon, setServerIcon] = useState(null)
    const [previewServerIcon, setPreviewServerIcon] = useState(null)
    const [iconChecker, setIconChecker] = useState(false)

    useEffect(() => {
        // props.fetchHome()

      
            document.getElementById('servernameinput').defaultValue = `${props.currentuser.username}'s server`
        
    }, [props.isLoading])
    
    
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

        if(serverName !== ''){

            props.createServer({ server_name: serverName, server_icon: serverIcon, auth_token: props.auth_token })
        }
        else if(serverName === ''){
            props.createServer({ server_name: `${props.currentuser.username}'s server`, server_icon: serverIcon, auth_token: props.auth_token })
        }
    }

    const handleServerIcon = (e) =>{
        e.preventDefault()
        setServerIcon(e.target.files[0])
        const reader = new FileReader()

        reader.onload = () =>{
            setPreviewServerIcon(reader.result)
        }

        reader.readAsDataURL(e.target.files[0])

        setIconChecker(true)

        
    }


    const logout = (e) => {
        e.preventDefault()

        props.logout()
    }

    return (
       

            <>
                        <form className="serverForm" >
                            <h1 id='serverformheader'>CREATE A SERVER</h1>

                    <div  className='previewIconCon'>
                            {iconChecker === true ? <label htmlFor="server_icon"><AddIcon id='changeicon'/></label> : ''}
                           
                            {iconChecker === true ? <label htmlFor="server_icon" ><img id="servericonpreview" src={previewServerIcon}/></label> : ''}

                        <label htmlFor="server_icon" className={iconChecker === false ? 'uploadBox' : "hide"} onChange={handleServerIcon} id="uploadbox"> 

                            <label htmlFor="server_icon" id='serverFormIcon' ><icon.AddPhotoAlternate /> </label> 

                            <label   htmlFor="server_icon" id="serverlabel">Upload a Server Icon</label>

                            <input type="file" accept="image/*" id="server_icon" style={{ display: 'none'}} onChange={handleServerName}></input>
                       </label> 
                    </div>


                        <div className='forminputCon'>
                        <label htmlFor="servernameinput" style={{fontSize: '14px', marignLeft: '0'}} id="servernamelabel">SERVER NAME</label>
                        <input type="text" name="server_name" onChange={handleServerName} className="forminput" id='servernameinput'/>
                        </div>
                        <button type="submit" onClick={createServer}id="createServerBtn"  variant='contained'>Create</button>
                        </form>
            </>

         
    )
}

export default connect(mapStateToProps, { logout, fetchHome, createServer })(ServerForm)