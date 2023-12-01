import './HomePage.css';
import HomePageHeader from '../Home Components/HomePageHeader/HomePageHeader';


export default function HomePage({ user, setUser }) {

    return (
        <div className='HomePage'>

            <HomePageHeader user={user} setUser={setUser} />
            <h1>welcome to the main page {user.name}</h1>
        </div>
    )
}
