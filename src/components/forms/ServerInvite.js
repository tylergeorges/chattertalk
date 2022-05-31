import * as React from 'react';
import { useEffect, useState } from "react"
import { connect } from "react-redux"
import { fetchHome, logout, createTextChannel} from "../../actions/actions"



const mapStateToProps = (state) => ({
    login_status: state.login_status,
    currentuser: state.currentuser,
    servers: state.servers,
    auth_token: state.auth_token,
    invite_code: state.invite_code
})

const ServerInvite = (props) => {
    const [TextChannelName, setTextChannelName] = useState('')

    useEffect(() => {
        // props.getServer(props.serverid)
    }, [])
  
    return (
       

            <>
                        <form className="serverForm" >
                            <h1 id='serverformheader'>INVITE USERS</h1>

                        <div className='forminputCon'>
                        <label htmlFor="servernameinput" style={{fontSize: '14px', marignLeft: '0'}} id="servernamelabel">INVITE LINK</label>
                        {/* <input className="forminput" id="servernameinput" value={`http://localhost:3000/${props.invite_code}`}  /> */}
                        <input className="forminput" id="servernameinput" value={`https://chattertalk.netlify.app/${props.invite_code}`}  />
                        </div>
                        </form>
            </>

         
    )
}

export default connect(mapStateToProps, { logout, fetchHome, createTextChannel })(ServerInvite)