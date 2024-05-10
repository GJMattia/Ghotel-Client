import './Debugger.css';
import { useState, useEffect } from 'react';
import io from 'socket.io-client';

// const socket = io.connect('http://localhost:4741');
const socket = io.connect('https://ghotel-api.onrender.com');

export default function Debugger({ setDebugDiv }) {

    const PASSWORD = 'kronos';
    const DEBUG_ROOM = 19161123;
    const [admin, setAdmin] = useState(false);
    const [pw, setPw] = useState('');

    useEffect(() => {
        if (admin) {
            socket.emit('get_history', DEBUG_ROOM);
            socket.on('send_history', (data) => {
                console.log('Received history:', data);
            });

            socket.on('clear_info', (data) => {
                console.log('Cleared!', data)
            })

        };

        return () => {
            socket.off('send_history');
            socket.off('clear_info');
        };
    }, [admin]);

    function clearInfo() {
        socket.emit('send_clear', DEBUG_ROOM);
    };

    const pwInput = (event) => {
        setPw(event.target.value);
    };


    function submitPW() {
        if (pw === PASSWORD) {
            setAdmin(true);
        }
    };

    return (
        <div className='Debugger'>
            <button onClick={() => setDebugDiv(false)} className='InventoryX'>X</button>
            <h4 className='BoxHeader'>Debugger</h4>

            {admin ?
                <div className='PWscreen'>
                    <h3>Welcome to Admin Panel</h3>

                    <button
                        onClick={clearInfo}
                        className='AdminBtn AB2'>Clear Room History</button>

                </div>
                :

                <div className='PWscreen'>
                    <h3>Enter PW to access debugger</h3>
                    <input onChange={pwInput}
                        maxLength={20} />
                    <button
                        onClick={submitPW}
                        className='AdminBtn'>Access</button>
                </div>}

        </div>
    )
};