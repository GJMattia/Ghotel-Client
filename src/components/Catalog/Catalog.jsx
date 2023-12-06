import './Catalog.css';
import CatalogTop from '../../assets/images/catalog/catalogtop.gif';
import CatalogBottom from '../../assets/images/catalog/CatalogBottom.png';
import CatalogPage from '../CatalogPage/CatalogPage';
import CatalogShowcase from '../CatalogShowcase/CatalogShowcase';
import { useState } from 'react';
import catalogData from '../../assets/data/catalog.json';


export default function Catalog({ catalogDiv, setCatalogDiv }) {

    const [currentPage, setCurrentPage] = useState(catalogData[0]);
    const [currentFurni, setCurrentFurni] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [initialX, setInitialX] = useState(0);
    const [initialY, setInitialY] = useState(0);

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
            className="Catalog">
            <CatalogPage currentPage={currentPage} setCurrentFurni={setCurrentFurni} currentFurni={currentFurni} />
            <CatalogShowcase currentFurni={currentFurni} />
            <img className='CatalogTop' src={CatalogTop} />
            <img className='CatalogBottom' src={CatalogBottom} />
            <div className="CatalogNav">

                <button onClick={toggleCatalog} className="CloseCatalog">X</button>
                <ul className="LineList" >
                    {FurniLines}
                </ul>
            </div>
        </div>

    )
}