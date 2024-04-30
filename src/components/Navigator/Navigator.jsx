import './Navigator.css';
import PublicActive from '../../assets/images/navigator/public-active.gif';
import RoomActive from '../../assets/images/navigator/room-active.gif';
import PublicNotActive from '../../assets/images/navigator/public-notactive.gif';
import RoomNotActive from '../../assets/images/navigator/room-notactive.gif';
import { useState } from 'react';
import * as roomAPI from '../../../utilities/room-api';
import Key from '../../assets/images/client/key.gif';
import Plus from '../../assets/images/client/plus.gif';
import RoomIcon from '../../assets/images/client/casino_room.gif';

export default function Navigator({ user, roomList, setRoomList, setNavigatorDiv, setRoomData, setRoomInfo }) {

    const [isDragging, setIsDragging] = useState(false);
    const [initialX, setInitialX] = useState(0);
    const [initialY, setInitialY] = useState(0);
    const [currentNav, setCurrentNav] = useState(0);
    const [create, setCreate] = useState(false);
    const [roomName, setRoomName] = useState('Room');
    const [roomDescription, setRoomDescription] = useState('Description');

    //For searching friends
    const [userSearch, setUserSearch] = useState('');

    async function roomSearch() {
        try {
            const response = await roomAPI.roomSearch({ userSearch: userSearch });
            setRoomList(response);

        } catch (error) {
            console.error('Error searching user rooms', error);
        }
    };

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

    async function getUserRooms() {
        try {
            let response = await roomAPI.getUserRooms();
            setRoomList(response);
        } catch (error) {
            console.error('error creating note'.error)
        }
    };

    async function createRoom() {
        try {
            let response = await roomAPI.createRoom({ roomName: roomName, roomDescription: roomDescription, floorColor: 'brown', roomSize: 104 });
            setRoomName('');
            setRoomDescription('');
            setCreate(false);
            setRoomList(response);
        } catch (error) {
            console.error('error creating note'.error)
        }
    };

    async function getRoomData(roomID) {
        try {
            const response = await roomAPI.getRoomData(roomID);
            setRoomData(response.room);
            const { room, ...roomInfo } = response;
            setRoomInfo(roomInfo);
        } catch (error) {
            console.error('Error getting room data', error);
        }
    };


    function roomClick(roomID) {
        getRoomData(roomID);
        // setNavigatorDiv(false);
    };


    function myRoomsClick(option) {
        setCurrentNav(option);
        getUserRooms();
    };

    function publicRoomsClick(option) {
        setRoomList(null);
        setCurrentNav(option);
    }

    return (
        <div className='Navigator'
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}>
            <h4>Hotel Navigator</h4>
            <button onClick={() => setNavigatorDiv(false)} className='InventoryX'>X</button>
            <div className='RoomNav'>
                <div
                    className={`RoomOption ${currentNav === 0 ? 'active' : ''}`}
                    onClick={() => publicRoomsClick(0)}
                >
                    <img src={currentNav === 0 ? PublicActive : PublicNotActive} alt="Public Spaces" />
                    <h5>Public Spaces</h5>
                </div>
                <div
                    className={`RoomOption ${currentNav === 1 ? 'active' : ''}`}
                    onClick={() => myRoomsClick(1)}
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
                            {roomList && (
                                <ul className='RoomList'>
                                    {roomList.map((room, index) => (
                                        <li key={index} className='RoomItem' onClick={() => roomClick(room._id)}>
                                            <p>{room.roomName}</p>
                                            <p>⮕</p>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    )}

                </div>
            ) : (
                <div className='PublicRooms'>
                    <div className='RoomSearch'>
                        <input
                            placeholder='search user'
                            maxLength={24}
                            onChange={(event) => setUserSearch(event.target.value)}
                        />
                        <button onClick={roomSearch}>Search</button>
                    </div>

                    {roomList && (
                        <ul className='RoomList'>
                            {roomList.map((room, index) => (
                                <li key={index} className='RoomItem' onClick={() => roomClick(room._id)}>
                                    <p>{room.roomName}</p>
                                    <p>⮕</p>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}

        </div>
    );
};