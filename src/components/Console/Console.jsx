import './Console.css';

export default function Console({ user, consoleDiv, setConsoleDiv }) {

    function closeConsole() {
        setConsoleDiv(!consoleDiv);
    }

    return (
        <div className='Console'>
            <h3>Habbo Console</h3>
            <button onClick={closeConsole} className='ConsoleX'>X</button>
            <div className='ConsoleScreen'>
                f

            </div>

        </div>
    )
}