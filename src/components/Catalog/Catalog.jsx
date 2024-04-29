import './Catalog.css';
import CatalogTop from '../../assets/images/catalog/catalogtop.gif';
import CatalogBottom from '../../assets/images/catalog/CatalogBottom.png';
import CatalogPage from '../CatalogPage/CatalogPage';
import CatalogShowcase from '../CatalogShowcase/CatalogShowcase';
import { useState } from 'react';
import CatalogData from '../../assets/data/catalog.json';
import * as accountAPI from '../../../utilities/account-api';
import buySound from '../../assets/audio/buy.mp3'

export default function Catalog({ catalogDiv, setCatalogDiv, credits, setCredits, setInventory }) {

    const [currentPage, setCurrentPage] = useState(0);
    const [currentFurni, setCurrentFurni] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [initialX, setInitialX] = useState(0);
    const [initialY, setInitialY] = useState(0);
    const [buyDiv, setBuyDiv] = useState(false);

    async function buyFurni() {
        try {
            let newIC = await accountAPI.buyFurni({ itemID: CatalogData[currentPage].furni[currentFurni].itemid, itemPrice: CatalogData[currentPage].furni[currentFurni].price });
            const audio = new Audio(buySound);
            audio.play();
            setInventory(newIC.inventory);
            setCredits(newIC.credits);
            setBuyDiv(false);
        } catch (error) {
            console.error('error buying furni'.error)
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
        setCurrentPage(index);
        setCurrentFurni(0);
    }

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
            <CatalogPage CatalogData={CatalogData} currentPage={currentPage} setCurrentFurni={setCurrentFurni} currentFurni={currentFurni} />
            <CatalogShowcase currentPage={currentPage} CatalogData={CatalogData} setBuyDiv={setBuyDiv} currentFurni={currentFurni} />
            <img className='CatalogTop' src={CatalogTop} />
            <img className='CatalogBottom' src={CatalogBottom} />
            <div className="CatalogNav">
                <button onClick={toggleCatalog} className="CloseCatalog">X</button>
                <ul className="LineList">
                    {CatalogData.map((item, index) => (
                        <li
                            onClick={() => selectPage(index)}
                            index={index}
                            key={item.name}
                            className={`FurniLine ${currentPage === index ? 'selected' : ''}`}
                        >
                            {item.name}
                        </li>
                    ))}
                </ul>
            </div>
            {buyDiv && (
                <div className='BuyWindow'>
                    <button onClick={closeBuy} className='InventoryX'>X</button>
                    <h5>Purchase {currentFurni.name} </h5>
                    {credits < currentFurni.price ? (
                        <>
                            <p>The {CatalogData[currentPage].furni[currentFurni].name} is {CatalogData[currentPage].furni[currentFurni].price} credits, you only have {credits} credits!</p>
                            <button onClick={closeBuy} className='ConfirmBuy'>CLOSE</button>
                        </>
                    ) : (
                        <>

                            <p>Buy 10 {CatalogData[currentPage].furni[currentFurni].name}'s for {CatalogData[currentPage].furni[currentFurni].price} credits?</p>
                            <button onClick={buyFurni} className='ConfirmBuy'>BUY 10</button>
                        </>
                    )}
                </div>
            )}
        </div>
    );

}