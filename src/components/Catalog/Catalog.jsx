import './Catalog.css';
import CatalogTop from '../../assets/images/catalog/catalogtop.gif';
import CatalogBottom from '../../assets/images/catalog/CatalogBottom.png';
import Rares from '../../assets/images/catalog/rares.gif';


export default function Catalog({ catalogDiv, setCatalogDiv }) {

    function toggleCatalog() {
        setCatalogDiv(!catalogDiv)
    };

    return (

        <div class="Catalog">
            <img className='test' src={Rares} />
            <h1>MMMMM YE</h1>
            <img className='CatalogTop' src={CatalogTop} />
            <img className='CatalogBottom' src={CatalogBottom} />
            <div class="CatalogNav">

                <button onClick={toggleCatalog} class="CloseCatalog">X</button>
                <ul class="LineList" >
                    <li class="FurniLine">Frontpage</li>
                    <li class="FurniLine">Rares</li>
                    <li class="FurniLine">Halloween</li>
                </ul>
            </div>
        </div>

    )
}