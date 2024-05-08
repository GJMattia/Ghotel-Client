import './RoomSocket.css';
import io from 'socket.io-client';
import { useState, useEffect, useRef } from 'react';
import * as accountAPI from '../../../utilities/account-api';
import buySound from '../../assets/audio/buy.mp3';

// const socket = io.connect('http://localhost:4741');
const socket = io.connect('https://ghotel-api.onrender.com');

export default function RoomSocket({ user, roomInfo, roomChange, setRoomData, setRoomInfo, credits, setCredits }) {

    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const inputRef = useRef(null);

    useEffect(() => {
        const getCredits = async (data) => {
            if (data.person !== user.name) {
                return
            } else {
                let response = await accountAPI.getCredits({ credits: data.credits });
                setCredits(response);
                let newMessage = `${data.sender} sent ${data.person} ${data.credits} credits!`;
                socket.emit('send_message', { username: 'CREDITS SENT', message: newMessage, roomNumber: roomInfo.chat });
                const audio = new Audio(buySound);
                audio.play();
            }

        };
        socket.on('get_credits', getCredits);
        return () => {
            socket.off('get_credits', getCredits)
        };
    }, []);




    useEffect(() => {
        const liveRoom = document.querySelector('.UserHistory');
        liveRoom.innerHTML = '';

        socket.emit('join_room', { username: user.name, roomNumber: roomInfo.chat });

        const handleUserJoined = (data) => {
            data.forEach(user => {
                let already = document.getElementById(`C_${user}`);
                if (already) {
                    return;
                } else {
                    const paragraph = document.createElement('p');
                    paragraph.textContent = user;
                    paragraph.id = `C_${user}`;
                    liveRoom.appendChild(paragraph);
                }
            })
        };

        const handleUserLeft = (username) => {
            const remove = document.getElementById(`C_${username}`);
            if (remove) {
                remove.remove();
            };
        };

        socket.on('user_joined', handleUserJoined);
        socket.on('user_left', handleUserLeft);
        return () => {
            socket.off('user_joined', handleUserJoined);
            socket.off('user_left', handleUserLeft);
            socket.emit('leave_room', { username: user.name, roomNumber: roomInfo.chat });
        };
    }, [roomInfo.chat]);

    useEffect(() => {
        const handleBeforeUnload = () => {
            socket.emit('leave_room', { username: user.name, roomNumber: roomInfo.chat });
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

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
            setTimeout(() => {
                const messageElements = document.querySelectorAll('.RoomMessage');
                messageElements.forEach(element => {
                    element.classList.add('Fade');
                });
            }, 200);
        });

        return () => {
            socket.off('receive_message');
        };
    }, [roomInfo.chat]);


    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            sendMessage();
        }
    };

    useEffect(() => {
        socket.emit('info_change', roomInfo);
        const isEqual = (obj1, obj2) => {
            return JSON.stringify(obj1) === JSON.stringify(obj2);
        };
        const handleInfoUpdate = (updatedInfo) => {
            if (roomInfo.user.name === user.name) {
                return;
            } else if (isEqual(updatedInfo, roomInfo)) {
                return;
            } else {
                setRoomInfo(updatedInfo);
            }
        };
        socket.on('info_update', handleInfoUpdate);
        return () => {
            socket.off('info_update');
            socket.off('info_update', handleInfoUpdate);
        };
    }, [roomInfo]);

    useEffect(() => {
        socket.emit('send_change', { username: user.name, roomNumber: roomInfo.chat, roomChange: roomChange });
    }, [roomChange]);

    useEffect(() => {
        socket.on('receive_change', ({ username, roomChange }) => {
            if (!roomChange) {
                return;
            };

            if (username === user.name) {
                return;
            };

            if (roomChange === 50) {
                const clear = Array.from({ length: 104 }, () => []);
                setRoomData(clear);
            };

            if (typeof roomChange.change === 'object' && !Array.isArray(roomChange.change)) {
                setRoomData(prevRoomData => {
                    const updatedRoomData = [...prevRoomData];
                    updatedRoomData[roomChange.tileID] = roomChange.change.tile1;
                    updatedRoomData[roomChange.tileID - 13] = roomChange.change.tile2;
                    updatedRoomData[roomChange.tileID - 12] = roomChange.change.tile3;
                    updatedRoomData[roomChange.tileID + 1] = roomChange.change.tile4;
                    return updatedRoomData
                })
            } else {
                setRoomData(prevRoomData => {
                    const updatedRoomData = [...prevRoomData];
                    updatedRoomData[roomChange.tileID] = roomChange.change;
                    return updatedRoomData;
                });
            }
        });

        return () => {
            socket.off('receive_change');
        };
    }, [roomInfo.chat]);

    return (
        <>
            <input
                maxLength={55}
                type="text"
                onChange={(event) => setMessage(event.target.value)}
                className='RoomChatInput'
                placeholder='Type your message...'
                ref={inputRef}
                autoFocus
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
