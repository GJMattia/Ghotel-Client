import './DevTools.css';
import * as accountAPI from '../../../utilities/account-api';
import * as roomAPI from '../../../utilities/room-api';
import Z from '../../assets/images/furni/mode/zshelf.gif';
import { useState } from 'react';

export default function DevTools({ roomInfo, setSelectedFurni, setStackHeight, setRoomData, setInventory }) {

    const [counter, setCounter] = useState(0);
    const [wumbo, setWumbo] = useState(false);

    function Wumbo() {
        setWumbo(true);
        const randomNumber1 = Math.random() * 360;
        const randomNumber2 = Math.random() * 360;

        const room = document.querySelector('.Room');

        room.style.transform = `rotate(${randomNumber1}deg) skewX(${randomNumber2}deg)`;
    };

    function normalize() {
        setWumbo(false);
        const room = document.querySelector('.Room');

        room.style.transform = `rotate(-26.5deg) skewX(37deg)`;
    };

    const incrementCounter = () => {
        setStackHeight(prevStackHeight => prevStackHeight + .9);
        setCounter(prevCounter => prevCounter + 1);
    };

    const decrementCounter = () => {
        if (!counter) {
            return;
        };
        setStackHeight(prevStackHeight => prevStackHeight - .9);
        setCounter(prevCounter => prevCounter - 1);
    };

    async function clearInventory() {
        try {
            let cleared = await accountAPI.clearInventory();
            setInventory(cleared);
            setSelectedFurni(null);
        } catch (error) {
            console.error('error creating note'.error)
        }
    };

    return (
        <>

            <div className='StackTool'>
                <h4>Jawn's Stack Tool</h4>
                <div className='StackChoices'>
                    <div className='StackChoice'>
                        <img className='StackImg' src={Z} />
                    </div>
                </div>
                <div className='StackMult'>
                    <button className='StackDec' onClick={decrementCounter}>-</button>
                    <p>{counter} z's</p>
                    <button className='StackInc' onClick={incrementCounter}>+</button>
                </div>
            </div>
            <div className='DevTools'>
                <button onClick={clearInventory} className='DevBtn'>CLEAR INVENTORY</button>
                {!wumbo ? (
                    <button onClick={Wumbo} className='DevBtn Wumbo'>Wumbo</button>
                ) : (
                    <button onClick={normalize} className='DevBtn Wumbo'>Normalize</button>
                )}
            </div>
        </>
    )
}