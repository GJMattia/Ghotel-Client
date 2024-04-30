import './Room.css';
import './Tiles.css';
import './Furni.css';
import Furniture from '../../assets/data/furni.json';
import * as roomAPI from '../../../utilities/room-api';
import { useState, useEffect } from 'react';
import DevTools from '../DevTools/DevTools';
import RoomInfo from '../RoomInfo/RoomInfo';


export default function Room({ roomData, roomInfo, setRoomInfo, setInventory, setRoomData, user, pFurni, setPFurni, setRoomList }) {

    const [selectedFurni, setSelectedFurni] = useState(null);
    const [selectedTile, setSelectedTile] = useState(null);
    const [selectedFurniIndex, setSelectedFurniIndex] = useState(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [stackHeight, setStackHeight] = useState(0);

    const PETAL_RULES = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 25, 38, 51, 64, 77, 90, 103];
    const PETAL_TILES = [47, 48, 49, 50];
    const USE_FURNI = [11, 58, 61];

    useEffect(() => {
        const handleMouseMove = (e) => {
            setPosition({ x: e.clientX, y: e.clientY });
        };
        document.addEventListener('mousemove', handleMouseMove);
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    async function useFurni() {
        if (selectedFurni === null || selectedTile === null || selectedFurniIndex === null) {
            return
        };
        if (!USE_FURNI.includes(selectedFurni)) {
            return;
        };
        try {
            let response = await roomAPI.useFurni({ furniID: selectedFurni, tileID: selectedTile, furniIndex: selectedFurniIndex, roomID: roomInfo._id });
            const updatedRoomData = [...roomData];
            updatedRoomData[response.tileID] = response.tile;
            setRoomData(updatedRoomData);
        } catch (error) {
            console.error('error creating note'.error)
        }
    };

    async function rotateFurni() {
        if (selectedFurni === null || selectedTile === null || selectedFurniIndex === null) {
            return
        };
        try {
            let response = await roomAPI.rotateFurni({ furniID: selectedFurni, tileID: selectedTile, furniIndex: selectedFurniIndex, roomID: roomInfo._id });
            const updatedRoomData = [...roomData];
            updatedRoomData[response.tileID] = response.tile;
            setRoomData(updatedRoomData);
        } catch (error) {
            console.error('error creating note'.error)
        }
    };

    async function pickFurni() {
        if (selectedFurni === null || selectedTile === null || selectedFurniIndex === null) {
            return;
        };
        try {
            let response = await roomAPI.pickFurni({ furniID: selectedFurni, tileID: selectedTile, furniIndex: selectedFurniIndex, roomID: roomInfo._id });
            const updatedRoomData = [...roomData];
            updatedRoomData[response.tileID] = response.tile;
            setRoomData(updatedRoomData);
            setSelectedFurni(null);
        } catch (error) {
            console.error('error creating note'.error)
        }
    };

    async function placeFurni(tileID) {


        try {
            if (pFurni === null) {
                return;
            };
            if (pFurni === 1 && PETAL_RULES.includes(tileID)) {
                return;
            };
            let response = await roomAPI.placeFurni({ furniID: pFurni, tileID: tileID, furniHeight: stackHeight, roomID: roomInfo._id });

            if (pFurni === 1) {
                console.log(response)
                const updatedRoomData = [...roomData];
                updatedRoomData[tileID] = response.tile1;
                updatedRoomData[tileID - 13] = response.tile2;
                updatedRoomData[tileID - 12] = response.tile3;
                updatedRoomData[tileID + 1] = response.tile4;
                setRoomData(updatedRoomData);
            } else {
                const updatedRoomData = [...roomData];
                updatedRoomData[tileID] = response;
                setRoomData(updatedRoomData);
            }
        } catch (error) {
            console.error('error placing furni'.error)
        };
    };

    const handleTileClick = async (tileID) => {
        const clickedArray = roomData[tileID];
        console.log(`Clicked tile index: ${tileID}, Content:`, clickedArray);
        await placeFurni(tileID);
    };

    const handleClick = (value, index, innerIndex) => {
        setSelectedFurniIndex(innerIndex);
        setSelectedTile(index);
        setSelectedFurni(value);
    }

    return (
        <div className='RoomBox'>
            <DevTools roomInfo={roomInfo} setSelectedFurni={setSelectedFurni} setStackHeight={setStackHeight} stackHeight={stackHeight} setRoomData={setRoomData} setInventory={setInventory} setPFurni={setPFurni} />
            <RoomInfo setRoomList={setRoomList} user={user} roomInfo={roomInfo} setRoomInfo={setRoomInfo} setRoomData={setRoomData} />
            {pFurni !== null && (
                <img
                    src={Furniture[pFurni].img}
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
                        <li onClick={pickFurni}>Pick Up</li>
                        <li onClick={useFurni}>Use</li>
                    </ul>


                </div>
            )}

            <div className='Room' style={{ backgroundColor: roomInfo.floorColor }}>
                {roomData.map((tile, index) => (
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