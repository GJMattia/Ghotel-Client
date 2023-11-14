import './ClientNav.css';
import ConsolePic from '../../assets/images/clientnav/Console.png';
import ChatPic from '../../assets/images/clientnav/Chat.png';

export default function ClientNav({ user, consoleDiv, setConsoleDiv, chatDiv, setChatDiv }) {


    function toggleConsole() {
        setConsoleDiv(!consoleDiv);
    };

    function toggleChatDiv() {
        setChatDiv(!chatDiv);
    }



    return (
        <ul className='ClientNav'>
            <li><img onClick={toggleConsole} className='ClientNavIcon' src={ConsolePic} /></li>
            <li><img onClick={toggleChatDiv} className='ClientNavIcon' src={ChatPic} /></li>
        </ul>
    )
}