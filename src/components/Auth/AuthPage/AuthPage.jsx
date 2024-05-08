import LoginForm from '../LoginForm/LoginForm'
import './AuthPage.css';
import Ghotel from '../../../assets/images/landing/GhotelLogo.gif';
import { Link } from 'react-router-dom';

export default function AuthPage({ setUser }) {

  return (
    <>
      <div className='TooSmall'>
        <img src={Ghotel} />
        <h1>Hello my friend!</h1>
        <h3>Ghotel is a desktop application built with React.Js, as of right now it is strictly designed to work on a desktop!</h3>
        <h4>Please use a computer to access the fun sandbox that is Ghotel.org!</h4>
        <h5>TY - GM</h5>
      </div>
      <LoginForm setUser={setUser} />
      <h1 className='AuthPageTitle'>Welcome to Ghotel.org, unlimited furniture and fun</h1>
      <div className='HomePageDiv'>
        <div className='JoinDiv'>
          <p>New to Ghotel?<span> Click here to</span></p>

          <Link to='/signup' className='JoinButton'>
            <p>Join now</p>
            <p>for free</p>

          </Link>

        </div>
      </div>

      <ul className='AuthList'>
        <li><a className='underline' href='https://github.com/GJMattia' target="_blank">Github</a></li>
        <li><a className='underline' href='https://www.linkedin.com/in/greg-mattia/' target="_blank">LinkedIn</a></li>
        <li><a className='underline' href='https://www.gregmattia.dev/' target="_blank">© GM 2024</a></li>
      </ul>
      <p className='AuthDisclaimer'>Habbo Hotel recreated using React.js. Developed by Greg Mattia</p>
    </>
  );
}