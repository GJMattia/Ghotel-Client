import './ClientNav.css';
import ConsolePic from '../../assets/images/clientnav/Console.png';

export default function ClientNav({ user, consoleDiv, setConsoleDiv }) {


    function toggleConsole() {
        setConsoleDiv(!consoleDiv);
    }


    return (
        <ul className='ClientNav'>
            <li><img onClick={toggleConsole} className='ClientNavIcon' src={ConsolePic} /></li>
        </ul>
    )
}