import './Client.css';
import { useState, useEffect } from 'react';
import ClientNav from '../ClientNav/ClientNav';
import Console from '../Console/Console';
import Chat from '../Chat/Chat';
import Catalog from '../Catalog/Catalog';
import Inventory from '../Inventory/Inventory';
import * as accountAPI from '../../../utilities/account-api';
import Credits from '../../assets/images/client/credits-icon.png';


export default function Client({ user }) {

    const [accountData, setAccountData] = useState(null);
    const [consoleDiv, setConsoleDiv] = useState(false);
    const [chatDiv, setChatDiv] = useState(false);
    const [catalogDiv, setCatalogDiv] = useState(false);
    const [room, setRoom] = useState(null);
    const [usersMessaged, setUsersMessaged] = useState([]);
    const [inventoryDiv, setInventoryDiv] = useState(false);


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
                    {catalogDiv && <Catalog catalogDiv={catalogDiv} setCatalogDiv={setCatalogDiv} />}
                    <Inventory inventoryDiv={inventoryDiv} setInventoryDiv={setInventoryDiv} />
                    {consoleDiv && <Console user={user} setChatDiv={setChatDiv} setRoom={setRoom} consoleDiv={consoleDiv} setConsoleDiv={setConsoleDiv} setUsersMessaged={setUsersMessaged} usersMessaged={usersMessaged} />}
                    <Chat user={user} chatDiv={chatDiv} setChatDiv={setChatDiv} usersMessaged={usersMessaged} setUsersMessaged={setUsersMessaged} room={room} setRoom={setRoom} />
                    <ClientNav user={user} inventoryDiv={inventoryDiv} setInventoryDiv={setInventoryDiv} chatDiv={chatDiv} setChatDiv={setChatDiv} setConsoleDiv={setConsoleDiv} consoleDiv={consoleDiv} catalogDiv={catalogDiv} setCatalogDiv={setCatalogDiv} />
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}