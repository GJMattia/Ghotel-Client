import './HomePage.css';
import Ghotel from '../../assets/images/landing/GhotelLogo.gif';
import * as userService from '../../../utilities/user-services'
import { Link } from 'react-router-dom';
import Tile from '../../assets/images/homepage/empty_tile.png';
import Sprites from '../../assets/data/sprites.json';
import { useState, useEffect, useRef } from 'react';
import * as accountAPI from '../../../utilities/account-api';
import Mast from '../../assets/images/homepage/hotel-mast.gif';
import Arrow from '../../assets/images/homepage/arrow.gif';
import Credits from '../../assets/images/client/credits-icon.png';
import Throne from '../../assets/images/furni/rares/throne.png';
import Enter from '../../assets/images/homepage/enter.gif';
import Clock from '../../assets/images/homepage/clock.gif';
import Tro from '../../assets/images/homepage/tro.gif';
import WS1 from '../../assets/images/homepage/ws1.gif';
import WS2 from '../../assets/images/homepage/ws2.gif';
import WS3 from '../../assets/images/homepage/ws3.gif';

export default function HomePage({ user, setUser }) {

    const [account, setAccount] = useState(null);
    const [motto, setMotto] = useState('');
    const inputRef = useRef(null);

    useEffect(function () {
        async function getAccountData() {
            try {
                const response = await accountAPI.getAccount();
                setAccount(response);
            } catch (error) {
                console.error('Error Fetching Questions', error);
            }
        }
        getAccountData();
    }, []);

    async function changeMotto() {
        try {
            let response = await accountAPI.changeMotto({ motto: motto });
            setAccount({ ...account, motto: response });
            inputRef.current.value = '';
        } catch (error) {
            console.error('error changing sprite'.error)
        }
    };

    function formatDate(dateString) {
        const date = new Date(dateString);
        const formattedDate = date.toLocaleDateString('en-US');
        const formattedTime = date.toLocaleTimeString('en-US');
        return `${formattedDate} ${formattedTime}`;
    }

    function handleLogOut() {
        userService.logOut()
        setUser(null)
    };

    const handleMottoChange = (event) => {
        setMotto(event.target.value);
    };

    return (
        account ? (
            <div className='HomePage'>
                <div className='HomePageHeader'>
                    <img className='GhotelHP' src={Ghotel} />
                    <Link className='OpenClientBtn' to='/client'> Enter Ghotel </Link>
                    <button className='SignOutBtn' onClick={handleLogOut}> Sign Out </button>
                </div>
                <h1 className='WelcomeBack'>Welcome to Ghotel {user.name}!</h1>

                <div className='MainContent'>

                    <div className='Welcome'>
                        <img className='WelcomeMast' src={Mast} />
                        <img className='WelcomeTile' src={Tile} />
                        <img className={`WelcomeSprite Sprite${account.sprite}`} src={Sprites[account.sprite].stand} />
                        <img className='WelcomeArrow' src={Arrow} />
                        <Link to='/client' ><img className='Enter' src={Enter} /></Link>

                        <input className='MottoInput'
                            placeholder={account.motto}
                            onChange={handleMottoChange}
                            ref={inputRef}
                            maxLength={25}
                        />


                        <ul className='WelcomeInfo2'>
                            <li><img src={Tro} draggable="false" />
                                Gambling is ON</li>
                            <li className='WelcomeDate'><img src={Clock} draggable="false" />Account created: {formatDate(account.createdAt)}</li>
                        </ul>

                        <h4 className='WelcomeUser'>{user.name}:</h4>
                        <h5 className='UserCredits'><img src={Credits} draggable="false" />{account.credits} credits</h5>
                        <button className='MottoBtn' onClick={changeMotto}>Update</button>
                    </div>

                    <div className='WelcomeArticle'>
                        <h5>LATEST NEWS</h5>
                        <h3>Throne in catalog</h3>
                        <img src={Throne} />
                        <p>agugh okay like </p>
                    </div>
                </div>

                <div className='WelcomeFill'>
                    <div className='WelcomeStuff WS1'>
                        <h2>Furniture is... INFINITE</h2>
                        <img src={WS1} draggable="false" />
                        <h5>Build as you please!</h5>
                    </div>
                    <div className='WelcomeStuff WS2'>
                        <h2>BETTING IS LIVE</h2>
                        <img src={WS2} draggable="false" />
                        <h5>13, 21, poker, play whatever you want</h5>
                    </div>
                    <div className='WelcomeStuff WS3'>
                        <h2>The game is FREE</h2>
                        <img src={WS3} draggable="false" />
                        <h5>not a cent to play</h5>
                    </div>
                </div>
            </div>
        ) : null
    );
}
