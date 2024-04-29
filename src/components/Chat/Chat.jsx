import ChatConversation from '../ChatConversation/ChatConversation';
import './Chat.css';
import io from 'socket.io-client';
import { useEffect, useState } from 'react';

const socket = io.connect('http://localhost:4741');
// const socket = io.connect('https://ghotel-api.onrender.com');

export default function Chat({ user, usersMessaged, setUsersMessaged, room, setRoom, chatDiv, setChatDiv }) {
    const [message, setMessage] = useState('');
    const [messageReceived, setMessageReceived] = useState({});
    const [isDragging, setIsDragging] = useState(false);
    const [initialX, setInitialX] = useState(0);
    const [initialY, setInitialY] = useState(0);

    function toggleChat() {
        setChatDiv(!chatDiv)
    };

    useEffect(() => {
        if (room !== null) {
            joinRoom();

            socket.on('receive_message', handleReceiveMessage);
            socket.on('message_history', handleMessageHistory);
        }

        return () => {
            if (room !== null) {
                socket.off('receive_message', handleReceiveMessage);
                socket.off('message_history', handleMessageHistory);
            }
        };
    }, [room]);

    const joinRoom = () => {
        if (room !== null) {
            socket.emit('join_room', { room });
        }
    };

    const handleMessageHistory = (data) => {
        setMessageReceived((prevMessages) => ({
            ...prevMessages,
            [data.room]: data.messages,
        }));
    };

    const handleReceiveMessage = (data) => {
        if (data.room === room) {
            setMessageReceived((prevMessages) => ({
                ...prevMessages,
                [data.room]: [...(prevMessages[data.room] || []), data.message],
            }));
        }
    };

    const sendMessage = () => {
        if (room !== null && message.trim() !== '') {
            const currentTime = new Date();
            const hours = currentTime.getHours().toString().padStart(2, '0');
            const minutes = currentTime.getMinutes().toString().padStart(2, '0');

            const newMessage = {
                text: `${hours}:${minutes}: ${message}`,
                sender: user.name,
            };

            socket.emit('send_message', { message: newMessage, room });
            setMessage('');
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            sendMessage();
        }
    };

    let conversations = null;
    if (usersMessaged) {
        conversations = usersMessaged.map((userMessaged, index) => (
            <ChatConversation
                user={user}
                setMessageReceived={setMessageReceived}
                userMessaged={userMessaged}
                usersMessaged={usersMessaged}
                setUsersMessaged={setUsersMessaged}
                index={index}
                key={index}
                room={room}
                setRoom={setRoom}
            />
        ));
    }

    function handleMouseDown(e) {
        setIsDragging(true);
        setInitialX(e.clientX);
        setInitialY(e.clientY);
    }

    function handleMouseUp() {
        setIsDragging(false);
    }

    function handleMouseMove(e) {
        if (isDragging) {
            const consoleElement = document.querySelector('.ChatDiv');
            const newX = e.clientX - initialX + consoleElement.offsetLeft;
            const newY = e.clientY - initialY + consoleElement.offsetTop;
            consoleElement.style.left = newX + 'px';
            consoleElement.style.top = newY + 'px';
            setInitialX(e.clientX);
            setInitialY(e.clientY);
        }
    }

    return (
        <div
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            className={`ChatDiv ${chatDiv ? '' : 'HideChat'}`}>
            <h3>Chat</h3>
            <div onClick={toggleChat} className='ChatX'>X</div>
            <ul className='ConversationList'>{conversations}</ul>

            <ul className='Messages'>
                {(messageReceived[room] || []).map((message, index) => (
                    <li key={index} className={`Message ${message.sender === user.name ? 'user' : 'sender'}`}>
                        {message.text}
                    </li>
                ))}
            </ul>
            <textarea
                placeholder='Type your message...'
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                onKeyDown={handleKeyDown}
            />
        </div>
    );
}
