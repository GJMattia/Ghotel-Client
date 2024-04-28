import './CatalogShowcase.css';

export default function CatalogShowcase({ currentFurni, setBuyDiv }) {

    function openBuy() {
        setBuyDiv(true)
    };

    if (!currentFurni) {
        return null;
    }

    return (
        <div className='CatalogShowcase'>
            <img className='Furni' src={currentFurni.img} />
            <h4 className='FurniTitle'>{currentFurni.name}</h4>
            <p className='FurniDescription'>{currentFurni.description}</p>
            <p className='FurniPrice'>{currentFurni.price} Credits</p>
            <button onClick={openBuy} className='BuyBtn'>BUY 10</button>
        </div>
    )
};