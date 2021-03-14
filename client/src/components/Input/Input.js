import React from 'react'
import "./Input.css";

export default function Input({setMessage, sendMessage, message}) {
    return (
        <form className="input-form">
            <input className="text-input" value={message} 
            placeholder="Type your message!!!"
            onChange={event => setMessage(event.target.value)}
            onkeyPress={event => event.key==='Enter'? sendMessage : 'null'}
            />
            <button className="send-button" onClick={sendMessage}>SEND</button>
        </form>
    )
}
