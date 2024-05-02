import './Room.css';
import './Tiles.css';
import './Furni.css';
import './Walls.css';
import './Sprite.css';
import Furniture from '../../assets/data/furni.json';
import * as roomAPI from '../../../utilities/room-api';
import { useState, useEffect } from 'react';
import DevTools from '../DevTools/DevTools';
import RoomInfo from '../RoomInfo/RoomInfo';
import WallData from '../../assets/data/walls.json';
import Sprites from '../../assets/data/sprites.json';

export default function Room({ sprite, roomData, roomInfo, setRoomInfo, setInventory, setRoomData, user, pFurni, setPFurni, setRoomList }) {

    const [selectedFurni, setSelectedFurni] = useState(null);
    const [selectedTile, setSelectedTile] = useState(null);
    const [selectedFurniIndex, setSelectedFurniIndex] = useState(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [stackHeight, setStackHeight] = useState(0);

    const [move, setMove] = useState(true);
    const [rotate, setRotate] = useState(true);
    const [sit, setSit] = useState(false);
    const [spriteHeight, setSpriteHeight] = useState(true);

    const PETAL_RULES = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 25, 38, 51, 64, 77, 90, 103];
    const PETAL_TILES = [47, 48, 49, 50];
    const USE_FURNI = [11, 52, 58, 61, 70, 87, 88];
    const SIT_FURNI = [0, 25, 27, 31, 54, 59, 60, 81, 91, 92];

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
            if (pFurni === 1 && PETAL_RULES.includes(tileID)) {
                return;
            };
            let response = await roomAPI.placeFurni({ furniID: pFurni, tileID: tileID, furniHeight: stackHeight, roomID: roomInfo._id });
            if (pFurni === 1) {
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
        console.log(`Tile #${tileID}`, clickedArray);
        const tile = document.getElementById(`tile_${tileID}`);
        if (move) {
            const previousTile = document.querySelector('.SpriteAnchor');
            if (previousTile) {
                previousTile.parentNode.removeChild(previousTile);
            };
            const spriteAnchor = document.createElement('div');
            spriteAnchor.className = 'SpriteAnchor';
            const spritePoint = document.createElement('div');
            spritePoint.className = 'SpritePoint';
            const img = document.createElement('img');
            img.className = 'Sprite';
            img.src = sit ? Sprites[sprite].sit : Sprites[sprite].stand;
            spritePoint.appendChild(img);
            spriteAnchor.appendChild(spritePoint);
            tile.appendChild(spriteAnchor);
            // spritePoint.style.bottom = `1rem`;
        }
        if (pFurni === null) {
            return;
        } else {
            await placeFurni(tileID);
        }
    };

    const handleClick = (value, index, innerIndex) => {
        if (move) {
            if (SIT_FURNI.includes(value)) {
                setSit(true)
            } else {
                setSit(false);
            }
        };

        setSelectedFurniIndex(innerIndex);
        setSelectedTile(index);
        setSelectedFurni(value);

        if (!move) {
            if (spriteHeight) {
                const spritePoint = document.querySelector('.SpritePoint');
                spritePoint.style.bottom = `${roomData[index][innerIndex].height + 1}rem`;
            } else return;
        }
    };

    function rotateSprite() {
        const spritePoint = document.querySelector('.Sprite');
        if (rotate) {
            spritePoint.style.transform = 'scaleX(-1)';
            setRotate(false);
        } else {
            spritePoint.style.transform = 'scaleX(1)';
            setRotate(true);
        }
    };

    return (
        <div className='RoomBox'>

            <div className='SpriteTool'>
                <h4 className='BoxHeader'>Sprite Tool</h4>
                <button onClick={() => setMove(!move)}>{move ? 'freeze move' : 'set move'}</button>
                <button onClick={() => setSpriteHeight(!spriteHeight)}>{spriteHeight ? 'freeze height' : 'set height'}</button>
                <button onClick={rotateSprite}>rotate sprite</button>
            </div>

            <div onClick={() => setPFurni(null)} className='AntiFurni'></div>


            {user.name === roomInfo.user.name ? (
                <DevTools roomInfo={roomInfo} setSelectedFurni={setSelectedFurni} setStackHeight={setStackHeight} stackHeight={stackHeight} setRoomData={setRoomData} setInventory={setInventory} />
            ) : null}
            <RoomInfo setSelectedFurni={setSelectedFurni} setRoomList={setRoomList} user={user} roomInfo={roomInfo} setRoomInfo={setRoomInfo} setRoomData={setRoomData} />
            <img className={`Wall Wall${roomInfo.wallType} `} src={WallData[roomInfo.wallType].img} />
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
                    <div className='FurniSelectionFurni'>
                        <button onClick={() => setSelectedFurni(null)} className='FurniSelectionX'>x</button>
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
                        {user.name === roomInfo.user.name ? (
                            <li onClick={pickFurni}>Pick Up</li>
                        ) : null}
                        <li onClick={useFurni}>Use</li>
                    </ul>

                </div>
            )}
            <div className='Room' style={{ backgroundColor: roomInfo.floorColor }}>
                {roomData.map((tile, index) => (
                    <div
                        key={index}
                        id={`tile_${index}`}
                        index={index}
                        className={`Tile T${index} `}
                        onClick={() => handleTileClick(index)}
                    >
                        {tile.map((item, innerIndex) => (
                            <div key={innerIndex} className="FurniAnchor"  >
                                <div className='FurniPoint'
                                    style={{ bottom: `${item.height + .6}rem` }}
                                    onClick={() => handleClick(item.furniID, index, innerIndex)}
                                >
                                    <img
                                        className={`FurniImg Furni${item.furniID} ${item.rotation ? 'Rotate' : ''} `}
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