import './Inventory.css';
import { useState } from 'react';
import Furni from '../../assets/data/furni.json';

export default function Inventory({ inventoryDiv, setInventoryDiv, accountData, setAccountData }) {

    const [isDragging, setIsDragging] = useState(false);
    const [initialX, setInitialX] = useState(0);
    const [initialY, setInitialY] = useState(0);
    const [showcaseFurni, setShowcaseFurni] = useState(0);

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

    function selectFurni(itemid) {
        setShowcaseFurni(itemid)
    }

    const inventoryFurni = accountData.inventory.reduce((groupedItems, itemid) => {
        const existingItem = groupedItems.find((group) => group.itemid === itemid);

        if (existingItem) {
            existingItem.count += 1;
        } else {
            groupedItems.push({ itemid, count: 1 });
        }

        return groupedItems;
    }, []).map((group, index) => {
        const isSelected = group.itemid === showcaseFurni;

        return (
            <li
                onClick={() => selectFurni(group.itemid)}
                index={index}
                key={index}
                className={`InventoryItem ${isSelected ? 'SelectedInventoryItem' : ''}`}
            >
                <div>
                    <img className='FurniIcon' src={Furni[group.itemid].icon} />
                    {group.count > 1 && <div className="ItemCount">{group.count}</div>}
                </div>
            </li>
        );
    });



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
                {inventoryFurni}
            </ul>
            <div className='InventoryShowcase'>
                <img className='InventoryFurni' src={Furni[showcaseFurni].img} />
                <h5>{Furni[showcaseFurni].name}</h5>
                <p>{Furni[showcaseFurni].description}</p>
                <button>Place in Room</button>
            </div>
        </div>
    )
}