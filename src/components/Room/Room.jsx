import './Room.css';
import './Tiles.css';
import './Furni.css';
import Furniture from '../../assets/data/furni.json';
import * as accountAPI from '../../../utilities/account-api';
import { useState, useEffect } from 'react';
import Set from '../../assets/images/client/settings.gif';
import ML from '../../assets/images/client/ml.gif';
import DevTools from '../DevTools/DevTools';


export default function Room({ setInventory, roomData, setRoomData, user, placeFurni, setPlaceFurni, roomIndex, setRoomIndex, setUserRoomsList }) {

    const [selectedFurni, setSelectedFurni] = useState(null);
    const [selectedTile, setSelectedTile] = useState(null);
    const [selectedFurniIndex, setSelectedFurniIndex] = useState(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [stackHeight, setStackHeight] = useState(0);

    const PETAL_RULES = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 25, 38, 51, 64, 77, 90, 103];
    const PETAL_TILES = [47, 48, 49, 50];

    useEffect(() => {
        const handleMouseMove = (e) => {
            setPosition({ x: e.clientX, y: e.clientY });
        };
        document.addEventListener('mousemove', handleMouseMove);
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    async function roomColor() {
        try {
            let updatedRoom = await accountAPI.roomColor({ roomIndex: roomIndex });
            setRoomData(updatedRoom);
        } catch (error) {
            console.error('error creating note'.error)
        }
    };

    async function deleteRoom() {
        try {
            let response = await accountAPI.deleteRoom({ roomIndex: roomIndex });
            setRoomIndex(null);
            setRoomData(null);
            setUserRoomsList(response);
        } catch (error) {
            console.error('error creating note'.error)
        }
    };

    async function useFurni() {
        let useFurnis = [11, 58, 61]
        if (selectedFurni === null || selectedTile === null || selectedFurniIndex === null) {
            return
        };
        if (!useFurnis.includes(selectedFurni)) {
            return;
        };

        try {
            let room = await accountAPI.useFurni({ furniID: selectedFurni, tileID: selectedTile, furniIndex: selectedFurniIndex, roomIndex: roomIndex });
            setRoomData(room);
        } catch (error) {
            console.error('error creating note'.error)
        }
    };

    async function rotateFurni() {
        if (selectedFurni === null || selectedTile === null || selectedFurniIndex === null) {
            return
        };
        try {
            let room = await accountAPI.rotateFurni({ furniID: selectedFurni, tileID: selectedTile, furniIndex: selectedFurniIndex, roomIndex: roomIndex });
            setRoomData(room)
        } catch (error) {
            console.error('error creating note'.error)
        }
    };

    async function pickUpFurni() {
        if (selectedFurni === null || selectedTile === null || selectedFurniIndex === null) {
            return;
        };
        try {
            let response = await accountAPI.pickUpFurni({ furniID: selectedFurni, tileID: selectedTile, furniIndex: selectedFurniIndex, roomIndex: roomIndex });
            setRoomData(response.room);
            setInventory(response.inventory);
            setSelectedFurni(null);
        } catch (error) {
            console.error('error creating note'.error)
        }
    };

    async function PlaceFurni(tileID) {
        try {
            if (placeFurni === null) {
                return;
            };
            if (placeFurni === 1 && PETAL_RULES.includes(tileID)) {
                return;
            };

            let response = await accountAPI.placeFurni({ furniID: placeFurni, tileID: tileID, roomIndex: roomIndex, furniHeight: stackHeight });
            setRoomData(response.room);
            setInventory(prevInventory => {
                const newInventory = response.inventory;
                if (!newInventory.includes(placeFurni)) {
                    setPlaceFurni(null);
                }
                return newInventory;
            });
        } catch (error) {
            console.error('error placing furni'.error)
        };
    };

    const handleTileClick = async (tileID) => {
        const clickedArray = roomData.room[tileID];
        console.log(`Clicked tile index: ${tileID}, Content:`, clickedArray);
        await PlaceFurni(tileID);
    };

    const handleClick = (value, index, innerIndex) => {
        setSelectedFurniIndex(innerIndex);
        setSelectedTile(index);
        setSelectedFurni(value);
    }

    return (
        <div className='RoomBox'>
            <DevTools setSelectedFurni={setSelectedFurni} setStackHeight={setStackHeight} stackHeight={stackHeight} setRoomData={setRoomData} roomIndex={roomIndex} setInventory={setInventory} setPlaceFurni={setPlaceFurni} />

            <div className='RoomInfo'>
                <img className='Set' src={Set} />
                <img onClick={roomColor} className='ML' src={ML} />
                <h4>Room Info</h4>
                <button className='InventoryX'>X</button>
                <h5>{roomData.roomName}</h5>
                <h5>Owner: {user.name}</h5>
                <p>{roomData.roomDescription}</p>
                <button onClick={deleteRoom} className='DeleteRoom'>Delete Room</button>
            </div>
            {placeFurni !== null && (
                <img
                    src={Furniture[placeFurni].img}
                    alt="Throne"
                    className="follow-cursor"
                    style={{ left: position.x, top: position.y }}
                />
            )}

            {selectedFurni !== null && (
                <div className='FurniSelection'>
                    <button onClick={() => setSelectedFurni(null)} className='FurniSelectionX'>x</button>
                    <div className='FurniSelectionFurni'>
                        <p className='FurniSelectionFurniName'>{Furniture[selectedFurni].name}</p>
                        <img
                            className='FurniSelectionImg'
                            src={PETAL_TILES.includes(selectedFurni) ? Furniture[1].img : Furniture[selectedFurni].img}
                        />

                        <p className='FurniSelectionFurniMotto'>{Furniture[selectedFurni].description}</p>
                    </div>
                    <ul className='FurniSelectionOptions'>
                        <li>Move</li>
                        <li onClick={rotateFurni}>Rotate</li>
                        <li onClick={pickUpFurni}>Pick Up</li>
                        <li onClick={useFurni}>Use</li>
                    </ul>
                </div>
            )}

            <div className='Room' style={{ backgroundColor: roomData.floorColor }}>
                {roomData.room.map((tile, index) => (
                    <div
                        key={index}
                        index={index}
                        className={`Tile T${index}`}
                        onClick={() => handleTileClick(index)}
                    >

                        {tile.map((item, innerIndex) => (
                            <div key={innerIndex} className="FurniAnchor"  >

                                <div className='FurniPoint'
                                    style={{ bottom: `${item.height + .6}rem` }}
                                    onClick={() => handleClick(item.furniID, index, innerIndex)}
                                >
                                    <img
                                        className={`FurniImg Furni${item.furniID} ${item.rotation ? 'Rotate' : ''}`}
                                        src={item.state ? Furniture[item.furniID].on : Furniture[item.furniID].img}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
};