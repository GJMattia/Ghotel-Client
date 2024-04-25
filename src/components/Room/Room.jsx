import './Room.css';
import './Tiles.css';
import Furniture from '../../assets/data/furni.json';
import * as accountAPI from '../../../utilities/account-api';
import { useState } from 'react';

export default function Room({ placeFurni, setPlaceFurni, currentRoom, setAccountData, setCurrentRoom }) {

    const [selectedFurni, setSelectedFurni] = useState(null);
    const [selectedTile, setSelectedTile] = useState(null);
    const [selectedFurniIndex, setSelectedFurniIndex] = useState(null);


    async function clearRoom() {
        try {
            await accountAPI.clearRoom();
            const updatedAccountData = await accountAPI.getAccount();
            setCurrentRoom(updatedAccountData.rooms);
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
            await accountAPI.pickUpFurni({ furniID: selectedFurni, tileID: selectedTile, furniIndex: selectedFurniIndex });
            const updatedAccountData = await accountAPI.getAccount();
            setCurrentRoom(updatedAccountData.rooms);
            setAccountData(updatedAccountData);
            setSelectedFurni(null);
        } catch (error) {
            console.error('error creating note'.error)
        }
    }

    async function addFurni(tileID) {
        try {
            if (placeFurni === null) {
                return;
            }
            await accountAPI.addFurni({ furniID: placeFurni, tileID: tileID });
            const updatedAccountData = await accountAPI.getAccount();
            setAccountData(updatedAccountData);
            setCurrentRoom(updatedAccountData.rooms);
            setPlaceFurni(null);
        } catch (error) {
            console.error('error creating note'.error)
        }
    };

    function xOutFurni() {
        setSelectedFurni(null);
    };

    const handleTileClick = async (tileID) => {
        const clickedArray = currentRoom[tileID];
        console.log(`Clicked tile index: ${tileID}, Content:`, clickedArray);
        await addFurni(tileID);
    };

    const handleClick = (value, index, innerIndex) => {
        setSelectedFurniIndex(innerIndex);
        setSelectedTile(index);
        setSelectedFurni(value);
    }


    return (
        <div className='RoomBox'>
            <button onClick={clearRoom} className='ClearRoomBtn'>CLEAR ROOM</button>


            {selectedFurni !== null && (
                <div className='FurniSelection'>
                    <button onClick={xOutFurni} className='FurniSelectionX'>x</button>
                    <div className='FurniSelectionFurni'>
                        <p className='FurniSelectionFurniName'>{Furniture[selectedFurni].name}</p>
                        <img className='FurniSelectionImg' src={Furniture[selectedFurni].img} />
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
                {currentRoom.map((tile, index) => (
                    <div
                        key={index}
                        index={index}
                        className={`Tile T${index}`}
                        onClick={() => handleTileClick(index)}
                    >
                        {tile.map((value, innerIndex) => (
                            <div key={innerIndex} className="FurniAnchor"  >
                                <div className='FurniPoint'
                                    style={{ bottom: `${innerIndex + .6}rem` }}
                                    onClick={() => handleClick(value, index, innerIndex)}
                                >
                                    <img className='FurniImg' src={Furniture[value].img} />

                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
};