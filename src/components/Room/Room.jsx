import './Room.css';
import './Tiles.css';
import './Furni.css';
import Furniture from '../../assets/data/furni.json';
import * as accountAPI from '../../../utilities/account-api';
import { useState, useEffect } from 'react';


export default function Room({ user, placeFurni, setPlaceFurni, currentRoom, setAccountData, setCurrentRoom, accountData }) {

    const [selectedFurni, setSelectedFurni] = useState(null);
    const [selectedTile, setSelectedTile] = useState(null);
    const [selectedFurniIndex, setSelectedFurniIndex] = useState(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [stackHeight, setStackHeight] = useState(0);
    const [stackMult, setStackMult] = useState(1);

    let PETAL_RULES = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 25, 38, 51, 64, 77, 90, 103];
    useEffect(() => {
        const handleMouseMove = (e) => {
            setPosition({ x: e.clientX, y: e.clientY });
        };
        document.addEventListener('mousemove', handleMouseMove);
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    const handleStackClick = (height) => {
        setStackHeight(height * stackMult);
    };

    const incrementCounter = () => {
        setStackMult(prevStackMult => prevStackMult + 1);
    };

    const decrementCounter = () => {
        if (stackMult > 0) {
            setStackMult(prevStackMult => prevStackMult - 1);
        }
    };

    async function clearRoom() {
        try {
            await accountAPI.clearRoom({ roomIndex: currentRoom, roomSize: 104 });
            const updatedAccountData = await accountAPI.getAccount();
            setAccountData(updatedAccountData);
        } catch (error) {
            console.error('error creating note'.error)
        }
    };

    async function pickUpFurni() {
        if (selectedFurni === null || selectedTile === null || selectedFurniIndex === null) {
            return
        };
        try {
            await accountAPI.pickUpFurni({ furniID: selectedFurni, tileID: selectedTile, furniIndex: selectedFurniIndex, roomIndex: currentRoom });
            const updatedAccountData = await accountAPI.getAccount();
            setAccountData(updatedAccountData);
            setSelectedFurni(null);
        } catch (error) {
            console.error('error creating note'.error)
        }
    }

    async function PlaceFurni(tileID) {
        try {
            if (placeFurni === null) {
                return;
            };
            if (placeFurni === 1 && PETAL_RULES.includes(tileID)) {
                return;
            };

            await accountAPI.placeFurni({ furniID: placeFurni, tileID: tileID, roomIndex: currentRoom, furniHeight: stackHeight });
            const updatedAccountData = await accountAPI.getAccount();
            setAccountData(updatedAccountData);
            setPlaceFurni(null);
        } catch (error) {
            console.error('error creating note'.error)
        }
    };

    function xOutFurni() {
        setSelectedFurni(null);
    };

    const handleTileClick = async (tileID) => {
        const clickedArray = accountData.rooms[currentRoom].room[tileID];
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
            <button onClick={clearRoom} className='ClearRoomBtn'>CLEAR ROOM</button>
            <div className='StackTool'>
                <h4>Jawn's Stack Tool</h4>
                <div className='StackChoices'>
                    <div className='StackChoice'>
                        <button className='StackBtn' onClick={() => handleStackClick(1)}>Apply</button>
                        <img className='StackImg' src={Furniture[46].icon} />
                    </div>
                </div>
                <div className='StackMult'>

                    <button className='StackDec' onClick={decrementCounter}>-</button>
                    <p>x{stackMult}</p>
                    <button className='StackInc' onClick={incrementCounter}>+</button>
                </div>
            </div>
            <div className='RoomInfo'>
                <h4>Room Info</h4>
                <button className='InventoryX'>X</button>
                <h5>{accountData.rooms[currentRoom].roomName} #{currentRoom}</h5>
                <p>Owner: {user.name}</p>
                <p>{accountData.rooms[currentRoom].roomDescription}</p>
                <img src={Furniture[26].icon} />
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
                    <button onClick={xOutFurni} className='FurniSelectionX'>x</button>
                    <div className='FurniSelectionFurni'>
                        <p className='FurniSelectionFurniName'>{Furniture[selectedFurni].name}</p>
                        <img
                            className='FurniSelectionImg'
                            src={selectedFurni === 47 ? Furniture[selectedFurni].img2 : Furniture[selectedFurni].img}
                        />

                        <p className='FurniSelectionFurniMotto'>{Furniture[selectedFurni].description}</p>
                    </div>
                    <ul className='FurniSelectionOptions'>
                        <li>Move</li>
                        <li>Rotate</li>
                        <li onClick={pickUpFurni}>Pick Up</li>
                        <li>Use</li>
                    </ul>
                </div>
            )}

            <div className='Room'>
                {accountData.rooms[currentRoom].room.map((tile, index) => (
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
                                    <img className={`FurniImg Furni${item.furniID}`} src={Furniture[item.furniID].img} />


                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
};