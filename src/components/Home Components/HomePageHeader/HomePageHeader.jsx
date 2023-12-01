import './HomePageHeader.css';
import Ghotel from '../../../assets/images/landing/GhotelLogo.gif';
import * as userService from '../../../../utilities/user-services'

export default function HomePageHeader({ user, setUser }) {

    function handleLogOut() {
        userService.logOut()
        setUser(null)
    }
    return (
        <div className='HomePageHeader'>
            <img className='GhotelHP' src={Ghotel} />
            <button className='OpenClientBtn' onClick={() => window.open('/client', '_blank')}>
                Enter Ghotel
            </button>

            <button className='SignOutBtn' onClick={handleLogOut}> Sign Out </button>
        </div>
    )
}