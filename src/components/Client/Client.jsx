import './Client.css';
import { useState, useEffect } from 'react';
import ClientNav from '../ClientNav/ClientNav';
import Console from '../Console/Console';


export default function Client({ user }) {

    let [consoleDiv, setConsoleDiv] = useState(false);

    return (
        <div className='Client'>

            {consoleDiv && <Console user={user} consoleDiv={consoleDiv} setConsoleDiv={setConsoleDiv} />}
            <ClientNav user={user} setConsoleDiv={setConsoleDiv} consoleDiv={consoleDiv} />
        </div>
    )
}