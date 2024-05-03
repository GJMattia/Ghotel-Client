import './HomePage.css';
import Ghotel from '../../assets/images/landing/GhotelLogo.gif';
import * as userService from '../../../utilities/user-services'
import { Link } from 'react-router-dom';
import Tile from '../../assets/images/homepage/empty_tile.png';
import Sprites from '../../assets/data/sprites.json';
import { useState, useEffect } from 'react';
import * as accountAPI from '../../../utilities/account-api';
import Mast from '../../assets/images/homepage/hotel-mast.gif';
import Arrow from '../../assets/images/homepage/arrow.gif';
import Credits from '../../assets/images/client/credits-icon.png';
import Throne from '../../assets/images/furni/rares/throne.png';
import Enter from '../../assets/images/homepage/enter.gif';
import Fill1 from '../../assets/images/homepage/fill1.gif';
import Fill2 from '../../assets/images/homepage/fill2.gif';
import Fill3 from '../../assets/images/homepage/fill3.gif';

export default function HomePage({ user, setUser }) {

    const [account, setAccount] = useState(null);

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


    function handleLogOut() {
        userService.logOut()
        setUser(null)
    }

    return (
        account ? (
            <div className='HomePage'>
                <div className='HomePageHeader'>
                    <img className='GhotelHP' src={Ghotel} />
                    <Link className='OpenClientBtn' to='/client'> Enter Ghotel </Link>
                    <button className='SignOutBtn' onClick={handleLogOut}> Sign Out </button>
                </div>
                <h1 className='WelcomeBack'>Welcome back {user.name}!</h1>

                <div className='MainContent'>

                    <div className='Welcome'>
                        <img className='WelcomeMast' src={Mast} />
                        <img className='WelcomeTile' src={Tile} />
                        <img className='WelcomeSprite' src={Sprites[account.sprite].stand} />
                        <img className='WelcomeArrow' src={Arrow} />
                        <Link to='/client' ><img className='Enter' src={Enter} /></Link>

                        <div className='WelcomeInfo'>
                            <h4 className='WelcomeUser'>{user.name}</h4>
                            <h5><img src={Credits} />{account.credits} credits</h5>

                        </div>
                    </div>

                    <div className='WelcomeArticle'>
                        <h5>LATEST NEWS</h5>
                        <h3>Throne in catalog</h3>
                        <img src={Throne} />
                        <p>agugh okay like </p>
                    </div>
                </div>

                <div className='WelcomeFill'>
                    <img src={Fill2} />
                    <img src={Fill1} />
                    <img src={Fill3} />
                </div>
            </div>
        ) : null
    );
}
