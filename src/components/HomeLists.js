import { useEffect, useState } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { fetchHome, getLogin, loginAcc, createServer, logout, getServer, createTextChannel,hideForm} from "../actions/actions"
import SideBar from "../components/SideBar"
import Grid from '@mui/material/Grid'
import { CssBaseline, List, ListItem, Toolbar } from "@mui/material"
import { ThemeProvider, createTheme } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import TagIcon from '@mui/icons-material/Tag';
import CreateChannelForm from "./forms/CreateChannelForm"
import MeetingRoomIcon   from '@mui/icons-material/MeetingRoom';
import { Logout } from "@mui/icons-material"
import LogOutForm from "./forms/LogOutForm"
const mapStateToProps = (state) => ({
    login_status: state.login_status,
    currentuser: state.currentuser,
    current_server: state.current_server,
    text_channels: state.text_channels,
    auth_token: state.auth_token,
    hide_form: state.hide_form,
    
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
const HomeLists = (props) => {

    const [showLogOutForm, setShowLogOutForm] = useState(false)

    useEffect(() =>{

        setShowLogOutForm(props.hide_form)
    },[props.hide_form])

    const showLogOut = (e) => {
        e.preventDefault()
        props.hideForm()
        // setShowLogOutForm(!showLogOutForm)
    }

   
    return (
        <div className="serverChannelsCon">
            <div onClick={showLogOut}  className={showLogOutForm  === true ? 'blackScreen' :  'hide'} />
        <ThemeProvider theme={theme}>
    <CssBaseline />
    <div className="panelsCon" >
        <div className="channelsPanelRel">
        <div className="channelspanelCon">
                <div className="serverNameCon" >
                    <h3>FRIENDS</h3>
                </div>

                {/* <a href={props.invite_code}>{props.invite_code}</a> */}

                   
            </div>
                    <div className="userInfoCon">
                        <img style={{height: '35px'}} id='userInfoPfp'src={`http://127.0.0.1:8000${props.currentuser.profile_picture}`}></img>
                        <div className="userInfoSubCon">
                        <p id="userInfoUsername">{props.currentuser.username}</p>
                        <p id="usertag">{props.currentuser.user_tag}</p>
                        </div>
                        <MeetingRoomIcon  style={{fontSize:'20px'}} id="logout-btn" onClick={showLogOut}/>
                    </div>
        </div>
    </div>
    <div className={showLogOutForm === true ? 'LogOutFormCon' : 'dontShow'}> 
                <LogOutForm />
        </div>
</ThemeProvider>
</div>
    )
}

export default connect(mapStateToProps, { logout, getServer, createServer, createTextChannel, fetchHome,hideForm})(HomeLists)