import { useEffect, useState } from "react"
import { connect } from "react-redux"
import { fetchHome,  createServer, logout, joinServer, getServerPreview } from "../actions/actions"
import { useHistory } from "react-router-dom"
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

const JoinServer = (props) => {
    const [serverName, setServerName] = useState('')
    const [serverIcon, setServerIcon] = useState(null)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    let history = useHistory();

    
    useEffect(() =>{
        props.fetchHome()
        
        
        if(props.isLoggedIn === true){
            props.getServerPreview(
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
        return(
            <h2>LOADING...</h2>
        )
    }
    else if(props.isLoggedIn === true){
    return(
        <>
            {/* <Redirect to={{pathname:"/home", state: {server_preview: props.server_preview}}} /> */}
            
            <form className="LogOutForm" >
                            <h1 id='serverformheader'>{props.server_preview.server_name}</h1>

                <div className='logout-formCon'>
                        <h3 id="logout-header">{props.server_preview.server_name}</h3>
                        {/* <input className="forminput" id="servernameinput" value={props.invite_code}  /> */}
                        <button id="logout-btn-final" type='submit'  >Join</button>
                        </div>
                </form>
        </>
           
    ) 
 }

}

export default connect(mapStateToProps, { logout, joinServer, createServer, fetchHome,getServerPreview})(JoinServer)