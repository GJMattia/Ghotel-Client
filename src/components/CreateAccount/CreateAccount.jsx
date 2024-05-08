import './CreateAccount.css';
import Ghotel from '../../assets/images/landing/GhotelLogo.gif';
import SignUpForm from '../Auth/SignUpForm/SignUpForm';
import { Link } from 'react-router-dom';

export default function CreateAccount({ setUser }) {
    return (
        <div className='CreateAccount'>
            <div className='CreateInfo'>
                <img className='CreateLogo' src={Ghotel} />
                {/* <h1 className='EnterTitle'>Enter info to signup!</h1> */}
                <Link className='CreateReturn' to='/'>Return Home</Link>
            </div>

            <SignUpForm setUser={setUser} />
        </div>
    )
};