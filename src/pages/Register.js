import { useEffect, useState } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { addAccount, fetchRegister, getLogin, loginAcc } from "../actions/actions"
import axios from "axios"
import AddIcon from '@mui/icons-material/Add';
import * as icon from '@mui/icons-material';
import { Redirect } from "react-router-dom"
import RegisterForm from "../components/forms/RegisterForm"
import UploadAvatar from "../components/forms/UploadAvatar"

const mapStateToProps = (state) =>({
    isLoggedIn : state.isLoggedIn,
    nextFormStep: state.nextFormStep
    // csrftoken: state.csrftoken
})

const Register = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)


    useEffect(() => {
        props.fetchRegister()
        setIsLoggedIn(props.isLoggedIn)

    },[])


    
    if(props.isLoggedIn){
        return(
            <Redirect to="/home"/>
        )
    }
    else if(props.isLoggedIn === null || props.isLoggedIn === false){
    return (
        <div >
           {/* { props.nextFormStep ? <UploadAvatar /> : <RegisterForm /> } */}
           <RegisterForm /> 
        </div>
    )
    }
}

export default connect(mapStateToProps, { addAccount, fetchRegister })(Register)