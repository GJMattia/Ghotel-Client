import './RoomInfo.css';
import ML from '../../assets/images/client/ml.gif';
import Set from '../../assets/images/client/settings.gif';
import Window from '../../assets/images/client/window.gif';
import DM from '../../assets/images/furni-icons/club/dm_icon.gif';
import * as roomAPI from '../../../utilities/room-api';
import { useState } from 'react';
import WallData from '../../assets/data/walls.json';

export default function RoomInfo({ user, roomInfo, setRoomInfo, setRoomData, setRoomList, setSelectedFurni }) {
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

    let [wallDiv, setWallDiv] = useState(false);
    let [wall, setWall] = useState(0);

    let [settings, setSettings] = useState(false);

    async function clearRoom() {
        try {
            let room = await roomAPI.clearRoom({ roomID: roomInfo._id });
            setRoomData(room);
            setSelectedFurni(null);
        } catch (error) {
            console.error('error creating note'.error)
        }
    };

    async function deleteRoom() {
        try {
            let response = await roomAPI.deleteRoom(roomInfo._id);
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

    async function wallType() {
        try {
            let response = await roomAPI.wallType({ wallType: wall, roomID: roomInfo._id });
            const updatedRoomInfo = { ...roomInfo, wallType: response };
            setRoomInfo(updatedRoomInfo);
        } catch (error) {
            console.error('error creating note'.error)
        }
    };


    return (
        <div className='RoomInfo'>
            {user.name === roomInfo.user.name ? (
                <>
                    <img onClick={() => setSettings(!settings)} className='Set' src={Set} />
                    {settings &&
                        <div className='RoomSettings'>
                            <h4 className='BoxHeader'>Room Settings</h4>
                            <button onClick={clearRoom} className='DeleteRoom'>Clear Room</button>
                            <button onClick={deleteRoom} className='DeleteRoom'>Delete Room</button>
                        </div>
                    }

                    <img onClick={() => setWallDiv(!wallDiv)} className='Window' src={Window} />
                    {wallDiv &&
                        <div className='WallSettings'>
                            <h4 className='BoxHeader' >Select Wall</h4>

                            <ul className='WallList'>

                                {WallData.map((wallItem, index) => (
                                    <li
                                        className={`WallChoice ${wall === index ? 'WallSelect' : ''}`}
                                        key={index}
                                        onClick={() => setWall(index)}
                                    >
                                        <img src={wallItem.icon} alt={wallItem.alt} />

                                    </li>
                                ))}
                            </ul>
                            <button className='SetBtn' onClick={wallType}>Apply</button>
                        </div>
                    }
                    <img onClick={() => setMood(!mood)} className='ML' src={ML} />
                    {mood &&
                        <div className='Moodlight'>
                            <h4 className='BoxHeader' >Select color</h4>
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
                            <button className='SetBtn' onClick={roomColor}>Apply</button>
                        </div>

                    }
                </>
            ) :

                <img src={DM} className='Window' />
            }
            <h4 className='BoxHeader'>Room Info</h4>
            {/* <button className='InventoryX'>X</button> */}
            <h5>{roomInfo.roomName}</h5>
            <h5>Owner: {roomInfo.user.name}</h5>
            <p>{roomInfo.roomDescription}</p>

        </div>
    )
};