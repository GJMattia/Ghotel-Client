import './Client.css';
import { useState, useEffect } from 'react';
import ClientNav from '../ClientNav/ClientNav';
import Console from '../Console/Console';
import Chat from '../Chat/Chat';


export default function Client({ user }) {

    let [consoleDiv, setConsoleDiv] = useState(false);

    let [chatDiv, setChatDiv] = useState(false);

    let [usersMessaged, setUsersMessaged] = useState([]);


    console.log(usersMessaged)

    return (
        <div className='Client'>

            {consoleDiv && <Console user={user} consoleDiv={consoleDiv} setConsoleDiv={setConsoleDiv} setUsersMessaged={setUsersMessaged} usersMessaged={usersMessaged} />}
            {chatDiv && <Chat user={user} chatDiv={chatDiv} setChatDiv={setChatDiv} usersMessaged={usersMessaged} />}
            <ClientNav user={user} setConsoleDiv={setConsoleDiv} consoleDiv={consoleDiv} chatDiv={chatDiv} setChatDiv={setChatDiv} />
        </div>
    )
}