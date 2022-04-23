import { useEffect, useState } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { addAccount, fetchRegister, getLogin, loginAcc } from "../actions/actions"
import axios from "axios"


const Register = (props) => {

    useEffect(() => {
        props.fetchRegister()

    },[])


    const [user, setUser] = useState('')
    const [pass, setPass] = useState('')


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

            props.addAccount({ username: user, password: pass })
         
        }
    }
    return (
        <div>
            <h1>Register</h1>
            <form  className="welcomelinks" autoComplete="off" >
        
                <input type='text' placeholder="Username" onChange={handleInput} id="username" />

                <input type='password' placeholder="Password" onChange={handleInput} id="password" />
                <button type="submit" className="formSubmit" onClick={handleSubmit} >Register</button>
                <br />
                <br />

                <nav className="linkotherpage">
                    <div className="linkPageFooter">
                        <p >Have an account? <Link to="login" id="reglink">Sign In</Link></p>
                    </div>
                </nav>

            </form>
        </div>
    )
}

export default connect(null, { addAccount, fetchRegister })(Register)