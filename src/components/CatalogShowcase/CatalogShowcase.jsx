import './CatalogShowcase.css';

export default function CatalogShowcase({ currentFurni, setBuyDiv, CatalogData, currentPage }) {

    function openBuy() {
        setBuyDiv(true)
    };
    CatalogData[currentPage].furni[currentFurni].itemid
    return (
        <div className='CatalogShowcase'>
            <img className='Furni' src={CatalogData[currentPage].furni[currentFurni].img} />
            <h4 className='FurniTitle'>{CatalogData[currentPage].furni[currentFurni].name}</h4>
            <p className='FurniDescription'>{CatalogData[currentPage].furni[currentFurni].description}</p>
            <p className='FurniPrice'>{CatalogData[currentPage].furni[currentFurni].price} Credits</p>
            <button onClick={openBuy} className='BuyBtn'>BUY</button>
        </div>
    )
};
