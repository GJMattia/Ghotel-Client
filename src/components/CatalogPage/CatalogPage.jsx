import './CatalogPage.css';

export default function CatalogPage({ currentPage, currentFurni, setCurrentFurni }) {

    function selectFurni(index) {
        setCurrentFurni(currentPage.furni[index]);
    }

    const Furni = currentPage.furni.map(function (furni, index) {
        const isSelected = currentFurni === furni;

        return (
            <li onClick={() => selectFurni(index)} index={index} key={index} className={`CatalogItem ${isSelected ? 'selected' : ''}`}>
                <img className='FurniIcon' src={furni.icon} />
            </li>
        );
    });



    return (
        <div className='CatalogPage'>
            <img className='LineHeader' src={currentPage.mast} />
            <h4>Select Product:</h4>
            <ul className='CatalogItemList'>
                {Furni}
            </ul>
        </div>
    )
}