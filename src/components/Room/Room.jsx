import './Room.css';
import './Tiles.css';
import Furniture from '../../assets/data/furni.json';
import * as accountAPI from '../../../utilities/account-api';


export default function Room({ placeFurni, setPlaceFurni, currentRoom, setAccountData, setCurrentRoom }) {


    async function clearRoom() {
        try {
            await accountAPI.clearRoom();
            const updatedAccountData = await accountAPI.getAccount();
            setCurrentRoom(updatedAccountData.rooms);
            setAccountData(updatedAccountData);
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

    const handleTileClick = async (tileID) => {
        const clickedArray = currentRoom[tileID];
        console.log(`Clicked tile index: ${tileID}, Content:`, clickedArray);
        await addFurni(tileID);
    };


    return (
        <div className='RoomBox'>
            <button onClick={clearRoom} className='ClearRoomBtn'>CLEAR ROOM</button>

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
                                <div className='FurniPoint' style={{ bottom: `${innerIndex + .6}rem` }}>
                                    <img className='FurniImg' src={Furniture[value].img} />

                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}