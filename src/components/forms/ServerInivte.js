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


  
    return (
       

            <>
                        <form className="serverForm" >
                            <h1 id='serverformheader'>INVITE USERS</h1>

                        <div className='forminputCon'>
                        <label htmlFor="servernameinput" style={{fontSize: '14px', marignLeft: '0'}} id="servernamelabel">INVITE LINK</label>
                        <input className="forminput" id="servernameinput" value={props.invite_code}  />
                        </div>
                        </form>
            </>

         
    )
}

export default connect(mapStateToProps, { logout, fetchHome, createTextChannel })(ServerInvite)