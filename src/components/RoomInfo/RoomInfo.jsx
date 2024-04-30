import './RoomInfo.css';
import ML from '../../assets/images/client/ml.gif';
import Set from '../../assets/images/client/settings.gif';
import * as roomAPI from '../../../utilities/room-api';
import { useState } from 'react';


export default function RoomInfo({ user, roomInfo, setRoomInfo, setRoomData, setRoomList }) {
    const COLORS = [
        'black',
        'white',
        'beige',
        'orange',
        'brown',
        'red',
        'darkred',
        'dodgerblue',
        'green',
        'purple',
    ];
    let [mood, setMood] = useState(false);
    let [mlColor, setMlColor] = useState('darkred');

    async function deleteRoom() {
        try {
            let response = await roomAPI.deleteRoom(roomInfo._id);
            console.log(response);
            setRoomList(response);
            setRoomData(null);
            setRoomInfo(null);
        } catch (error) {
            console.error('error creating note'.error)
        }
    };

    async function roomColor() {
        try {
            let response = await roomAPI.roomColor({ color: mlColor, roomID: roomInfo._id });
            const updatedRoomInfo = { ...roomInfo, floorColor: response };
            setRoomInfo(updatedRoomInfo);
        } catch (error) {
            console.error('error creating note'.error)
        }
    };

    return (
        <div className='RoomInfo'>
            <img className='Set' src={Set} />
            <img onClick={() => setMood(!mood)} className='ML' src={ML} />
            {mood &&
                <div className='Moodlight'>
                    <h4>Select color</h4>
                    <ul className='MLcolors'>
                        {COLORS.map((color, index) => (
                            <li
                                className={`MLcolor ${color === mlColor ? 'MLselect' : ''}`}
                                key={index}
                                style={{ backgroundColor: color, }}
                                onClick={() => setMlColor(color)}
                            >

                            </li>
                        ))}
                    </ul>
                    <button onClick={roomColor}>Apply</button>
                </div>
            }
            <h4>Room Info</h4>
            <button className='InventoryX'>X</button>
            <h5>{roomInfo.roomName}</h5>
            <h5>Owner: {roomInfo.user.name}</h5>
            <p>{roomInfo.roomDescription}</p>
            <button onClick={deleteRoom} className='DeleteRoom'>Delete Room</button>
        </div>
    )
};