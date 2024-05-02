import './RoomChat.css';
import io from 'socket.io-client';
import { useState, useEffect, useRef } from 'react';

// const socket = io.connect('http://localhost:4741');
const socket = io.connect('https://ghotel-api.onrender.com');

export default function RoomChat({ user, roomInfo }) {

    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const inputRef = useRef(null);

    const sendMessage = () => {
        if (message.trim() !== '') {
            socket.emit('send_message', { username: user.name, message, roomNumber: roomInfo.chat });
            setMessage('');
            inputRef.current.value = '';
            setTimeout(() => {
                const messageElements = document.querySelectorAll('.RoomMessage');
                messageElements.forEach(element => {
                    element.classList.add('Fade');
                });
            }, 200);

        }

    };

    useEffect(() => {
        setMessages([]);
        socket.on('receive_message', ({ username, message }) => {
            setMessages(prevMessages => [...prevMessages, { username, message }]);
        });

        return () => {
            socket.off('receive_message');
        };
    }, [roomInfo.chat]);


    useEffect(() => {
        const liveRoom = document.querySelector('.UserHistory');
        liveRoom.innerHTML = '';
        socket.emit('join_josh', { username: user.name, roomNumber: roomInfo.chat });
        const handleUserJoined = ({ username }) => {
            liveRoom.innerHTML += `<p>${username} joined the room</p>`;
        };
        const handleUserLeft = ({ username }) => {
            liveRoom.innerHTML += `<p>${username} left the room</p>`;
        };
        socket.on('user_joined', handleUserJoined);
        socket.on('user_left', handleUserLeft);
        return () => {
            socket.off('user_joined', handleUserJoined);
            socket.off('user_left', handleUserLeft);
            socket.emit('leave_room', { username: user.name, roomNumber: roomInfo.chat });
        };
    }, [roomInfo.chat]);

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            sendMessage();
        }
    };

    return (
        <>
            <input
                maxLength={50}
                type="text"
                onChange={(event) => setMessage(event.target.value)}
                className='RoomChatInput'
                placeholder='Type your message...'
                ref={inputRef}
                onKeyDown={handleKeyDown}
            />

            <ul className='RoomChat'>
                {messages.map((msg, index) => (
                    <li key={index} className='RoomMessage'>
                        <span className='Username'>{msg.username}: </span>
                        <span className='Message'>{msg.message}</span>
                    </li>
                ))}
            </ul>
            <div className='UserHistory'>
            </div>
        </>
    );
};
