import { useEffect, useState, useRef} from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { fetchHome, getLogin, loginAcc, createServer, logout, getTextChannel, sendMessage } from "../actions/actions"
import axios from "axios"
import { useHistory } from "react-router-dom"
import { w3cwebsocket as W3CWebSocket } from "websocket"
import SideBar from "../components/SideBar"

const mapStateToProps = (state) => ({
    login_status: state.login_status,
    currentuser: state.currentuser,
    servers: state.servers,
})




const TextChannel = (props) => {
    const [textContent, setTextContent] = useState('')
    const [serverIcon, setServerIcon] = useState(null)
    const [messages, setMessages] = useState([])
    const [newMsg, setNewMsg] = useState('')
    const [currClient, setClient] = useState('')
    const ws = useRef(null);
    

 

    useEffect(() => {
        props.getTextChannel(props.match.params.server_id, props.match.params.text_id)
       

            const serverId = props.match.params.server_id
            const channelId = props.match.params.text_id
            const client = new W3CWebSocket(`ws://127.0.0.1:8000/channels/${serverId}/${channelId}/`);
            

             client.onopen =  (e) => {
                e.preventDefault()
                console.log('connected')
            
            }
            client.onclose = () =>{
                console.log('close')
            }
            setClient(client)

           
            client.onmessage =  (e) => {
                const data = JSON.parse(e.data)
                  console.log(data)
                //  document.querySelector('#chat-text').value += (data.map(msgs =>  `${msgs.fields.author.user}:${msgs.fields.text_content}`) + '\n')
                setMessages([...messages, data])
            }
            return() =>{
                client.close()
            }  
    }, [])

    const handleTextContent = (e) => {
        e.preventDefault()
        setTextContent(e.target.value)
    }

    //! send msg button
    const sendMsg = (e) => {
        e.preventDefault()
        
        currClient.send(JSON.stringify({
            'text_content': textContent,
        }))


    }

    const logout = (e) => {
        e.preventDefault()

        props.logout()
    }
    return (
        <div>
            <SideBar />
            <h1>text channel</h1>
            <h3>Welcome {props.currentuser.username + props.currentuser.user_tag}</h3>


            <form>
                <input type="text" name="message" onChange={handleTextContent} />
                <button type="submit" onClick={sendMsg}>Send</button>
            </form>
            <div>
            {messages.map(msg => {
                console.log(msg)
                return(
                    <>
                    {msg.map(message =>{
                        return(
                            <>
                            <h4>{message.fields.author.user}{message.fields.author.user_tag}</h4>
                             <p>{message.fields.text_content}</p>
                            </>
                        )
                    })}
                        
                    </>
                )
            })}
            
            </div>
            <button onClick={logout}>Logout</button>
        </div>
    )
}

export default connect(mapStateToProps, { logout, getTextChannel, sendMessage })(TextChannel)