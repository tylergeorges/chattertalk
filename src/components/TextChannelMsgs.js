import { useEffect, useState, useRef} from "react"
import { connect } from "react-redux"
import {  logout, getTextChannel, sendMessage, setNotifis, createMessage } from "../actions/actions"
import { useHistory } from "react-router-dom"

const mapStateToProps = (state) => ({
    login_status: state.login_status,
    currentuser: state.currentuser,
    servers: state.servers,
    currentchannel: state.currentchannel,
    isLoading: state.isLoading,
    auth_token: state.auth_token,
    msgs: state.msgs,
    client: state.client
})


const TextChannelMsgs = (props) => {
    const [textContent, setTextContent] = useState('')
    const [messages, setMessages] = useState([])
    const [newmsg, setNewMessages] = useState()
    const [usersMentioned, setUsersMentioned] = useState([])
    const [currClient, setClient] = useState(null)
    const [update, setUpdate] = useState(false)
    
    const messageRef = useRef(null);
    const ws = useRef(null);
    // const url = window.location.pathname.split('/').pop();
    const history = useHistory()
    
    
    useEffect( () => {
        // props.getTextChannel(props.serverid, props.channelid)
        
        setMessages(props.msgs)
    }, [props.msgs])
    
    useEffect(()=>{
        messageRef.current.scrollIntoView({ block: 'end', behavior: 'smooth' });

    },[messages])
 
    

    const handleTextContent = (e) => {
        e.preventDefault()
    

        if(e.target.value.indexOf('@') >= 0){
            let users = e.target.value.split('@').pop()

            if(users.indexOf(" ") >= 0 && users.indexOf("#") >= 0){
               let usersInfo = users.substring(0, users.indexOf(" "))
               let userTag = '#' + usersInfo.split('#').pop()

              
                if(usersInfo !== '' &&  userTag.length === 5 && usersMentioned.includes(usersInfo) === false){
                    setUsersMentioned([...usersMentioned, usersInfo.trim()])
                    // e.target.value.classList.add('mention')
                 
                }
           
            }
      
           
        }
         setTextContent(e.target.value.trim())
        
        // setTextContent(e.target.value)
    }

    const sendMsg =  (e) => {
        e.preventDefault()
      
      
        if(usersMentioned.length > 0){
            props.createMessage(
                {
            'serverid':props.serverid,
            'channelid': props.channelid,
            'text_content': textContent,
            'users_mentioned': usersMentioned,
            'auth_token': props.auth_token, 
            'currentuser':props.currentuser,
            'channelid': props.channelid, 
            'isMention': true
        }
        )

        props.client.send(JSON.stringify({
                'event': 'send_msg',
                'text_content': textContent,
               'users': usersMentioned,
               'currentuser': props.currentuser,
               'isMention': true
            }))
            setUsersMentioned([])
        }
        else if(usersMentioned.length == 0){
            props.createMessage(
                {
            'serverid':props.serverid,
            'channelid': props.channelid,
            'text_content': textContent,
            'users_mentioned': usersMentioned,
            'auth_token': props.auth_token, 
            'currentuser':props.currentuser,
            'channelid': props.channelid, 
            'isMention': false
        }
        )
        
        props.client.send(JSON.stringify({
                'event': 'send_msg',
                'text_content': textContent,
               'users': usersMentioned,
               'currentuser': props.currentuser,
               'isMention': false
            }))
            setUsersMentioned([])
        }
        props.client.onmessage =  (e) => {
            const data =  JSON.parse(e.data)
         //    props.setNotifis()
          if(data.model == 'chatroom.message'){
            setMessages((prevState)=>[...prevState, data])
            messageRef.current.scrollIntoView({ block: 'end', behavior: 'smooth' });
        }
        if(!data.model && data[0].model === 'chatroom.notifications'){
            props.setNotifis(data)
        }
     }
     
     document.getElementById('messageInput').value = ''

    }

    //! send msg button
   
    
    return (
        
        <>

            <>
                
         {messages.map(msg => {
             const today = new Date();
             const m = today.getMonth();
             const d = today.getDate();
             const y = today.getFullYear();


             const todaysDate = new Date(y,m,d)
             const prevDate = new Date(msg.fields.created_at)



             let dateOptions = {weekday: 'long',hour: 'numeric', minute: 'numeric', hour12: true}
             let datetime = new Date(msg.fields.created_at).toLocaleString('en', dateOptions )

             const mili = todaysDate.getTime() - prevDate.getTime()
             const days = Math.ceil(mili / (1000 * 3600 * 24))


            //comparing previous message dates to todays date
            if(days > 1){
                dateOptions = {day: 'numeric',month: 'numeric', year: 'numeric'}
                datetime = new Date(msg.fields.created_at).toLocaleString('en', dateOptions )
            }
            else if(days < 1){
                 dateOptions = {hour: 'numeric', minute: 'numeric', hour12: true};
                 datetime = 'Today at ' + new Date(msg.fields.created_at).toLocaleString('en', dateOptions )
            }
            else if(days === 1){
                 dateOptions = {hour: 'numeric', minute: 'numeric', hour12: true};
                 datetime = 'Yesterday at ' + new Date(msg.fields.created_at).toLocaleString('en', dateOptions )
            }
                return(
                    <div className='allmsgsCon' key={msg.pk} >
                        {/* style={msg.fields.isMention && msg.fields.user_mentioned === props.currentuser.id ? {background: 'rgba(255, 217, 61,0.3)', width: '100%'} : {}} */}
                        <div  className='allmessages'  style={msg.fields.isMention && msg.fields.user_mentioned.includes(props.currentuser.id) ? 
                                                             {
                                                             background: 'rgba(255, 217, 61,0.3)', 
                                                             width: '80%'
                                                             } : {} }>
                            <div className="userMsgInfoCon" >
                            <img  style={{height: '35px', width: '35px'}} id='userInfoPfp'src={`${msg.fields.author.profile_picture}`} alt="Profile picture"></img>
                                <div className="userMsgCon" >
                                <div className="UserNameUserTime">
                                <h4 className="userMsgUsername">{msg.fields.author.username}</h4>
                                <p className="userMsgTime" style={{fontSize: 'smaller'}}>{datetime}</p>
                                </div>
                            <p className='messagecontent' >{msg.fields.text_content}</p>
                                </div>
                            </div>
                            
                             </div>
                             </div>
                )
            }) }
            <div ref={messageRef}/>
            </>
            <div className="messageconParent">
                    <form className="messageCon" autoComplete="off" >
                            <input type="text" placeholder="Send a message... " name="message" onChange={handleTextContent} id="messageInput" />
                            <button type="submit" style={{display:'none'}} onClick={sendMsg} >Send</button>
                    </form>
                    </div>
        </>
           
    )
    
}

export default connect(mapStateToProps, { logout, getTextChannel, sendMessage, setNotifis, createMessage })(TextChannelMsgs)