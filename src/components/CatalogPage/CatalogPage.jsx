import './CatalogPage.css';

export default function CatalogPage({ currentPage, currentFurni, setCurrentFurni, CatalogData }) {

    function selectFurni(index) {
        setCurrentFurni(index);
    }


    return (
        <div className='CatalogPage'>
            <img className='LineHeader' src={CatalogData[currentPage].mast} />
            <h4>Select Product:</h4>
            <ul className='CatalogItemList'>
                {CatalogData[currentPage].furni.map((furni, index) => (
                    <li
                        onClick={() => selectFurni(index)}
                        index={index}
                        key={index}
                        className={`CatalogItem ${currentFurni === index ? 'selected' : ''}`}
                    >
                        <img className='FurniIcon' src={furni.icon} />
                    </li>
                ))}
            </ul>
        </div>
    )
}