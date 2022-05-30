import { useEffect, useState } from "react"
import { connect } from "react-redux"
import { addAccount, fetchRegister,  } from "../actions/actions"
import { Redirect } from "react-router-dom"
import RegisterForm from "../components/forms/RegisterForm"

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