import { useEffect, useState } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { fetchHome, getLogin, loginAcc, createServer, logout, getTextChannel, sendMessage } from "../actions/actions"
import CSRFToken from "../components/csrf"
import axios from "axios"
import { useHistory } from "react-router-dom"
import { w3cwebsocket as W3CWebSocket } from "websocket"

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

    let serverId = props.match.params.server_id
    let channelId = props.match.params.text_id
    let client = new W3CWebSocket(`ws://127.0.0.1:8000/channels/${serverId}/${channelId}/`);

    useEffect(() => {
        // props.getTextChannel(props.match.params.server_id, props.match.params.text_id)
            client.onopen = () => {
            console.log('Socket is connected');
            }
            client.onmessage = function (e) {
                e.preventDefault()
                  const data = JSON.parse(e.data)
                  console.log(data)
                //  document.querySelector('#chat-text').value += (data.map(msgs =>  `${msgs.fields.author.user}:${msgs.fields.text_content}`) + '\n')
                // setMessages(data)
            }

    },[])

    const handleTextContent = (e) => {
        e.preventDefault()
        // setTextContent({text_content: e.target.value, author: props.author, created_in: props.match.params.text_id})
        setTextContent(e.target.value)
    }

    //! send msg button
    const sendMsg = (e) => {
        e.preventDefault()

        client.send(JSON.stringify({
            'message': textContent,
        }))
        setTextContent('')

        // client.onmessage = function (e) {
        //     const data = JSON.parse(e.data)
        //     console.log(data)
        //     // document.querySelector('#chat-text').value += (`${data.author.user} : ${data.message}` + '\n')

        //     setNewMsg([textContent])
        // }


    }

    const logout = (e) => {
        e.preventDefault()

        props.logout()
    }
    return (
        <div>
            <h1>text channel</h1>
            <h3>Welcome {props.currentuser.username + props.currentuser.user_tag}</h3>


            <form>
                <input type="text" name="message" onChange={handleTextContent} />
                <button type="submit" onClick={sendMsg}>Send</button>
            </form>

            <div>
            {messages.map(msg => {
                return(
                    <>
                        <h4>{msg.fields.author.user}{msg.fields.author.user_tag}</h4>
                        <p>{msg.fields.text_content}</p>
                    </>
                )
            })}
            {/* <h4>{newMsg.author.user}</h4>
            <p>{newMsg.message}</p> */}
            </div>
            <button onClick={logout}>Logout</button>
        </div>
    )
}

export default connect(mapStateToProps, { logout, getTextChannel, sendMessage })(TextChannel)