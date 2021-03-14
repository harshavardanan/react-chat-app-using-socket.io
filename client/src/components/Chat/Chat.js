import Messages from '../Messages/Messages';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import React, {useState, useEffect} from 'react';
import io from "socket.io-client";
import queryString from "query-string"; 


let socket;


export default function Chat({ location }) {
    const [name, setName] = useState("");
    const [room, setRoom] = useState("");
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);

    const ENDPOINT = "localhost:4000";
    useEffect(() => {
        const {name, room} = queryString.parse(location.search);

        socket = io(ENDPOINT);
        
        setName(name);
        setRoom(room);

        socket.emit("join", {name, room}, () => {});

        return () => {
            socket.emit("disconnect");
            socket.off();
        };       
    },[ENDPOINT, location.search]);

    useEffect(() => {
        socket.on("message", message => {
            setMessages([...messages, message]);
        });
    }, [messages]);

    const sendMessage = event => {
        event.preventDefault();
        if(message){
            socket.emit("sendMessage", message, () => setMessage("")
            );
        }
    };
    console.log(message, messages);
    return (
        <div>
            <InfoBar room={room}/>
            <Messages messages={messages} name={name}/>
            <Input setMessage={setMessage} sendMessage={sendMessage} message={message}/>
        </div>
    );
}
