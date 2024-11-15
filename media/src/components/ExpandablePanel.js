
import { useState } from 'react';
import { GoChevronDown, GoChevronLeft } from 'react-icons/go';

function ExpandablePanel({ header, children }) {

    const [isExpanded, setIsExpanded] = useState(false);


    return (<div className="w-full bg-gray-400 h-full rounded p-1 " >
        <div className="flex items-center justify-between p-1" onClick={() => console.log('clicked')}>
            <div className="flex gap-2 items-center"  >
                {header}
            </div>
            <div onClick={() => setIsExpanded(!isExpanded)} className="flex items-center justify-center cursor-pointer">
            {isExpanded ? <GoChevronDown className="text-blue-500"></GoChevronDown> : <GoChevronLeft className="text-blue-500"></GoChevronLeft>}
            </div>
        </div>
        { isExpanded && <div className="p-2 border-t">
            {children}
        </div>}

    </div>
    )

}

export default ExpandablePanel;