import * as React from 'react';
import { useEffect, useState } from "react"
import { connect } from "react-redux"
import { fetchHome, logout, createTextChannel,hideForm} from "../../actions/actions"


const mapStateToProps = (state) => ({
    login_status: state.login_status,
    currentuser: state.currentuser,
    servers: state.servers,
    auth_token: state.auth_token,
    invite_code: state.invite_code
})

const LogOutForm = (props) => {
    const [TextChannelName, setTextChannelName] = useState('')



  

    const logout = (e) => {
        e.preventDefault()
        props.logout()
    }
    const hideForm = (e) => {
        e.preventDefault()

        props.hideForm()
        
    }


  
    return (
       

            <>
                        <form className="LogOutForm" >
                            {/* <h1 id='serverformheader'>LOG OUT</h1> */}

                        <div className='logout-formCon'>
                        <h3 id="logout-header">Are you sure you want to logout?</h3>
                        {/* <input className="forminput" id="servernameinput" value={props.invite_code}  /> */}
                        <button id="logout-btn-final" type='submit'  onClick={logout}>Log Out</button>
                        <button id="cancellogout-btn" type='submit' onClick={hideForm}>Cancel</button>
                        </div>
                        </form>
            </>

         
    )
}

export default connect(mapStateToProps, { logout, hideForm })(LogOutForm)