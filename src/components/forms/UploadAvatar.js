import * as React from 'react';
import { useEffect, useState } from "react"
import { connect } from "react-redux"
import { addAccount,fetchRegister} from "../../actions/actions"
import CameraAltIcon from '@mui/icons-material/CameraAlt';

const mapStateToProps = (state) => ({
    login_status: state.login_status,
    currentuser: state.currentuser,
    servers: state.servers,
    auth_token: state.auth_token,
    isLoading: state.isLoading
})


const UploadAvatar = (props) => {
    const [profilePicture, setProfilePicture] = useState('cr_frontend/src/images/defaultprofilepicture.png')
    const [preivewPFP, setPreviewPFP] = useState('cr_frontend/src/images/defaultprofilepicture.png')
    const [iconChecker, setIconChecker] = useState(false)

    useEffect(() => {
         props.fetchRegister()
         const defaultpfps = ['defaultpfp_grey.png','defaultpfp_pink.png','defaultpfp_purple.png','defaultpfp_red.png']
         let pfp = defaultpfps[Math.floor(Math.random() * defaultpfps.length)]

        setPreviewPFP(`http://127.0.0.1:8000/media/profile_picture/${pfp}`)  
        setProfilePicture(`http://127.0.0.1:8000/media/profile_picture/${pfp}`)
        
    }, [])
    
    
    // const handleAvatarChange = (e) => {
    //     e.preventDefault()
    //     set
    // }

    const createAccount = (e) => {
        e.preventDefault()

      
    // props.addAccount({ username: props.username, password: props.password, profile_picture: profile_picture })
    }

    const handleAvatarChange = (e) =>{
        e.preventDefault()
        
        setProfilePicture(e.target.files[0])
        const reader = new FileReader()

        reader.onload = () =>{
            setPreviewPFP(reader.result)
        }

        reader.readAsDataURL(e.target.files[0])

        setIconChecker(true)

        
    }



    return (
       

        <div className="loginForm">
        <div className="innerLoginForm">  
                        <h1 id='userpfp-formHeader' style={{color:'white'}}>Upload Profile Picture</h1>
                        <form  className="welcomelinks">

                    <div  className='previewIconCon'>
                           
                         <div className='changepfpCon'>

                            <label htmlFor="server_icon" className='icon-changepfpCon'>
                            <CameraAltIcon  id="icon-changepfp" style={{color:'white', fontSize:'30px'}}/>
                            </label>

                            <div id="pfpiconpreview-black"/>
                             <img id="pfpiconpreview" src={preivewPFP} alt="profile_picture"/>
                             </div> 

                            <input type="file" accept="image/*" id="server_icon" style={{ display: 'none'}} onChange={handleAvatarChange}></input>
                            
                    </div>


                        <div className='forminputCon'>
                        </div>
                        <button type="submit" onClick={createAccount}id="createServerBtn"  variant='contained'>Register</button>
                        </form>
                </div>
            </div>

         
    )
}

export default connect(mapStateToProps, {  addAccount, fetchRegister})(UploadAvatar)