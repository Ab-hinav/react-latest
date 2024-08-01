import bird from '../src/svg/bird.svg';
import dog from '../src/svg/dog.svg';
import gator from '../src/svg/gator.svg';
import heart from '../src/svg/heart.svg';
import horse from '../src/svg/horse.svg';
import cat from '../src/svg/cat.svg';
import cow from '../src/svg/cow.svg';
import { useState } from 'react';
import './AnimalShow.css';

const svgMap = {
    bird,
    cat,
    cow,
    dog,
    gator,
    horse,
    heart
};


function AnimalShow({ type }) {

    const [click, setClick] = useState(1);

    const handleClick = () => {
        setClick(click + 1);
    }

    return <div className='animal-show' style={{ position: 'relative' }} onClick={handleClick}>
        <img className='animal' src={svgMap[type]}></img>

        <img className='heart' alt='heart' src={heart} style={{
             width: 10 * 1 * click + 'px'
        }} ></img>
    </div>

}

export default AnimalShow;