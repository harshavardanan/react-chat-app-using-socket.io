import React from 'react'
import ReactEmoji from 'react-emoji'
import "./Message.css";

export default function Message({message:{text, user}, name}) {

    let isSentByCurrrentUser = false;
if(user === name){
    isSentByCurrrentUser = true;
}

    return (isSentByCurrrentUser ? (
        <div className="right-message-container">
            <div className="sender-container">
          <p className="sender-name">{name}</p>
          <div className="messageBox " >
            <p className="sent-text">{ReactEmoji.emojify(text)}</p>
          </div>
        </div>
        </div>
    ) : (
        <div className="left-message-container">
            <div className="receiver-container">
            <div className="message-box-receiver">
              <p className="sender-message">{ReactEmoji.emojify(text)}</p>
            </div>
            <p className="sender-name ">{user}</p>
          </div>
        </div>
    ))
}
