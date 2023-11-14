import './MainPage.css';


export default function MainPage({ user }) {

    return (
        <div className='MainPage'>
            <h1>welcome to the main page {user.name}</h1>

        </div>
    )
}
