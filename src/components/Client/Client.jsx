import './Client.css';
import { useState, useEffect } from 'react';
import ClientNav from '../ClientNav/ClientNav';
import Console from '../Console/Console';
import Chat from '../Chat/Chat';


export default function Client({ user }) {

    let [consoleDiv, setConsoleDiv] = useState(false);
    let [chatDiv, setChatDiv] = useState(false);
    let [room, setRoom] = useState(null);
    let [usersMessaged, setUsersMessaged] = useState([]);




    return (
        <div className='Client'>
            <h1>sauce on my boss</h1>
            {consoleDiv && <Console user={user} setChatDiv={setChatDiv} setRoom={setRoom} consoleDiv={consoleDiv} setConsoleDiv={setConsoleDiv} setUsersMessaged={setUsersMessaged} usersMessaged={usersMessaged} />}
            <Chat user={user} chatDiv={chatDiv} setChatDiv={setChatDiv} usersMessaged={usersMessaged} setUsersMessaged={setUsersMessaged} room={room} setRoom={setRoom} />
            <ClientNav user={user} chatDiv={chatDiv} setChatDiv={setChatDiv} setConsoleDiv={setConsoleDiv} consoleDiv={consoleDiv} />
        </div>
    )
}