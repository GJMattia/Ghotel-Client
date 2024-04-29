import './DevTools.css';
import * as accountAPI from '../../../utilities/account-api';
import Z from '../../assets/images/furni/mode/zshelf.gif';
import { useState } from 'react';

export default function DevTools({ setSelectedFurni, setRoomData, roomIndex, setInventory, setPlaceFurni, setStackHeight, stackHeight }) {

    const [counter, setCounter] = useState(0);
    //stack tool 

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

    //deleting stuff
    async function clearRoom() {
        try {
            let cleared = await accountAPI.clearRoom({ roomIndex: roomIndex, roomSize: 104 });
            setRoomData(cleared);
            setSelectedFurni(null);
        } catch (error) {
            console.error('error creating note'.error)
        }
    };

    async function clearInventory() {
        try {
            let cleared = await accountAPI.clearInventory();
            setInventory(cleared);
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
                <button onClick={clearRoom} className='DevBtn'>CLEAR ROOM</button>
                <button onClick={clearInventory} className='DevBtn'>CLEAR INVENTORY</button>
                <button onClick={() => setPlaceFurni(null)} className='DevBtn StopPlacing'>STOP PLACING</button>
            </div>
        </>
    )
}