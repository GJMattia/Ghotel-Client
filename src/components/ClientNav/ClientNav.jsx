import './ClientNav.css';
import ConsoleIcon from '../../assets/images/clientnav/console-2.png';
import ChatIcon from '../../assets/images/clientnav/chat.gif';
import HotelIcon from '../../assets/images/clientnav/hotel-icon.png';
import CatalogIcon from '../../assets/images/clientnav/catalog.png';
import NavIcon from '../../assets/images/clientnav/nav.png';
import InventoryIcon from '../../assets/images/clientnav/inventory.png';
import HelpIcon from '../../assets/images/clientnav/wonky.gif';
import SettingsIcon from '../../assets/images/clientnav/settings.gif';
import Debug from '../../assets/images/clientnav/debug.gif';

export default function ClientNav({ debugDiv, setDebugDiv, settingsDiv, setSettingsDiv, setRoomData, navigatorDiv, setNavigatorDiv, consoleDiv, setConsoleDiv, chatDiv, setChatDiv, catalogDiv, setCatalogDiv, inventoryDiv, setInventoryDiv }) {

    return (
        <ul className='ClientNav'>
            <li><img onClick={() => setRoomData(null)} className='ClientNavIcon' src={HotelIcon} /></li>
            <li><img onClick={() => setNavigatorDiv(!navigatorDiv)} className='ClientNavIcon' src={NavIcon} /></li>
            <li><img onClick={() => setCatalogDiv(!catalogDiv)} className='ClientNavIcon' src={CatalogIcon} /></li>
            <li><img onClick={() => setInventoryDiv(!inventoryDiv)} className='ClientNavIcon' src={InventoryIcon} /></li>
            <li><img onClick={() => setConsoleDiv(!consoleDiv)} className='ClientNavIcon' src={ConsoleIcon} /></li>
            <li><img onClick={() => setChatDiv(!chatDiv)} className='ClientNavIcon' src={ChatIcon} /></li>
            <li><img onClick={() => setSettingsDiv(!settingsDiv)} className='ClientNavIcon' src={SettingsIcon} /></li>
            <li><img onClick={() => setDebugDiv(!debugDiv)} className='ClientNavIcon' src={Debug} /></li>
            <li><img onClick={() => window.location.href = '/'} className='ClientNavIcon' src={HelpIcon} /></li>
        </ul>
    )
}