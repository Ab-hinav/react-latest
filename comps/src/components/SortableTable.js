import Button from './Button';
import Table from './Table';

import { GoChevronDown } from "react-icons/go";
import { GoChevronUp } from "react-icons/go";
import useSort from '../hooks/useSort';

function SortableTable(props) {
    const { config, data } = props;

    const { sortedData, sortBy, sortOrder, handleClick } = useSort(data, config);


    function getIcons(label, sortOrder, sortBy) {
        if (sortBy === label) {
            if (sortOrder === 'asc') {
                return <GoChevronUp></GoChevronUp>;
            } else if (sortOrder === 'desc') {
                return <GoChevronDown></GoChevronDown>;
            }
        }
        return <div><GoChevronUp></GoChevronUp><GoChevronDown></GoChevronDown></div>;
    }

    const alteredConfig = config.map((column) => {
        if (column.sortValue) {
            return {
                ...column,
                header: () => (
                    <th className="p-3" key={column.label}>
                        <Button onClick={() => handleClick(column.label)}>
                            {getIcons(column.label, sortOrder, sortBy)}{column.label}
                        </Button>
                    </th>
                ),
            };
        }
        return column;
    });






    return <div><Table {...props} data={sortedData} config={alteredConfig} /></div>;
}

export default SortableTable;
