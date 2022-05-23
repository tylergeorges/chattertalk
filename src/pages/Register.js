import { useEffect, useState } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { addAccount, fetchRegister, getLogin, loginAcc } from "../actions/actions"
import axios from "axios"
import AddIcon from '@mui/icons-material/Add';
import * as icon from '@mui/icons-material';
import { Redirect } from "react-router-dom"

const mapStateToProps = (state) =>({
    isLoggedIn : state.isLoggedIn,
    // csrftoken: state.csrftoken
})

const Register = (props) => {

    useEffect(() => {
        props.fetchRegister()
        console.log(props.isLoggedIn)
    },[])


    const [user, setUser] = useState('')
    const [pass, setPass] = useState('')
    const [userPFP, setUserPFP] = useState(null)

    const handleInput = (e) => {
        e.preventDefault()

        if (e.target.id === 'username') {
            setUser(e.target.value)
        }
        if (e.target.id === 'password') {
            setPass(e.target.value)
        }

    }

    const defaultPFP = () =>{
        let pfpsArr = ['skullGIF', 'unicornGIF']

        let idx = pfpsArr[Math.floor(Math.random() * pfpsArr.length)]

        return pfpsArr[idx]
    }

    const handleUserPFP = (e) =>{
        setUserPFP(e.target.files[0])


    }

    const handleSubmit = (e) => {
        e.preventDefault()

   
        if (user && pass !== '') {


            if(userPFP !== null){
                props.addAccount({ username: user, password: pass, profile_picture: userPFP})
                setUserPFP(null)
            }

            else if(userPFP === null){

                props.addAccount({ username: user, password: pass, profile_picture: userPFP})
                setUserPFP(null)
            }
         
        }
    }
    if(props.isLoggedIn !== null){
        return(
            <Redirect to="/home"/>
            
        )
    }
    else if(props.isLoggedIn == null){
    return (
        <div>
            <h1>Register</h1>
            <form  className="welcomelinks" autoComplete="off" >
        
                <input type='text' placeholder="Username" onChange={handleInput} id="username" />

                <input type='password' placeholder="Password" onChange={handleInput} id="password" />
                <button type="submit" className="formSubmit" onClick={handleSubmit} >Register</button>
                <br />
                <br />



                <label htmlFor="userpfp_icon" id='userpfpIcon' ><icon.AddPhotoAlternate /> </label> 

                <label label htmlFor="userpfp_icon" id="userpfplabel">Upload Profile Picture</label>

                <input type="file" accept="image/*" id="userpfp_icon" style={{ display: 'none'}} onChange={handleUserPFP}></input>

                <nav className="linkotherpage">
                    <div className="linkPageFooter">
                        <p >Have an account? <Link to="login" id="reglink">Sign In</Link></p>
                    </div>
                </nav>

            </form>
        </div>
    )
    }
}

export default connect(mapStateToProps, { addAccount, fetchRegister })(Register)