import './MainPage.css';
import io from 'socket.io-client';
const socket = io.connect('http://localhost:4741');
import { useEffect, useState } from 'react';


export default function MainPage() {
    const [message, setMessage] = useState('');
    const [messageRecieved, setMessageRecieved] = useState('');
    const [room, setRoom] = useState('');


    const joinRoom = () => {
        if (room !== '') {
            socket.emit('join_room', room);
        }
    };


    const sendMessage = () => {
        socket.emit('send_message', { message, room })

    };


    useEffect(() => {
        socket.on('receive_message', (data) => {
            setMessageRecieved(data.message);

        })
    }, [socket])



    return (
        <div className='MainPage'>
            <input
                placeholder="Room Number..."
                onChange={(event) => {
                    setRoom(event.target.value);
                }}
            />
            <button onClick={joinRoom}> Join Room</button>




            <div className='Messages'>
                {messageRecieved}
            </div>


            <input className='MessageInput' placeholder='message...' onChange={(event) => {
                setMessage(event.target.value);
            }} />

            <button onClick={sendMessage}>Send Message</button>

        </div>
    )
}
