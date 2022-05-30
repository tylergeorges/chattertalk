import { useEffect, useState } from "react"
import { connect } from "react-redux"
import { fetchHome,  createServer, logout, joinServer } from "../actions/actions"
import { useHistory } from "react-router-dom"
import { Redirect } from "react-router-dom"


const mapStateToProps = (state) =>({
    login_status : state.login_status,
    currentuser: state.currentuser,
    servers: state.servers,
    auth_token: state.auth_token,
    isLoggedIn: state.isLoggedIn,
    isLoading: state.isLoading,
    error: state.error
})

const JoinServer = (props) => {
    const [serverName, setServerName] = useState('')
    const [serverIcon, setServerIcon] = useState(null)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    let history = useHistory();

    
    useEffect(() =>{
        props.fetchHome()
        if(props.isLoggedIn === true){

            props.joinServer(
                {
                    auth_token: props.auth_token,
                    user_id: props.currentuser.id,
                    invite_code: props.match.params.server_code
                }
                )
        }
       
        // if(!props.isLoggedIn && !props.isLoading){
            //     history.push('/login')
            //     }
        },[props.isLoggedIn])

   
    if(props.error == 401){
        return <Redirect to='/login' />
           
       }
    else if(props.isLoggedIn === null){
        console.log(props.isLoading)
        return(
            <h2>LOADING...</h2>
        )
    }
    else if(props.isLoggedIn === true){
    return(
        <>
            <h2>Join Server</h2>
           
        </>
    ) 
 }

}

export default connect(mapStateToProps, { logout, joinServer, createServer, fetchHome})(JoinServer)