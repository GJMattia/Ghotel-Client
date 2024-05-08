import './Client.css';
import { useState, useEffect } from 'react';
import ClientNav from '../ClientNav/ClientNav';
import Console from '../Console/Console';
import Chat from '../Chat/Chat';
import Catalog from '../Catalog/Catalog';
import Inventory from '../Inventory/Inventory';
import Navigator from '../Navigator/Navigator';
import Settings from '../Settings/Settings';
import * as accountAPI from '../../../utilities/account-api';
import * as roomAPI from '../../../utilities/room-api';
import Credits from '../../assets/images/client/credits-icon.png';
import Room from '../Room/Room';
import RoomSocket from '../RoomSocket/RoomSocket';

export default function Client({ user }) {

    //Account info grab
    const [account, setAccount] = useState(false);

    //Navbar elements
    const [consoleDiv, setConsoleDiv] = useState(false);
    const [chatDiv, setChatDiv] = useState(false);
    const [catalogDiv, setCatalogDiv] = useState(false);
    const [inventoryDiv, setInventoryDiv] = useState(false);
    const [navigatorDiv, setNavigatorDiv] = useState(false);
    const [settingsDiv, setSettingsDiv] = useState(false);

    //chat elements
    const [room, setRoom] = useState(null);
    const [usersMessaged, setUsersMessaged] = useState([]);

    //room variables
    const [pFurni, setPFurni] = useState(null);

    //account data
    const [inventory, setInventory] = useState(null);
    const [credits, setCredits] = useState(null);

    //Room Data
    const [userRoomList, setUserRoomList] = useState(null);
    const [roomList, setRoomList] = useState(null);
    const [roomData, setRoomData] = useState(null);
    const [roomInfo, setRoomInfo] = useState(null);

    //sprite
    const [sprite, setSprite] = useState(null);
    const [badges, setBadges] = useState(null);

    //Socket Stuff
    const [roomChange, setRoomChange] = useState(null);


    useEffect(function () {
        async function getAccountData() {
            try {
                const response = await accountAPI.getAccount();
                const userRooms = await roomAPI.getUserRooms();
                setUserRoomList(userRooms);
                setCredits(response.credits);
                setInventory(response.inventory);
                setSprite(response.sprite);
                setBadges(response.badges)
                setAccount(true);
            } catch (error) {
                console.error('Error Fetching Questions', error);
            }
        }
        getAccountData();
    }, []);

    return (
        <div className='Client'>
            {account ? (
                <>
                    <div className='ClientHeader'>
                        <img src={Credits} />
                        <p>{credits}</p>
                    </div>

                    {(roomData) && <RoomSocket credits={credits} setCredits={setCredits} user={user} roomInfo={roomInfo} roomChange={roomChange} setRoomData={setRoomData} setRoomInfo={setRoomInfo} />}

                    {(roomData) && <Room credits={credits} setCredits={setCredits} setRoomChange={setRoomChange} sprite={sprite} setUserRoomList={setUserRoomList} setInventory={setInventory} roomInfo={roomInfo} setRoomInfo={setRoomInfo} roomData={roomData} setRoomData={setRoomData} user={user} pFurni={pFurni} setPFurni={setPFurni} />}

                    {navigatorDiv && <Navigator userRoomList={userRoomList} setUserRoomList={setUserRoomList} roomList={roomList} setRoomInfo={setRoomInfo} setRoomList={setRoomList} setRoomData={setRoomData} user={user} setNavigatorDiv={setNavigatorDiv} />}

                    {catalogDiv && <Catalog setInventory={setInventory} credits={credits} setCredits={setCredits} catalogDiv={catalogDiv} setCatalogDiv={setCatalogDiv} />}

                    <Inventory user={user} roomInfo={roomInfo} roomData={roomData} inventory={inventory} setCatalogDiv={setCatalogDiv} pFurni={pFurni} setPFurni={setPFurni} inventoryDiv={inventoryDiv} setInventoryDiv={setInventoryDiv} />

                    {consoleDiv && <Console user={user} setChatDiv={setChatDiv} setRoom={setRoom} consoleDiv={consoleDiv} setConsoleDiv={setConsoleDiv} setUsersMessaged={setUsersMessaged} usersMessaged={usersMessaged} />}

                    <Chat user={user} chatDiv={chatDiv} setChatDiv={setChatDiv} usersMessaged={usersMessaged} setUsersMessaged={setUsersMessaged} room={room} setRoom={setRoom} />

                    {settingsDiv && <Settings badges={badges} setBadges={setBadges} sprite={sprite} setSprite={setSprite} setSettingsDiv={setSettingsDiv} />}

                    <ClientNav settingsDiv={settingsDiv} setSettingsDiv={setSettingsDiv} setRoomData={setRoomData} navigatorDiv={navigatorDiv} setNavigatorDiv={setNavigatorDiv} inventoryDiv={inventoryDiv} setInventoryDiv={setInventoryDiv} chatDiv={chatDiv} setChatDiv={setChatDiv} setConsoleDiv={setConsoleDiv} consoleDiv={consoleDiv} catalogDiv={catalogDiv} setCatalogDiv={setCatalogDiv} />
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}