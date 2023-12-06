import './Inventory.css';
import { useState } from 'react';

export default function Inventory({ inventoryDiv, setInventoryDiv }) {

    const [isDragging, setIsDragging] = useState(false);
    const [initialX, setInitialX] = useState(0);
    const [initialY, setInitialY] = useState(0);

    function toggleInventory() {
        setInventoryDiv(!inventoryDiv)
    };

    function handleMouseDown(e) {
        setIsDragging(true);
        setInitialX(e.clientX);
        setInitialY(e.clientY);
    }

    function handleMouseUp() {
        setIsDragging(false);
    }

    function handleMouseMove(e) {
        if (isDragging) {
            const consoleElement = document.querySelector('.Inventory');
            const newX = e.clientX - initialX + consoleElement.offsetLeft;
            const newY = e.clientY - initialY + consoleElement.offsetTop;
            consoleElement.style.left = newX + 'px';
            consoleElement.style.top = newY + 'px';
            setInitialX(e.clientX);
            setInitialY(e.clientY);
        }
    }


    return (
        <div
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            className={`Inventory ${inventoryDiv ? '' : 'HideInventory'}`}>
            <button onClick={toggleInventory} className='InventoryX'>X</button>
            <h4>Inventory</h4>
            <h5>Your Furniture</h5>
            <ul className='InventoryItemList'>
                <li className='InventoryItem'>
                    <img className='FurniIcon' src='src/assets/images/furni-icons/rares/throne_icon.png' />
                </li>
                <li className='InventoryItem'>
                    <img className='FurniIcon' src='src/assets/images/furni-icons/rares/petal_icon.png' />
                </li>
                <li className='InventoryItem'>
                    <img className='FurniIcon' src='src/assets/images/furni-icons/exchange/crown-icon.png' />
                </li>
                <li className='InventoryItem'>
                    <img className='FurniIcon' src='src/assets/images/furni-icons/exchange/platinum-icon.png' />
                </li>
                <li className='InventoryItem'>
                    <img className='FurniIcon' src="src/assets/images/furni-icons/rares/bbb_icon.png" />
                </li>
                <li className='InventoryItem'>
                    <img className='FurniIcon' src="src/assets/images/furni-icons/rares/goldcup_icon.png" />
                </li>
                <li className='InventoryItem'>
                    <img className='FurniIcon' src="src/assets/images/furni-icons/rares/bronzecup_icon.png" />
                </li>
                <li className='InventoryItem'>
                    <img className='FurniIcon' src="src/assets/images/furni-icons/rares/gbb_icon.png" />
                </li>
                <li className='InventoryItem'>
                    <img className='FurniIcon' src="src/assets/images/furni-icons/rares/typo_icon.png" />
                </li>
                <li className='InventoryItem'>
                    <img className='FurniIcon' src="src/assets/images/furni-icons/rares/silvernelly_icon.png" />
                </li>
                <li className='InventoryItem'>
                    <img className='FurniIcon' src="src/assets/images/furni-icons/rares/bronzenelly_icon.png" />
                </li>
                <li className='InventoryItem'>
                    <img className='FurniIcon' src="src/assets/images/furni-icons/rares/goldnelly_icon.png" />
                </li>
                <li className='InventoryItem'>
                    <img className='FurniIcon' src="src/assets/images/furni-icons/exchange/bronzecoin-icon.png" />
                </li>
                <li className='InventoryItem'>
                    <img className='FurniIcon' src="src/assets/images/furni-icons/exchange/goldbar-icon.png" />
                </li>
                <li className='InventoryItem'>
                    <img className='FurniIcon' src="src/assets/images/furni-icons/exchange/sack-icon.png" />
                </li>

            </ul>
            <div className='InventoryShowcase'>
                <img className='InventoryFurni' src="src/assets/images/furni/rares/bbb.png" />
                <h5>Blue Fountain</h5>
                <p>bbb, goin up.</p>
                <button>Place in Room</button>
            </div>

        </div>
    )
}