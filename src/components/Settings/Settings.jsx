import './Settings.css';
import '../../components/Room/Sprite.css';
import Sprites from '../../assets/data/sprites.json';
import Tile from '../../assets/images/homepage/empty_tile.png';
import Left from '../../assets/images/navigator/left.gif';
import Right from '../../assets/images/navigator/right.gif';
import { useState } from 'react';
import * as accountAPI from '../../../utilities/account-api';
import Badges from '../../assets/data/badges.json';

export default function Settings({ sprite, setSprite, setSettingsDiv }) {

    const [isDragging, setIsDragging] = useState(false);
    const [initialX, setInitialX] = useState(0);
    const [initialY, setInitialY] = useState(0);

    const [page, setPage] = useState(true);

    const [spriteSelection, setSpriteSelection] = useState(sprite);
    const [badgeSelection, setBadgeSelection] = useState(0);

    function handleMouseDown(e) {
        setIsDragging(true);
        setInitialX(e.clientX);
        setInitialY(e.clientY);
    };

    function handleMouseUp() {
        setIsDragging(false);
    };

    function handleMouseMove(e) {
        if (isDragging) {
            const consoleElement = document.querySelector('.Settings');
            const newX = e.clientX - initialX + consoleElement.offsetLeft;
            const newY = e.clientY - initialY + consoleElement.offsetTop;
            consoleElement.style.left = newX + 'px';
            consoleElement.style.top = newY + 'px';
            setInitialX(e.clientX);
            setInitialY(e.clientY);
        };
    };

    async function changeSprite() {
        try {
            let response = await accountAPI.changeSprite({ sprite: spriteSelection });
            setSprite(response)
        } catch (error) {
            console.error('error changing sprite'.error)
        }
    };

    const plusSprite = () => {
        if (spriteSelection === 7) {
            setSpriteSelection(0);
        } else {
            setSpriteSelection(prevSpriteSelection => prevSpriteSelection + 1);
        }
    };

    const minusSprite = () => {
        if (spriteSelection === 0) {
            setSpriteSelection(7);
        } else {
            setSpriteSelection(prevSpriteSelection => prevSpriteSelection - 1);
        }
    }


    return (
        <div className='Settings'
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}>
            <button onClick={() => setSettingsDiv(false)} className='InventoryX'>X</button>
            <h4>Settings</h4>
            <div className='SBtns'>
                <button onClick={() => setPage(true)}>Sprite</button>
                <button onClick={() => setPage(false)}>Badges</button>
            </div>

            {page ? (
                <div className='SpriteSettings'>
                    <h3>Change Sprite</h3>

                    <div className='SpriteBox'>
                        <img className={`SpriteShow Sprite${spriteSelection}`} src={Sprites[spriteSelection].stand} draggable="false" />
                        <img onClick={minusSprite} className='SpriteArrow' src={Left} draggable="false" />
                        <img src={Tile} draggable="false" />
                        <img onClick={plusSprite} className='SpriteArrow' src={Right} draggable="false" />
                    </div>
                    <h4>{Sprites[spriteSelection].name}</h4>
                    <button onClick={changeSprite} className='CreateBtn'>Change Sprite</button>
                </div>
            ) : (
                <div className='BadgeSettings'>
                    <ul className='BadgesList'>
                        {Badges.map((badge, index) => (
                            <li
                                className={`BadgeItem ${index === badgeSelection ? 'SelectedBadge' : ''}`}
                                key={index}
                                onClick={() => setBadgeSelection(index)}
                            >
                                <img src={badge.img} alt={badge.name} draggable="false" />
                            </li>
                        ))}
                    </ul>
                    <p>{Badges[badgeSelection].name}</p>
                </div>
            )}
        </div>
    )
}