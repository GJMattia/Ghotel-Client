import './Settings.css';
import '../../components/Room/Sprite.css';
import Sprites from '../../assets/data/sprites.json';
import Tile from '../../assets/images/homepage/empty_tile.png';
import Left from '../../assets/images/navigator/left.gif';
import Right from '../../assets/images/navigator/right.gif';
import { useState } from 'react';
import * as accountAPI from '../../../utilities/account-api';
import Badges from '../../assets/data/badges.json';
import Rack from '../../assets/images/navigator/sprite.gif';
import Badge from '../../assets/images/navigator/badge.gif';
import Go from '../../assets/images/navigator/go.gif';
import No from '../../assets/images/navigator/no.gif';
import Yes from '../../assets/images/navigator/yes.gif';

export default function Settings({ sprite, setSprite, setSettingsDiv, badges, setBadges }) {

    const [isDragging, setIsDragging] = useState(false);
    const [initialX, setInitialX] = useState(0);
    const [initialY, setInitialY] = useState(0);

    const [page, setPage] = useState(true);

    const [spriteSelection, setSpriteSelection] = useState(sprite);
    const [badgeSelection, setBadgeSelection] = useState(0);

    const [badgeList, setBadgeList] = useState(badges);

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

    async function changeBadges() {
        try {
            let response = await accountAPI.changeBadges(badgeList);
            setBadges(response);
            setSettingsDiv(false);
        } catch (error) {
            console.error('error changing sprite'.error)
        }
    };

    async function changeSprite() {
        try {
            let response = await accountAPI.changeSprite({ sprite: spriteSelection });
            setSprite(response);
            setSettingsDiv(false);
        } catch (error) {
            console.error('error changing sprite'.error)
        }
    };

    const plusSprite = () => {
        if (spriteSelection === 12) {
            setSpriteSelection(0);
        } else {
            setSpriteSelection(prevSpriteSelection => prevSpriteSelection + 1);
        }
    };

    const minusSprite = () => {
        if (spriteSelection === 0) {
            setSpriteSelection(12);
        } else {
            setSpriteSelection(prevSpriteSelection => prevSpriteSelection - 1);
        }
    };

    function addBadge() {
        if (badgeList.length === 6) {
            return;
        }
        if (badgeList.includes(badgeSelection)) {
            return;
        } else {
            let newList = [...badgeList];
            newList.push(badgeSelection);
            setBadgeList(newList);
        }
    };

    function removeBadge() {
        if (!badgeList.length) {
            return;
        } else {
            setBadgeList(badgeList.filter(badge => badge !== badgeSelection));
        }
    };



    return (
        <div className='Settings'
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}>
            <button onClick={() => setSettingsDiv(false)} className='InventoryX'>X</button>
            <h4>Settings</h4>
            <div className='SBtns'>
                <button className={page ? "SBtnSelect" : ""} onClick={() => setPage(true)}>
                    <h4>Sprite</h4>
                    <img src={Rack} draggable="false" />
                </button>
                <button className={!page ? "SBtnSelect" : ""} onClick={() => setPage(false)}>
                    <h4>Badges</h4>
                    <img src={Badge} draggable="false" />
                </button>
            </div>

            {page ? (
                <div className='SpriteSettings'>

                    <div className='SpriteOptions'>
                        <h5>Current Sprite</h5>
                        <h5>Change Sprite</h5>
                    </div>

                    <div className='SpriteBox'>
                        <div className='CurrentSprite'>

                            <img className='EmptyTile' src={Tile} draggable="false" />
                            <img src={Go} draggable="false" />
                            <img className={`SpriteShow Sprite${sprite}`} src={Sprites[sprite].stand} />

                            <h5 className='SpriteName'>{Sprites[sprite].name}</h5>
                        </div>
                        <div className='ChangeSprite'>


                            <img className={`SpriteShow Sprite${spriteSelection}`} src={Sprites[spriteSelection].stand} draggable="false" />
                            <img className='EmptyTile' src={Tile} draggable="false" />
                            <div className='Arrows'>
                                <img onClick={minusSprite} className='SpriteArrow' src={Left} draggable="false" />
                                <img onClick={plusSprite} className='SpriteArrow' src={Right} draggable="false" />
                            </div>
                            <h5 className='SpriteName'>{Sprites[spriteSelection].name}</h5>
                        </div>

                    </div>

                    <button onClick={changeSprite} className='CreateBtn ChangeSpriteBtn'>Change Sprite</button>
                </div>
            ) : (
                <div className='BadgeSettings'>
                    <h5 className='BadgeListTitle'>Select from:</h5>
                    <h5 className='UserBadgesTitle'>Your badges:</h5>
                    <div className='PlayerBadges'>
                        {badgeList.map((badge, index) => (
                            <img src={Badges[badge].img}
                                key={index}
                                draggable="false"
                                onClick={() => setBadgeSelection(badge)}
                                className='PlayersBadges' />

                        ))}
                    </div>
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
                    <div className='BadgeSelection'>
                        <img className='BadgeShow' src={Badges[badgeSelection].img} draggable="false" />
                        <h5 className='BadgeName'>{Badges[badgeSelection].name}</h5>
                        <div className='BadgeChoice'>
                            <img onClick={addBadge} src={Yes} draggable="false" />
                            <img onClick={removeBadge} src={No} draggable="false" />
                        </div>
                    </div>
                    <button onClick={changeBadges} className='CreateBtn SBBtn'>Save Badges</button>
                </div>
            )}
        </div>
    )
}