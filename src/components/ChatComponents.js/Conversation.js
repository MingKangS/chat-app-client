import TextField from "@material-ui/core/TextField"
import React, { useEffect, useRef, useState } from "react"
import io from "socket.io-client"
//import "./App.css"

function Conversation(props) {
	const [ state, setState ] = useState({ message: "", username: props.username })
	const [ chat, setChat ] = useState([])

	const socketRef = useRef()

	useEffect(
		
		() => {
			console.log("the username is", props.username)
			socketRef.current = io.connect("/",{ query: { username: props.username } })
			socketRef.current.on("message", ({ username, message }) => {
				setChat([ ...chat, { username, message } ])
			})
			setState({message: "", username: props.username})
			return () => socketRef.current.disconnect()
		},
		[ chat, props.username ]
	)

	const onTextChange = (e) => {
		setState({ ...state, [e.target.name]: e.target.value })
	}

	const onMessageSubmit = (e) => {
        
		const { username, message } = state
        console.log("test", username, message)
		socketRef.current.emit("message", { username, message })
		e.preventDefault()
        console.log("test", username, message, chat)
		setState({ message: "", username })
	}

	const renderChat = () => {
		return chat.map(({ username, message }, index) => (
			<div key={index}>
				<h3>
					{username}: <span>{message}</span>
				</h3>
			</div>
		))
	}

	return (
		<div className="card">
			<form onSubmit={onMessageSubmit}>
				<h1>Messenger</h1>
				<div className="name-field">
					<TextField name="name" onChange={(e) => onTextChange(e)} value={state.username} label="Name" />
				</div>
				<div>
					<TextField
						name="message"
						onChange={(e) => onTextChange(e)}
						value={state.message}
						id="outlined-multiline-static"
						variant="outlined"
						label="Message"
					/>
				</div>
				<button>Send Message</button>
			</form>
			<div className="render-chat">
				<h1>Chat Log</h1>
				{renderChat()}
			</div>
		</div>
	)
}

export default Conversation

