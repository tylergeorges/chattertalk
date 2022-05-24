import { useEffect, useState } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { getLogin, loginAcc } from "../actions/actions"
import axios from "axios"
import { useHistory } from "react-router-dom"
import { Redirect } from "react-router-dom"

const mapStateToProps = (state) =>({
    login_status : state.login_status,
    isLoggedIn: state.isLoggedIn
})

const Login = (props) => {
    let history = useHistory();  

    const [user, setUser] = useState('')
    const [pass, setPass] = useState('')
    const [acc, loginAcc] = useState('')
    const [status, setStatus] = useState('')
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    // const csrftoken = props.csrftoken

    // const token = ('; '+ csrftoken).split(`; XSRF-TOKEN=`).pop().split(';')[0];

 
    useEffect(() => {
        props.getLogin()
        setIsLoggedIn(props.isLoggedIn)

        // if(props.login_status == '201'){
        //     history.push('/home')
        // }
        // if(props.isLoggedIn !== false){
        //     history.push('/home')
        // }
       
    },[])


 

    const handleInput = (e) => {
        e.preventDefault()

        if (e.target.id === 'username') {
            setUser(e.target.value)
        }
        if (e.target.id === 'password') {
            setPass(e.target.value)
        }

    }
    
    const handleSubmit = (e) => {
        e.preventDefault()

        // if(props.currentuser !== ''){
        // }
        if (user && pass !== '') {
            props.loginAcc({ username: user, password: pass })
         
        }
        
    }
    
    if(props.isLoggedIn === true){
        return(
            <Redirect to="/home"/>
        )
    }
    else if(props.isLoggedIn === null || props.isLoggedIn === false){
    return (
        <div className="loginForm">
            <div className="innerLoginForm">
            <h1 id='accform-header' style={{color:'white'}}>Login</h1>

            <form  className="welcomelinks" >
       
            <div className="acc-forminputCon">
                    <input type='text'className="acc-forminput"  placeholder="Username" onChange={handleInput} id="username" />
                    <div className="username-inputborder"/>
                    </div>
                <br/>
                <div className="acc-forminputCon">
                <input type='password' className="acc-forminput"  placeholder="Password" onChange={handleInput} id="password" />
                <div className="password-inputborder"/>
                </div>
                {user !== '' && pass !== '' ? 
                <button type="submit" className="formSubmit" onClick={handleSubmit} id="createBtn">Login</button> : 
                <button type="submit" disabled className="formSubmit" onClick={handleSubmit} id="disableBtn">Login</button> 
            
            }
                <br />

                <nav className="linkotherpage">
                    <div className="linkPageFooter">
                        <p style={{color:'white'}}>Don't have an account? <Link className="acclinks-forminput" to="register" id="reglink">Sign Up</Link></p>
                    </div>
                </nav>

            </form>
            </div>
        </div>
    )
    }
}

export default connect(mapStateToProps, { loginAcc, getLogin })(Login)