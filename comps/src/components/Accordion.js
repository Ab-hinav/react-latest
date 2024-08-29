import { GoChevronDown, GoChevronLeft } from 'react-icons/go';
import { useState } from 'react';
import classNames from 'classnames';

function Accordion({ items }) {

  const [active, setActive] = useState(null);
  const h3Classes = classNames('text-2xl font-bold flex justify-between p-2');

  const handleClick = (id) => {
    // this is the most recent value of active
    setActive((prevActive) => {
        if (prevActive === id) {
            return null;
        }
        return id;
    });

    
  };

  const renderedItems = items.map((item) => {
    

    const isSelected = active === item.id;
    const divClasses = classNames(
        'bg-black text-white border-b-2 border-gray-400 cursor-pointer',
        {
          'my-2': isSelected,
        }
      );

    return (
        <div className={divClasses} key={item.id} onClick={() => handleClick(item.id)} >
            <h3 className={h3Classes} >
                {item.header}
                {isSelected ? <GoChevronDown /> : <GoChevronLeft />}
            </h3>
            {isSelected && <div  className='p-5 bg-gray-700 border-b'>
                {item.content} </div>}
        </div>
    );
  });

  return (
    <div className="p-5 bg-slate-600 rounded-lg border-2 border-slate-800">
      {renderedItems}
    </div>
  );
}

export default Accordion;
