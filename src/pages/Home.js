import { useEffect, useState } from "react"
import { connect } from "react-redux"
import { fetchHome,createServer, logout } from "../actions/actions"
import { useHistory } from "react-router-dom"
import SideBar from "../components/SideBar"
import { createTheme, } from "@mui/material"
import { ThemeProvider } from "@emotion/react"
import HomeLists from "../components/HomeLists"
import { Redirect } from "react-router-dom"
const mapStateToProps = (state) =>({
    login_status : state.login_status,
    currentuser: state.currentuser,
    servers: state.servers,
    auth_token: state.auth_token,
    isLoggedIn: state.isLoggedIn,
    isLoading: state.isLoading,
    error: state.error,
    server_preview: state.server_preview
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
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    
    useEffect(() =>{
        props.fetchHome()
        
        },[])
        



    const logout = (e) =>{
        e.preventDefault()

        props.logout()
    }

     if(props.isLoading == true){
        return(
            <h2>LOADING...</h2>
        )
    }
    else if(props.isLoading == false && props.isLoggedIn == true){
    return(
        <ThemeProvider theme={theme}>
            
            {/* {!props.isLoggedIn ? <Redirect to="/login" /> : ''} */}
            {/* <SideBar /> */}
            <div className="serverCon">
                <SideBar home={props.match.path} />
                <HomeLists />

            </div>
         

        </ThemeProvider>
    ) 
 }
 else if(props.isLoading === false && props.isLoggedIn === null ){
    return(
        <>
        <Redirect to="/login"/>
        </>
    )
}


 
}

export default connect(mapStateToProps, { logout, fetchHome, createServer })(Home)