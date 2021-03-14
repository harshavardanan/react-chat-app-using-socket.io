import React, {useState} from 'react';
import {Link} from "react-router-dom";
import './Join.css';

const Join = () => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');

    return(
        <div className="join-body">
            <h1 className="app-header">CHAT ROOMS</h1>
            <form className="join-form">
                <h1 className="app-header2">JOIN ROOM</h1>
                <div className="input-area">
                    <div>
                        <input className="input-fields" style={{textTransform: "lowercase"}} type="text" placeholder="NAME" onChange={e =>setName(e.target.value)} />
                    </div>
                    <div>
                        <input className="input-fields" style={{textTransform: "lowercase"}} type="text" placeholder="ROOM" onChange={e =>setRoom(e.target.value)} />
                    </div>
                </div>
                <Link to={`/chat?name=${name}&room=${room}`} onClick={e=>(!name||!room) ? e.preventDefault() : 'null'}>
                    <button className="join-button" type="submit">JOIN</button>
                </Link>
            </form>
        </div>
    )
}
export default Join;