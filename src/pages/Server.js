import { useEffect, useState } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { fetchHome, getLogin, loginAcc, createServer, logout, getServer, createTextChannel} from "../actions/actions"
import axios from "axios"
import { useHistory } from "react-router-dom"
import SideBar from "../components/SideBar"
const mapStateToProps = (state) =>({
    login_status : state.login_status,
    currentuser: state.currentuser,
    current_server: state.current_server,
    text_channels: state.text_channels,
    auth_token: state.auth_token
})

const Server = (props) => {
    
    const [TextChannelName, setTextChannelName] = useState('')

    useEffect(() =>{
        props.getServer(props.match.params.server_id)
    },[])

    const handleChannelName = (e) =>{
        e.preventDefault()
        
       setTextChannelName(e.target.value)
    }

    const createTextChannel = (e) =>{
        e.preventDefault()
        
        
        props.createTextChannel({server_id: props.match.params.server_id,text_channel_name: TextChannelName, token: props.auth_token})

    }

    const logout = (e) =>{
        e.preventDefault()

        props.logout()
    }

    return (
        <div>
            <SideBar />
           <h1>{props.current_server.server_name}</h1>
                {props.text_channels.map(channels =>{
                    return(
                        <ul>
                        <Link to={`/channels/${props.match.params.server_id}/${channels.id}`}><li>{channels.text_channel_name}</li></Link>
                        </ul>

                    )
                })}
           <form>
               <input placeholder="text-channel-name" onChange={handleChannelName}/>
               <button type="submit" onClick={createTextChannel}>Create Channel</button>
           </form>
        </div>
    )
}

export default connect(mapStateToProps, { logout, getServer, createServer, createTextChannel })(Server)