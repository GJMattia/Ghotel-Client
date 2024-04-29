import './Navigator.css';
import PublicActive from '../../assets/images/navigator/public-active.gif';
import RoomActive from '../../assets/images/navigator/room-active.gif';
import PublicNotActive from '../../assets/images/navigator/public-notactive.gif';
import RoomNotActive from '../../assets/images/navigator/room-notactive.gif';
import { useState } from 'react';
import * as accountAPI from '../../../utilities/account-api';
import Key from '../../assets/images/client/key.gif';
import Plus from '../../assets/images/client/plus.gif';
import RoomIcon from '../../assets/images/client/casino_room.gif';

export default function Navigator({ user, setRoomIndex, navigatorDiv, setNavigatorDiv, userRoomsList, setUserRoomsList, setRoomData, roomIndex }) {

    const [isDragging, setIsDragging] = useState(false);
    const [initialX, setInitialX] = useState(0);
    const [initialY, setInitialY] = useState(0);
    const [currentNav, setCurrentNav] = useState(1);
    const [create, setCreate] = useState(false);
    const [roomName, setRoomName] = useState('Room');
    const [roomDescription, setRoomDescription] = useState('Description');

    const handleRoomNameChange = (event) => {
        setRoomName(event.target.value);
    };

    const handleRoomDescriptionChange = (event) => {
        setRoomDescription(event.target.value);
    };

    function handleMouseDown(e) {
        setIsDragging(true);
        setInitialX(e.clientX);
        setInitialY(e.clientY);
    };

    function handleMouseUp() {
        setIsDragging(false);
    };

    function handleMouseMove(e) {
        if (isDragging) {
            const consoleElement = document.querySelector('.Navigator');
            const newX = e.clientX - initialX + consoleElement.offsetLeft;
            const newY = e.clientY - initialY + consoleElement.offsetTop;
            consoleElement.style.left = newX + 'px';
            consoleElement.style.top = newY + 'px';
            setInitialX(e.clientX);
            setInitialY(e.clientY);
        };
    };

    async function createRoom() {
        try {
            let response = await accountAPI.createRoom({ roomName: roomName, roomDescription: roomDescription, floorColor: 'brown', roomSize: 104 });
            setRoomName('');
            setRoomDescription('');
            setCreate(false);
            setUserRoomsList(response)
        } catch (error) {
            console.error('error creating note'.error)
        }
    };

    async function getRoomData(ROOM_INDEX) {
        try {
            const response = await accountAPI.getRoomData({ roomIndex: ROOM_INDEX });
            console.log(response);
            setRoomData(response)
        } catch (error) {
            console.error('Error Fetching Questions', error);
        }
    }

    function handleRoomClick(index) {
        getRoomData(index)
        setRoomIndex(index);
        // setNavigatorDiv(false);
    };

    function toggleNavigator() {
        setNavigatorDiv(!navigatorDiv);
    };


    function handleRoomOptionClick(option) {
        setCurrentNav(option);
    };

    return (
        <div className='Navigator'
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}>
            <h4>Hotel Navigator</h4>
            <button onClick={toggleNavigator} className='InventoryX'>X</button>
            <div className='RoomNav'>
                <div
                    className={`RoomOption ${currentNav === 0 ? 'active' : ''}`}
                    onClick={() => handleRoomOptionClick(0)}
                >
                    <img src={currentNav === 0 ? PublicActive : PublicNotActive} alt="Public Spaces" />
                    <h5>Public Spaces</h5>
                </div>
                <div
                    className={`RoomOption ${currentNav === 1 ? 'active' : ''}`}
                    onClick={() => handleRoomOptionClick(1)}
                >
                    <img src={currentNav === 1 ? RoomActive : RoomNotActive} alt="Rooms" />
                    <h5>My Rooms</h5>
                </div>
            </div>


            {currentNav === 1 ? (
                <div className='MyRooms'>
                    <div className='MyRoomsBtnBox'>
                        <button onClick={() => setCreate(false)} className={`MyRoomBtn ${!create ? 'MyRoomBtnActive' : ''}`}>
                            <img className='RoomBtnImg' src={Key} />My Rooms
                        </button>
                        <button onClick={() => setCreate(true)} className={`MyRoomBtn ${create ? 'MyRoomBtnActive' : ''}`}>
                            <img className='RoomBtnImg' src={Plus} />Create Room
                        </button>
                    </div>
                    {create ? (
                        <div className='CreateRoom'>
                            <h4>Room Name</h4>
                            <input
                                onChange={handleRoomNameChange}
                                maxLength="20"
                                minLength="1"
                                placeholder='room name'
                                className='RoomNameInput'
                            />
                            <h4>Room Description</h4>
                            <textarea
                                onChange={handleRoomDescriptionChange}
                                maxLength="20"
                                minLength="1"
                                placeholder='room description'
                                className='RoomDesText' />
                            <div className='CreateDiv'>
                                <img className='RoomIcon' src={RoomIcon} />
                                <button onClick={createRoom}>Create Room</button>
                            </div>
                        </div>
                    ) : (
                        <div className='MyRoomDiv'>
                            <h4>{user.name}'s Rooms</h4>
                            <ul className='RoomList'>
                                {userRoomsList.map((room, index) => (
                                    <li key={index} className='RoomItem' onClick={() => handleRoomClick(index)}>
                                        <p>{room}</p>
                                        <p>⮕</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                </div>
            ) : (
                <div className='PublicRooms'>

                </div>
            )}

        </div>
    );
};