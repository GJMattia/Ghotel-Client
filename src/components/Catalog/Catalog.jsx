import './Catalog.css';
import CatalogTop from '../../assets/images/catalog/catalogtop.gif';
import CatalogBottom from '../../assets/images/catalog/CatalogBottom.png';
import CatalogPage from '../CatalogPage/CatalogPage';
import CatalogShowcase from '../CatalogShowcase/CatalogShowcase';
import { useState } from 'react';
import catalogData from '../../assets/data/catalog.json';
import * as accountAPI from '../../../utilities/account-api';
import buySound from '../../assets/audio/buy.mp3'

export default function Catalog({ catalogDiv, setCatalogDiv, accountData, setAccountData }) {

    const [currentPage, setCurrentPage] = useState(catalogData[0]);
    const [currentFurni, setCurrentFurni] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [initialX, setInitialX] = useState(0);
    const [initialY, setInitialY] = useState(0);
    const [buyDiv, setBuyDiv] = useState(false);


    async function buyFurni(event) {
        try {
            await accountAPI.buyFurni({ itemID: currentFurni.itemid, itemPrice: currentFurni.price, accountID: accountData._id });
            const updatedAccountData = await accountAPI.getAccount();
            const audio = new Audio(buySound);
            audio.play();
            setBuyDiv(false);
            setAccountData(updatedAccountData);

        } catch (error) {
            console.error('error creating note'.error)
        }
    };

    function closeBuy() {
        setBuyDiv(false)
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
            const consoleElement = document.querySelector('.Catalog');
            const newX = e.clientX - initialX + consoleElement.offsetLeft;
            const newY = e.clientY - initialY + consoleElement.offsetTop;
            consoleElement.style.left = newX + 'px';
            consoleElement.style.top = newY + 'px';
            setInitialX(e.clientX);
            setInitialY(e.clientY);
        }
    }


    function selectPage(index) {
        setCurrentFurni(0);
        setCurrentPage(catalogData[index]);
    }

    const FurniLines = catalogData.map(function (item, index) {
        const isSelected = currentPage === item;

        return (
            <li
                onClick={() => selectPage(index)}
                index={index}
                key={item.name}
                className={`FurniLine ${isSelected ? 'selected' : ''}`}
            >
                {item.name}
            </li>
        );
    });



    function toggleCatalog() {
        setCatalogDiv(!catalogDiv)
    };

    return (
        <div
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            className="Catalog"
        >
            <CatalogPage currentPage={currentPage} setCurrentFurni={setCurrentFurni} currentFurni={currentFurni} />
            <CatalogShowcase setBuyDiv={setBuyDiv} currentFurni={currentFurni} />
            <img className='CatalogTop' src={CatalogTop} />
            <img className='CatalogBottom' src={CatalogBottom} />
            <div className="CatalogNav">
                <button onClick={toggleCatalog} className="CloseCatalog">X</button>
                <ul className="LineList">
                    {FurniLines}
                </ul>
            </div>
            {buyDiv && (
                <div className='BuyWindow'>
                    <button onClick={closeBuy} className='InventoryX'>X</button>
                    <h5>Purchase {currentFurni.name} </h5>
                    {accountData.credits < currentFurni.price ? (
                        <>
                            <p>The {currentFurni.name} is {currentFurni.price} credits, you only have {accountData.credits} credits!</p>
                            <button onClick={closeBuy} className='ConfirmBuy'>CLOSE</button>
                        </>
                    ) : (
                        <>

                            <p>Buy 10 {currentFurni.name}'s for {currentFurni.price} credits?</p>
                            <button onClick={buyFurni} className='ConfirmBuy'>BUY 10</button>
                        </>
                    )}
                </div>
            )}
        </div>
    );

}