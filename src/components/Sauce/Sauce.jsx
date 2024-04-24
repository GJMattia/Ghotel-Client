// import './Sauce.css';
import Furniture from '../../assets/data/furni.json';


export default function Sauce() {

    const roomSize = [
        [0], [], [2], [], [], [17, 0], [], [], [16], [], [], [], [],
        [], [], [], [], [], [17], [], [], [17], [], [], [1], [],
        [], [], [], [9], [], [], [], [], [], [3], [], [], [],
        [1], [], [], [], [], [], [20, 20], [], [], [4], [], [1], [],
        [], [], [], [11], [], [], [], [], [15], [5], [], [], [],
        [1], [], [], [], [6], [8], [7], [], [], [], [], [1], [],
        [], [], [], [], [], [], [], [19], [], [], [], [], [],
        [1], [], [], [20], [], [], [], [], [], [2], [], [1], []
    ];

    const handleTileClick = (index, event) => {
        const clickedArray = roomSize[index];
        console.log(`Clicked tile index: ${index}, Content:`, clickedArray);
    };


    return (
        <div className='Sauce'>

            <div className='RoomBox'>

                <div className='Room'>
                    {roomSize.map((tile, index) => (
                        <div
                            key={index}
                            index={index}
                            className='Tile'
                            onClick={(event) => handleTileClick(index, event)}
                        >
                            {tile.map((value, innerIndex) => (
                                <div key={innerIndex} className="Test400"  >
                                    <div className='Test300' style={{ bottom: `${innerIndex + .6}rem` }}>
                                        <img className='FurniImg' src={Furniture[value].img} />
                                    </div>
                                </div>
                            ))}


                        </div>
                    ))}
                </div>


            </div>
        </div>
    )
}