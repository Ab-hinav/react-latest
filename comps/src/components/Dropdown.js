import { useState, useEffect, useRef } from 'react';
import { GoChevronDown } from 'react-icons/go';
import Panel from './Panel';

function Dropdown({ options, onChange, value }) {

  const [isOpen, setIsOpen] = useState(false);
  const divEl = useRef();

  const handleOptionClick = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  const renderOptions = options.map((option) => {
    return (
      <div
        className="p-2 hover:bg-blue-300 cursor-pointer rounded-sm"
        key={option.id}
        onClick={() => handleOptionClick(option)}
      >
        {option.name}
      </div>
    );
  });


  useEffect(() => {
    const handler = (event) => {
      if (!divEl.current) {
        return;
      }

      if (divEl.current.contains(event.target)) {
        return;
      }
      setIsOpen(false);
    };

    document.addEventListener('click', handler);

    return () => {
      document.removeEventListener('click', handler);
    };
  }, []);

  return (
    <div ref={divEl} className=" w-48 relative  ">
      <Panel
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setIsOpen((isOpen) => !isOpen)}
      >
        {value ? value.name : 'Select an option'}
        <GoChevronDown />
      </Panel>
      {isOpen && <Panel className="absolute top-full ">{renderOptions}</Panel>}
    </div>
  );
}

export default Dropdown;
