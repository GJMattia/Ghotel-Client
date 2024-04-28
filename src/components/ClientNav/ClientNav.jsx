import './ClientNav.css';
import ConsoleIcon from '../../assets/images/clientnav/console-2.png';
import ChatIcon from '../../assets/images/clientnav/chat.gif';
import HotelIcon from '../../assets/images/clientnav/hotel-icon.png';
import CatalogIcon from '../../assets/images/clientnav/catalog.png';
import NavIcon from '../../assets/images/clientnav/nav.png';
import InventoryIcon from '../../assets/images/clientnav/inventory.png';
import HelpIcon from '../../assets/images/clientnav/wonky.gif';


export default function ClientNav({ setCurrentRoom, navigatorDiv, setNavigatorDiv, consoleDiv, setConsoleDiv, chatDiv, setChatDiv, catalogDiv, setCatalogDiv, inventoryDiv, setInventoryDiv }) {

    function toggleRoom() {
        setCurrentRoom(null);
    }

    function toggleNavigator() {
        setNavigatorDiv(!navigatorDiv)
    };

    function toggleConsole() {
        setConsoleDiv(!consoleDiv);
    };

    function toggleChat() {
        setChatDiv(!chatDiv)
    };

    function toggleCatalog() {
        setCatalogDiv(!catalogDiv)
    };

    function toggleInventory() {
        console.log('hello')
        setInventoryDiv(!inventoryDiv)
    };

    return (
        <ul className='ClientNav'>
            <li><img onClick={toggleRoom} className='ClientNavIcon' src={HotelIcon} /></li>
            <li><img onClick={toggleNavigator} className='ClientNavIcon' src={NavIcon} /></li>
            <li><img onClick={toggleCatalog} className='ClientNavIcon' src={CatalogIcon} /></li>
            <li><img onClick={toggleInventory} className='ClientNavIcon' src={InventoryIcon} /></li>
            <li><img onClick={toggleConsole} className='ClientNavIcon' src={ConsoleIcon} /></li>
            <li><img onClick={toggleChat} className='ClientNavIcon' src={ChatIcon} /></li>
            <li><img onClick={() => window.location.href = '/'} className='ClientNavIcon' src={HelpIcon} /></li>
        </ul>
    )
}