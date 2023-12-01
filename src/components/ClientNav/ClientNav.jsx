import './ClientNav.css';
import ConsoleIcon from '../../assets/images/clientnav/console-2.png';
import ChatIcon from '../../assets/images/clientnav/Chat.png';
import HotelIcon from '../../assets/images/clientnav/hotel-icon.png';
import CatalogIcon from '../../assets/images/clientnav/catalog.png';
import NavIcon from '../../assets/images/clientnav/nav.png';
import InventoryIcon from '../../assets/images/clientnav/inventory.png';
import HelpIcon from '../../assets/images/clientnav/help.png';
export default function ClientNav({ user, consoleDiv, setConsoleDiv, chatDiv, setChatDiv }) {


    function toggleConsole() {
        setConsoleDiv(!consoleDiv);
    };

    function toggleChat() {
        setChatDiv(!chatDiv)
    };

    return (
        <ul className='ClientNav'>
            <li><img className='ClientNavIcon' src={HotelIcon} /></li>
            <li><img className='ClientNavIcon' src={NavIcon} /></li>
            <li><img className='ClientNavIcon' src={CatalogIcon} /></li>
            <li><img className='ClientNavIcon' src={InventoryIcon} /></li>
            <li><img onClick={toggleConsole} className='ClientNavIcon' src={ConsoleIcon} /></li>
            <li><img onClick={toggleChat} className='ClientNavIcon' src={ChatIcon} /></li>
            <li><img className='ClientNavIcon' src={HelpIcon} /></li>
        </ul>
    )
}