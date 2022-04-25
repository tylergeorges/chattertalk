import { useEffect, useState } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { fetchHome, getLogin, loginAcc, createServer, logout } from "../actions/actions"
import axios from "axios"
import { useHistory } from "react-router-dom"
import SideBar from "../components/SideBar"
import { Box, createTheme, CssBaseline } from "@mui/material"
import { ThemeProvider } from "@emotion/react"
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
            <SideBar />
            <Box sx={{bgcolor: 'background.main'}}>
            <h1>Home</h1>
            <h3>Welcome {props.currentuser.username + props.currentuser.user_tag}</h3>
            
            {/* {props.servers.map(servers => {
                return(
                    <>
                    <ul>
                        <h4>{servers.server_name}</h4>
                        <Link to={`server/${servers.id}`}><img src={`http://127.0.0.1:8000${servers.server_icon}`}/></Link>
                    </ul>
                    </>
                )
            })}

            <form>
            <input type="text" name="server_name" onChange={handleServerName}/>
            <input  type="file" name="server_icon"onChange={handleServerName}/>
            <button type="submit" onClick={createServer}>CREATE SERVER</button>
            </form> */}

            <button onClick={logout}>Logout</button>
            </Box>
        </ThemeProvider>
    )
}

export default connect(mapStateToProps, { logout, fetchHome, createServer })(Home)