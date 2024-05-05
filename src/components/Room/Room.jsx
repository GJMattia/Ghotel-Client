import './Room.css';
import './Tiles.css';
import './Furni.css';
import './Walls.css';
import './Sprite.css';
import Furniture from '../../assets/data/furni.json';
import * as roomAPI from '../../../utilities/room-api';
import * as accountAPI from '../../../utilities/account-api';
import { useState, useEffect } from 'react';
import DevTools from '../DevTools/DevTools';
import RoomInfo from '../RoomInfo/RoomInfo';
import WallData from '../../assets/data/walls.json';
import Sprites from '../../assets/data/sprites.json';
import io from 'socket.io-client';
import Badges from '../../assets/data/badges.json';

// const socket = io.connect('http://localhost:4741');
const socket = io.connect('https://ghotel-api.onrender.com');

export default function Room({ setRoomChange, sprite, roomData, roomInfo, setRoomInfo, setInventory, setRoomData, user, pFurni, setPFurni, setUserRoomList }) {

    //Furniture Variables
    const [selectedFurni, setSelectedFurni] = useState(null);
    const [selectedTile, setSelectedTile] = useState(null);
    const [selectedFurniIndex, setSelectedFurniIndex] = useState(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [stackHeight, setStackHeight] = useState(0);

    //Sprite Variables
    const [move, setMove] = useState(true);
    const [rotate, setRotate] = useState(true);
    const [spriteHeight, setSpriteHeight] = useState(true);
    const [spriteHistory, setSpriteHistory] = useState([]);
    const [selectedSprite, setSelectedSprite] = useState(null);

    //Furniture Rules
    const PETAL_RULES = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 25, 38, 51, 64, 77, 90, 103];
    const PETAL_TILES = [47, 48, 49, 50];
    const USE_FURNI = [11, 26, 52, 58, 61, 70, 87, 88];
    // const SIT_FURNI = [0, 25, 27, 31, 54, 59, 60, 81, 91, 92];




    async function getSprite(username) {
        try {
            let response = await accountAPI.getSprite(username);
            setSelectedFurni(null);
            setSelectedSprite(response);
        } catch (error) {
            console.error('error getting sprite'.error)
        }
    };

    useEffect(() => {
        //Creates the users sprite
        const userSprite = document.getElementById(user.name);
        if (!userSprite) {
            createSprite('tile_8', user.name, sprite, 0, false);
        } else {
            const tile = document.getElementById('tile_8');
            tile.appendChild(userSprite);
        };

        //automatically places player sprite in user room
        socket.emit('add_sprite', { username: user.name, roomNumber: roomInfo.chat, spriteID: sprite, tileID: 8, height: 0, rotation: false });

        const spriteData = (data) => {
            if (spriteHistory) {
                spriteHistory.forEach(sprite => {
                    let remove = document.getElementById(sprite);
                    if (remove) {
                        remove.remove();
                    }
                })
            };

            data.forEach(sprite => {
                if (sprite.username !== user.name) {
                    setSpriteHistory(prevHistory => [...prevHistory, sprite.username]);
                    createSprite(`tile_${sprite.tileID}`, sprite.username, sprite.spriteID, sprite.height);
                }
            });
        };

        const spriteLeft = ({ username }) => {

            const remove = document.getElementById(username); // Find sprite by username
            if (remove) {
                remove.remove(); // Remove the sprite from the DOM
            };
        };

        const moveSprite = ({ username, tileID }) => {
            if (username !== user.name) {
                const tile = document.getElementById(`tile_${tileID}`);
                const sprite = document.getElementById(`${username}`);
                tile.appendChild(sprite);
            }
        };

        const heightSprite = ({ username, height }) => {
            if (username !== user.name) {
                const spriteAnchor = document.getElementById(`${username}`);
                const spritePoint = spriteAnchor.querySelector('.SpritePoint');
                spritePoint.style.bottom = `${height}rem`;
            };
        };
        const rotateSprite = ({ username, rotation }) => {
            if (username !== user.name) {
                const spriteAnchor = document.getElementById(`${username}`);
                const spritePoint = spriteAnchor.querySelector('.SpritePoint');
                const sprite = spritePoint.querySelector('.Sprite');
                sprite.classList.toggle('Rotate', rotation);
            };
        };

        socket.on('move3_sprite', rotateSprite);
        socket.on('move2_sprite', heightSprite);
        socket.on('move1_sprite', moveSprite);
        socket.on('sprite_data', spriteData);
        socket.on('sprite_left', spriteLeft);
        return () => {
            socket.off('move3_sprite', rotateSprite);
            socket.off('move2_sprite', heightSprite)
            socket.off('move_sprite', moveSprite)
            socket.off('sprite_data', spriteData);
            socket.off('sprite_left', spriteLeft);
            socket.emit('leave_sprite', { username: user.name, roomNumber: roomInfo.chat });
        };

    }, [roomInfo.chat]);

    useEffect(() => {
        const handleBeforeUnload = () => {
            socket.emit('leave_sprite', { username: user.name, roomNumber: roomInfo.chat });
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);


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
            setRoomChange({ change: response.tile, tileID: response.tileID });
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
            setRoomChange({ change: response.tile, tileID: response.tileID })
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
            setRoomChange({ change: response.tile, tileID: response.tileID })
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

                setRoomChange({ change: response, tileID: tileID })
                setRoomData(updatedRoomData);
            } else {
                const updatedRoomData = [...roomData];
                updatedRoomData[tileID] = response;
                setRoomData(updatedRoomData);
                setRoomChange({ change: response, tileID: tileID })

            }
        } catch (error) {
            console.error('error placing furni'.error)
        };
    };

    const handleTileClick = async (tileID) => {
        const clickedArray = roomData[tileID];
        // console.log(`Tile #${tileID}`, clickedArray);

        const tile = document.getElementById(`tile_${tileID}`);

        if (move && !pFurni) {
            const userSprite = document.getElementById(`${user.name}`);
            tile.appendChild(userSprite);
            socket.emit('move_sprite', { username: user.name, roomNumber: roomInfo.chat, tileID: tileID });
        };



        if (pFurni === null) {
            return;
        } else {
            await placeFurni(tileID);
        }
    };

    const createSprite = (tileID, username, spriteID, height, rotation) => {
        const tile = document.getElementById(tileID);
        const spriteAnchor = document.createElement('div');
        spriteAnchor.className = 'SpriteAnchor';
        spriteAnchor.id = username;
        const spritePoint = document.createElement('div');
        spritePoint.className = 'SpritePoint';
        spritePoint.style.bottom = `${height}rem`;
        const img = document.createElement('img');
        img.className = 'Sprite';
        img.src = Sprites[spriteID].stand;
        rotation ? img.classList.add('Rotate') : null;

        spritePoint.addEventListener('click', () => {
            getSprite(username);
        });

        spritePoint.appendChild(img);
        spriteAnchor.appendChild(spritePoint);
        tile.appendChild(spriteAnchor);
    };

    const handleClick = (value, index, innerIndex) => {
        setSelectedSprite(null);
        setSelectedFurniIndex(innerIndex);
        setSelectedTile(index);
        setSelectedFurni(value);

        if (!move) {
            if (spriteHeight) {
                const spriteAnchor = document.getElementById(`${user.name}`);
                const spritePoint = spriteAnchor.querySelector('.SpritePoint');
                spritePoint.style.bottom = `${roomData[index][innerIndex].height}rem`;
                let height = roomData[index][innerIndex].height;
                socket.emit('height_sprite', { username: user.name, roomNumber: roomInfo.chat, height: height });
            } else return;
        }
    };

    function rotateSprite() {
        const spriteAnchor = document.getElementById(`${user.name}`);
        const spritePoint = spriteAnchor.querySelector('.SpritePoint');
        const sprite = spritePoint.querySelector('.Sprite');


        sprite.classList.toggle('Rotate', rotate);
        socket.emit('rotate_sprite', { username: user.name, roomNumber: roomInfo.chat, rotation: rotate });
        setRotate(!rotate);
    };

    return (
        <div className='RoomBox'>

            <div className='SpriteTool'>
                <h4 className='BoxHeader'>Sprite Tool</h4>
                <button className={move ? 'Freeze' : 'Unfreeze'} onClick={() => setMove(!move)}>{move ? 'Freeze Sprite XY' : 'Unfreeze Sprite XY'}</button>
                <button className={spriteHeight ? 'Freeze' : 'Unfreeze'} onClick={() => setSpriteHeight(!spriteHeight)}>{spriteHeight ? 'Freeze Sprite Z' : 'Unfreeze Sprite Z'}</button>
                <button className='RotateBtn' onClick={rotateSprite}>Rotate Sprite</button>
            </div>

            <div onClick={() => setPFurni(null)} className='AntiFurni'></div>

            {user.name === roomInfo.user.name ? (
                <DevTools roomInfo={roomInfo} setSelectedFurni={setSelectedFurni} setStackHeight={setStackHeight} stackHeight={stackHeight} setRoomData={setRoomData} setInventory={setInventory} />
            ) : null}
            <RoomInfo setRoomChange={setRoomChange} setSelectedFurni={setSelectedFurni} setUserRoomList={setUserRoomList} user={user} roomInfo={roomInfo} setRoomInfo={setRoomInfo} setRoomData={setRoomData} />
            <img className={`Wall Wall${roomInfo.wallType} `} src={WallData[roomInfo.wallType].img} />
            {pFurni !== null && (
                <img
                    src={Furniture[pFurni].img}
                    alt="Throne"
                    className="follow-cursor"
                    style={{ left: position.x, top: position.y }}
                />
            )}

            {selectedSprite && (
                <div className='SpriteSelection'>
                    <div className='SpriteSelectionSprite'>
                        <button onClick={() => setSelectedSprite(null)} className='FurniSelectionX'>x</button>
                        <p className='FurniSelectionFurniName'>{selectedSprite.username}</p>

                        <div className='SpriteInfo'>
                            <div className='SpriteImgDiv'>
                                <img src={Sprites[selectedSprite.sprite].stand} draggable="false" />
                            </div>
                            <div className='BadgeShowcase'>

                                {selectedSprite.badges.map((badge, index) => (
                                    <img key={index} src={Badges[badge].img} draggable="false" />
                                ))}


                            </div>
                        </div>
                        <p className='SpriteMotto'>{selectedSprite.motto}</p>
                    </div>

                    <button className='BetBtn'>Bet {selectedSprite.username}</button>
                </div>
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