import Dropdown from "../components/Dropdown";
import { useState } from 'react';

function DropdownPage() {


    const options = [
        { id: 1, name: 'Option 1', value: 'op1' },
        { id: 2, name: 'Option 2' , value: 'op2' },
        { id: 3, name: 'Option 3' , value: 'op3' },
      ];

      const [selectedOption, setSelectedOption] = useState(null);

      const handleOptionClick = (option) => {
        setSelectedOption(option);
      };

    return (
        <div className="flex" >
            <Dropdown options={options} value={selectedOption} onChange={handleOptionClick} />
            <Dropdown options={options} value={selectedOption} onChange={handleOptionClick} />
        </div>
    );
}

export default DropdownPage;
