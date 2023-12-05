import './CatalogPage.css';

export default function CatalogPage({ currentPage, setCurrentFurni }) {

    function selectFurni(index) {
        setCurrentFurni(currentPage.furni[index]);
    }

    const Furni = currentPage.furni.map(function (furni, index) {
        return (
            <li onClick={() => selectFurni(index)} index={index} key={index} className="FurniIcon">
                <img className='FurniIcon' src={furni.icon} />
            </li>
        );
    });



    return (
        <div className='CatalogPage'>
            <img className='LineHeader' src={currentPage.mast} />
            <p>{currentPage.description}</p>
            <h4>Select Product:</h4>
            <ul className='CatalogItemList'>
                {Furni}
            </ul>
        </div>
    )
}