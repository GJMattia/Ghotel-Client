import './Catalog.css';
import CatalogTop from '../../assets/images/catalog/catalogtop.gif';
import CatalogBottom from '../../assets/images/catalog/CatalogBottom.png';
import CatalogPage from '../CatalogPage/CatalogPage';
import CatalogShowcase from '../CatalogShowcase/CatalogShowcase';
import { useState } from 'react';
import catalogData from '../../assets/data/catalog.json';


export default function Catalog({ catalogDiv, setCatalogDiv }) {

    const [currentPage, setCurrentPage] = useState(catalogData[1]);

    const [currentFurni, setCurrentFurni] = useState(0);

    function selectPage(index) {
        setCurrentPage(catalogData[index]);
    }

    const FurniLines = catalogData.map(function (item, index) {
        return (
            <li onClick={() => selectPage(index)} index={index} key={item.name} className="FurniLine">
                {item.name}
            </li>
        );
    });



    function toggleCatalog() {
        setCatalogDiv(!catalogDiv)
    };


    return (

        <div className="Catalog">
            <CatalogPage currentPage={currentPage} setCurrentFurni={setCurrentFurni} />
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