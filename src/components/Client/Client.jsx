import './Client.css';
import { useState, useEffect } from 'react';
import ClientNav from '../ClientNav/ClientNav';
import Console from '../Console/Console';
import Chat from '../Chat/Chat';
import Catalog from '../Catalog/Catalog';
import Inventory from '../Inventory/Inventory';
import Navigator from '../Navigator/Navigator';
import * as accountAPI from '../../../utilities/account-api';
import Credits from '../../assets/images/client/credits-icon.png';
import Room from '../Room/Room';


export default function Client({ user }) {

    //Account info grab
    const [account, setAccount] = useState(false);

    //Navbar elements
    const [consoleDiv, setConsoleDiv] = useState(false);
    const [chatDiv, setChatDiv] = useState(false);
    const [catalogDiv, setCatalogDiv] = useState(false);
    const [inventoryDiv, setInventoryDiv] = useState(false);
    const [navigatorDiv, setNavigatorDiv] = useState(false);

    //chat elements
    const [room, setRoom] = useState(null);
    const [usersMessaged, setUsersMessaged] = useState([]);

    //room variables
    const [roomIndex, setRoomIndex] = useState(null);
    const [placeFurni, setPlaceFurni] = useState(null);

    //account data
    const [inventory, setInventory] = useState(null);
    const [credits, setCredits] = useState(null);
    const [userRoomsList, setUserRoomsList] = useState(null);
    const [roomData, setRoomData] = useState(null);


    useEffect(function () {
        async function getAccountData() {
            try {
                const response = await accountAPI.getAccount();
                setCredits(response.credits);
                setInventory(response.inventory);
                setUserRoomsList(response.roomNames);
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
                    {(roomData !== null || roomData === 0) && <Room setInventory={setInventory} roomData={roomData} setRoomData={setRoomData} user={user} roomIndex={roomIndex} setRoomIndex={setRoomIndex} placeFurni={placeFurni} setPlaceFurni={setPlaceFurni} setUserRoomsList={setUserRoomsList} />}

                    {navigatorDiv && <Navigator roomIndex={roomIndex} setRoomData={setRoomData} userRoomsList={userRoomsList} setUserRoomsList={setUserRoomsList} user={user} setRoomIndex={setRoomIndex} navigatorDiv={navigatorDiv} setNavigatorDiv={setNavigatorDiv} />}

                    {catalogDiv && <Catalog setInventory={setInventory} credits={credits} setCredits={setCredits} catalogDiv={catalogDiv} setCatalogDiv={setCatalogDiv} />}

                    <Inventory roomData={roomData} inventory={inventory} setCatalogDiv={setCatalogDiv} placeFurni={placeFurni} setPlaceFurni={setPlaceFurni} inventoryDiv={inventoryDiv} setInventoryDiv={setInventoryDiv} />

                    {consoleDiv && <Console user={user} setChatDiv={setChatDiv} setRoom={setRoom} consoleDiv={consoleDiv} setConsoleDiv={setConsoleDiv} setUsersMessaged={setUsersMessaged} usersMessaged={usersMessaged} />}

                    <Chat user={user} chatDiv={chatDiv} setChatDiv={setChatDiv} usersMessaged={usersMessaged} setUsersMessaged={setUsersMessaged} room={room} setRoom={setRoom} />

                    <ClientNav setRoomData={setRoomData} navigatorDiv={navigatorDiv} setNavigatorDiv={setNavigatorDiv} inventoryDiv={inventoryDiv} setInventoryDiv={setInventoryDiv} chatDiv={chatDiv} setChatDiv={setChatDiv} setConsoleDiv={setConsoleDiv} consoleDiv={consoleDiv} catalogDiv={catalogDiv} setCatalogDiv={setCatalogDiv} />
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}