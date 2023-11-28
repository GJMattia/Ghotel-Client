import './Console.css';
import { useState } from 'react';
import ConsoleProfile from '../ConsoleProfile/ConsoleProfile';
import ConsoleFriends from '../ConsoleFriends/ConsoleFriends';
import FriendRequests from '../FriendRequests/FriendRequests';
import FriendSearch from '../FriendSearch/FriendSearch';

export default function Console({ user, consoleDiv, setConsoleDiv, setUsersMessaged, usersMessaged, setRoom, setChatDiv }) {

    const [selectedTab, setSelectedTab] = useState('ConsoleProfile');
    const [isDragging, setIsDragging] = useState(false);
    const [initialX, setInitialX] = useState(0);
    const [initialY, setInitialY] = useState(0);

    function closeConsole() {
        setConsoleDiv(!consoleDiv);
    }

    function handleTabClick(componentName) {
        setSelectedTab(componentName);
    };

    function handleMouseDown(e) {
        setIsDragging(true);
        setInitialX(e.clientX);
        setInitialY(e.clientY);
    }

    function handleMouseUp() {
        setIsDragging(false);
    }

    function handleMouseMove(e) {
        if (isDragging) {
            const consoleElement = document.querySelector('.Console');
            const newX = e.clientX - initialX + consoleElement.offsetLeft;
            const newY = e.clientY - initialY + consoleElement.offsetTop;
            consoleElement.style.left = newX + 'px';
            consoleElement.style.top = newY + 'px';
            setInitialX(e.clientX);
            setInitialY(e.clientY);
        }
    }


    return (
        <div className='Console'
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}>
            <h3>Habbo Console</h3>
            <button onClick={closeConsole} className='ConsoleX'>X</button>
            <div className='ConsoleScreen'>

                {selectedTab === 'ConsoleProfile' && <ConsoleProfile user={user} />}
                {selectedTab === 'ConsoleFriends' && <ConsoleFriends user={user} usersMessaged={usersMessaged} setUsersMessaged={setUsersMessaged} setRoom={setRoom} setChatDiv={setChatDiv} />}
                {selectedTab === 'FriendRequests' && <FriendRequests user={user} />}
                {selectedTab === 'FriendSearch' && <FriendSearch user={user} />}

            </div>
            <ul className='ConsoleNav'>
                <li>
                    <div
                        onClick={() => handleTabClick('ConsoleProfile')}
                        className={selectedTab === 'ConsoleProfile' ? 'ActiveTab' : ''}
                    >
                        My Info
                    </div>
                </li>
                <li>
                    <div
                        onClick={() => handleTabClick('ConsoleFriends')}
                        className={selectedTab === 'ConsoleFriends' ? 'ActiveTab' : ''}
                    >
                        Friends
                    </div>
                </li>
                <li>
                    <div
                        onClick={() => handleTabClick('FriendRequests')}
                        className={selectedTab === 'FriendRequests' ? 'ActiveTab' : ''}
                    >
                        Requests
                    </div>
                </li>
                <li>
                    <div
                        onClick={() => handleTabClick('FriendSearch')}
                        className={selectedTab === 'FriendSearch' ? 'ActiveTab' : ''}
                    >
                        Search
                    </div>
                </li>
            </ul>
        </div>
    )
}