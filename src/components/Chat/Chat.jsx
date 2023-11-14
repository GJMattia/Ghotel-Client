import './Chat.css';
import io from 'socket.io-client';
const socket = io.connect('http://localhost:4741');
import { useEffect, useState } from 'react';



export default function Chat({ user, chatDiv, setChatDiv }) {

    function toggleChatDiv() {
        setChatDiv(!chatDiv);
    };

    const [message, setMessage] = useState('');
    const [messageReceived, setMessageReceived] = useState([]);
    const [room, setRoom] = useState('');


    const joinRoom = () => {
        if (room !== '') {
            socket.emit('join_room', room);
        }
    };


    const sendMessage = () => {
        socket.emit('send_message', { message, room })
        setMessage('');

    };


    useEffect(() => {
        socket.on('receive_message', (data) => {
            setMessageReceived((prevMessages) => [...prevMessages, data.message]);
        });
    }, [socket]);



    function log(array) {
        return array.map((element, index) => (
            <li key={index}>{element}</li>
        ));
    };


    return (
        <div className='ChatDiv'>
            <h3>Chat</h3>
            <div onClick={toggleChatDiv} className='ChatX'>X</div>
            <input />
        </div>
    )
}