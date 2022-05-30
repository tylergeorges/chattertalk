import { useEffect, useState } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import axios from "axios"
import AddIcon from '@mui/icons-material/Add';
import * as icon from '@mui/icons-material';
import { Redirect } from "react-router-dom"
import { addAccount, fetchRegister, nextFormStep } from "../../actions/actions";

const mapStateToProps = (state) =>({
    isLoggedIn : state.isLoggedIn,
    // csrftoken: state.csrftoken
})

const RegisterForm = (props) => {

    useEffect(() => {
        props.fetchRegister()
    },[])


    const [user, setUser] = useState('')
    const [pass, setPass] = useState('')
    const [userPFP, setUserPFP] = useState(null)
    const [showNextStep, setShowNextStep] = useState(false)
    const [accCreated, setAccCreated] = useState(false)


    const handleInput = (e) => {
        
        if (e.target.id === 'username') {
            // e.target.value = e.target.value.replace(/\s/g, '').trim()
            setUser(e.target.value)
        }
        if (e.target.id === 'password') {
            // e.target.value = e.target.value.replace(/\s/g, '').trim()
            setPass(e.target.value)
        }

    }

    // const defaultPFP = () =>{
    //     let pfpsArr = ['skullGIF', 'unicornGIF']

    //     let idx = pfpsArr[Math.floor(Math.random() * pfpsArr.length)]

    //     return pfpsArr[idx]
    // }

    // const handleUserPFP = (e) =>{
    //     setUserPFP(e.target.files[0])
    // }

    const handleSubmit = (e) => {
        e.preventDefault()
        // props.nextFormStep()
        
        if (user && pass !== '') {
            props.addAccount({ username: user, password: pass})
            setAccCreated(!accCreated)
        }
    }
   
    return (
        <div className="loginForm">
        <div className="innerLoginForm">
        <h1 id='accform-header' style={{color:'white'}}>Register</h1>

            <form  className="welcomelinks" autoComplete="off">

                <div className="acc-forminputCon">
                    <input  type='text'className="acc-forminput" required placeholder="Username" onChange={handleInput} id="username" />
                    <div className="username-inputborder"/>
                    </div>
                <br/>

                <div className="acc-forminputCon">
                <input type='password' required className="acc-forminput"  placeholder="Password" onChange={handleInput} id="password" />
                <div className="password-inputborder"/>
                </div>

                {user !== '' && pass !== '' ? 
                <button type="submit" className="formSubmit" id="createBtn" onClick={handleSubmit}>Register</button> : 
                <button type="submit" disabled className="formSubmit" id='disableBtn'onClick={handleSubmit}>Register</button>
                }
                    {accCreated ? <p style={{color:'#66bb6a'}}>Account Created!</p> : ''}
                


{/* 
                <label htmlFor="userpfp_icon" id='userpfpIcon' ><icon.AddPhotoAlternate /> </label> 

                <label label htmlFor="userpfp_icon" id="userpfplabel">Upload Profile Picture</label>

                <input type="file" accept="image/*" id="userpfp_icon" style={{ display: 'none'}} onChange={handleUserPFP}></input> */}

                <nav className="linkotherpage">
                    <div className="linkPageFooter">
                    <p style={{color:'white'}}>Have an account? <Link to="login" id="reglink" className="acclinks-forminput">Sign In</Link></p>
                    </div>
                </nav>

            </form>
            </div>
        </div>
    )
}

export default connect(mapStateToProps, { addAccount, fetchRegister, nextFormStep })(RegisterForm)