import './HomePageHeader.css';
import Ghotel from '../../../assets/images/landing/GhotelLogo.gif';
import * as userService from '../../../../utilities/user-services'
import { NavLink } from 'react-router-dom';

export default function HomePageHeader({ user, setUser }) {

    function handleLogOut() {
        userService.logOut()
        setUser(null)
    }
    return (
        <div className='HomePageHeader'>
            <img className='GhotelHP' src={Ghotel} />
            <NavLink className='OpenClientBtn' to='/client'>
                Enter Ghotel
            </NavLink>
            {/* <button className='OpenClientBtn' onClick={() => window.open('/client', '_blank')}>
                Enter Ghotel
            </button> */}

            <button className='SignOutBtn' onClick={handleLogOut}> Sign Out </button>
        </div>
    )
}