import './ConsoleProfile.css';

export default function ConsoleProfile({ user }) {

    return (
        <div className='ConsoleProfile'>
            <h1>Username: {user.name}</h1>
            <h1>Email: {user.email}</h1>
        </div>
    )
}