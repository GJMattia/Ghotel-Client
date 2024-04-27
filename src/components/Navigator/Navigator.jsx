import './Navigator.css';
import PublicActive from '../../assets/images/navigator/public-active.gif';
import RoomActive from '../../assets/images/navigator/room-active.gif';
import PublicNotActive from '../../assets/images/navigator/public-notactive.gif';
import RoomNotActive from '../../assets/images/navigator/room-notactive.gif';
import { useState } from 'react';
import * as accountAPI from '../../../utilities/account-api';

export default function Navigator({ setCurrentRoom, navigatorDiv, setNavigatorDiv, accountData, setAccountData }) {

    const [currentNav, setCurrentNav] = useState('rooms');

    async function createRoom() {
        try {
            await accountAPI.createRoom({ roomName: 'Room', roomDescription: 'Description here', floorColor: 'brown', roomSize: 104 });
            const updatedAccountData = await accountAPI.getAccount();
            setAccountData(updatedAccountData);
        } catch (error) {
            console.error('error creating note'.error)
        }
    };

    function handleRoomClick(index) {
        setCurrentRoom(index)
    }

    function toggleNavigator() {
        setNavigatorDiv(!navigatorDiv);
    };


    function handleRoomOptionClick(option) {
        setCurrentNav(option);
    }

    return (
        <div className='Navigator'>
            <h4>Hotel Navigator</h4>
            <button onClick={toggleNavigator} className='InventoryX'>X</button>
            <div className='RoomNav'>
                <div
                    className={`RoomOption ${currentNav === 'public' ? 'active' : ''}`}
                    onClick={() => handleRoomOptionClick('public')}
                >
                    <img src={currentNav === 'public' ? PublicActive : PublicNotActive} alt="Public Spaces" />
                    <h5>Public Spaces</h5>
                </div>
                <div
                    className={`RoomOption ${currentNav === 'rooms' ? 'active' : ''}`}
                    onClick={() => handleRoomOptionClick('rooms')}
                >
                    <img src={currentNav === 'rooms' ? RoomActive : RoomNotActive} alt="Rooms" />
                    <h5>My Rooms</h5>
                </div>
            </div>

            <button onClick={createRoom} className='CreateRoom'>Create Room</button>
            <ul className='RoomList'>


                {accountData.rooms.map((room, index) => (
                    <li key={index} className='RoomItem' onClick={() => handleRoomClick(index)}>
                        <p>{room.roomName}</p>
                        <p>#{index}</p>
                    </li>
                ))}

            </ul>
        </div>
    );
};