import { useEffect, useState } from "react"
import { connect } from "react-redux"
import { getLogin, loginAcc } from "../actions/actions"
import { useHistory } from "react-router-dom"
import { Redirect } from "react-router-dom"

const mapStateToProps = (state) =>({
    login_status : state.login_status,
    isLoggedIn: state.isLoggedIn,
    isLoading: state.isLoading
})

const Landing = (props) => {
    
    const history = useHistory()
 
    useEffect(() => {
        props.getLogin()
       
    },[])

    const toLogin = (e) => {
        e.preventDefault()

        history.push('/login')
    }
    const toRegister = (e) => {
        e.preventDefault()

        history.push('/register')
    }
    
    if(props.isLoading === false && props.isLoggedIn === true){
        return(
            <Redirect to="/home"/> 
        )
    }
    else {
    return (
        <div className="loginForm">
            <div className="innerWelcomePage">
            <h1 id='accform-header' style={{color:'white'}}>Welcome</h1>


            <button type="submit" onClick={toLogin} className="landingpageBtn" >Login</button> 
            <button type="submit" onClick={toRegister} className="landingpageBtn" >Register</button> 
            {/* <button className="acc-forminput"  id="password">Login</button> */}
            {/* <button className="acc-forminput"  id="password">Register</button> */}
            </div>
        </div>
    )
    }
}

export default connect(mapStateToProps, { loginAcc, getLogin })(Landing)