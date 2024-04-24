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


    const [accountData, setAccountData] = useState(null);
    const [consoleDiv, setConsoleDiv] = useState(false);
    const [chatDiv, setChatDiv] = useState(false);
    const [catalogDiv, setCatalogDiv] = useState(false);
    const [room, setRoom] = useState(null);
    const [usersMessaged, setUsersMessaged] = useState([]);
    const [inventoryDiv, setInventoryDiv] = useState(false);
    const [navigatorDiv, setNavigatorDiv] = useState(false);
    const [currentRoom, setCurrentRoom] = useState(0);
    const [placeFurni, setPlaceFurni] = useState(null);

    useEffect(function () {
        async function getAccountData() {
            try {
                const account = await accountAPI.getAccount();
                setAccountData(account);
            } catch (error) {
                console.error('Error Fetching Questions', error);
            }
        }
        getAccountData();
    }, []);

    return (
        <div className='Client'>
            {accountData !== null ? (
                <>
                    <div className='ClientHeader'>
                        <img src={Credits} />
                        <p>{accountData.credits}</p>
                    </div>
                    {currentRoom && <Room setCurrentRoom={setCurrentRoom} setAccountData={setAccountData} placeFurni={placeFurni} setPlaceFurni={setPlaceFurni} currentRoom={currentRoom} />}
                    {navigatorDiv && <Navigator setCurrentRoom={setCurrentRoom} accountData={accountData} setAccountData={setAccountData} navigatorDiv={navigatorDiv} setNavigatorDiv={setNavigatorDiv} />}
                    {catalogDiv && <Catalog accountData={accountData} setAccountData={setAccountData} catalogDiv={catalogDiv} setCatalogDiv={setCatalogDiv} />}
                    <Inventory setPlaceFurni={setPlaceFurni} accountData={accountData} setAccountData={setAccountData} inventoryDiv={inventoryDiv} setInventoryDiv={setInventoryDiv} />
                    {consoleDiv && <Console user={user} setChatDiv={setChatDiv} setRoom={setRoom} consoleDiv={consoleDiv} setConsoleDiv={setConsoleDiv} setUsersMessaged={setUsersMessaged} usersMessaged={usersMessaged} />}
                    <Chat user={user} chatDiv={chatDiv} setChatDiv={setChatDiv} usersMessaged={usersMessaged} setUsersMessaged={setUsersMessaged} room={room} setRoom={setRoom} />
                    <ClientNav setCurrentRoom={setCurrentRoom} navigatorDiv={navigatorDiv} setNavigatorDiv={setNavigatorDiv} inventoryDiv={inventoryDiv} setInventoryDiv={setInventoryDiv} chatDiv={chatDiv} setChatDiv={setChatDiv} setConsoleDiv={setConsoleDiv} consoleDiv={consoleDiv} catalogDiv={catalogDiv} setCatalogDiv={setCatalogDiv} />
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}