import ChatConversation from '../ChatConversation/ChatConversation';
import './Chat.css';
import io from 'socket.io-client';
const socket = io.connect('http://localhost:4741');
import { useEffect, useState } from 'react';


export default function Chat({ user, chatDiv, setChatDiv, usersMessaged }) {

    const [room, setRoom] = useState(100);
    const [message, setMessage] = useState('');
    const [messageReceived, setMessageReceived] = useState([]);

    function toggleChatDiv() {
        setChatDiv(!chatDiv);
    };

    const joinRoom = () => {
        if (room !== null) {
            socket.emit('join_room', room);
        }
    };

    const sendMessage = () => {
        if (room !== null && message.trim() !== '') {
            socket.emit('send_message', { message, room });
            setMessage('');
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            sendMessage();
        }
    };

    useEffect(() => {
        if (room !== null) {
            joinRoom();

            socket.on('receive_message', (data) => {
                setMessageReceived((prevMessages) => [...prevMessages, data.message]);
            });
        }
    }, [room]);


    let conversations = null;
    if (usersMessaged) {

        conversations = usersMessaged.map((userMessaged, index) => (
            <ChatConversation user={user} userMessaged={userMessaged} index={index} key={index} setRoom={setRoom} />
        ));
    };

    return (
        <div className='ChatDiv'>
            <h3>Chat</h3>
            <div onClick={toggleChatDiv} className='ChatX'>X</div>
            <ul className='ConversationList'>
                {conversations}
            </ul>

            <ul className='Messages'>
                {messageReceived.map((message, index) => (
                    <li key={index}>{message}</li>
                ))}

            </ul>
            <textarea
                placeholder='Type your message...'
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                onKeyDown={handleKeyDown} />
        </div>
    )
}