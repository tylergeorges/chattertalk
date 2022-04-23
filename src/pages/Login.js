import { useEffect, useState } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { getLogin, loginAcc } from "../actions/actions"
import axios from "axios"
import { useHistory } from "react-router-dom"
const mapStateToProps = (state) =>({
    login_status : state.login_status,
    // csrftoken: state.csrftoken
})

const Login = (props) => {
    let history = useHistory();  

    const [user, setUser] = useState('')
    const [pass, setPass] = useState('')
    const [acc, loginAcc] = useState('')
    const [status, setStatus] = useState('')

    // const csrftoken = props.csrftoken

    // const token = ('; '+ csrftoken).split(`; XSRF-TOKEN=`).pop().split(';')[0];

 
    useEffect(() => {
        props.getLogin()

        if(props.login_status == '201'){
            history.push('/home')
        }
       
    },[status])


 

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
    return (
        <div>
            <h1>Login</h1>
            <form  className="welcomelinks" autoComplete="off" >
       
      
                <input type='text' placeholder="Username" onChange={handleInput} id="username" />

                <input type='password' placeholder="Password" onChange={handleInput} id="password" />
                <button type="submit" className="formSubmit" onClick={handleSubmit} >Login</button>
                <br />
                <br />

                <nav className="linkotherpage">
                    <div className="linkPageFooter">
                        <p >Don't have an account? <Link to="register" id="reglink">Create Account</Link></p>
                    </div>
                </nav>

            </form>

        </div>
    )
}

export default connect(mapStateToProps, { loginAcc, getLogin })(Login)