import './Navigator.css';
import PublicActive from '../../assets/images/navigator/public-active.gif';
import RoomActive from '../../assets/images/navigator/room-active.gif';
import PublicNotActive from '../../assets/images/navigator/public-notactive.gif';
import RoomNotActive from '../../assets/images/navigator/room-notactive.gif';
import { useState } from 'react';

export default function Navigator({ navigatorDiv, setNavigatorDiv }) {

    const [currentNav, setCurrentNav] = useState('public');


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
                    <h5>Rooms</h5>
                </div>
            </div>
        </div>
    );
};