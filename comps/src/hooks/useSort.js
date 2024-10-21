
import { useState } from 'react';

function useSort(data, config) {

    const [sortBy, setSortBy] = useState(null);
    const [sortOrder, setSortOrder] = useState(null);

    let sortedData = data;
    if (sortBy && sortOrder) {
        const { sortValue } = config.find((c) => c.label === sortBy);
        sortedData = [...data].sort((a, b) => {
            const aValue = sortValue(a);
            const bValue = sortValue(b);

            const sortO = sortOrder === 'asc' ? 1 : -1;

            if (typeof aValue === 'string') {
                return aValue.localeCompare(bValue) * sortO;
            }
            return (aValue - bValue) * sortO;
        });
    }


    const handleClick = (label) => {
        if (sortBy === label) {
            if (sortOrder === null) {
                setSortOrder('asc');
                setSortBy(label);
            } else if (sortOrder === 'asc') {
                setSortOrder('desc');
                setSortBy(label);
            } else if (sortOrder === 'desc') {
                setSortOrder(null);
                setSortBy(null);
            }
        } else {
            setSortOrder('asc');
            setSortBy(label);
        }
    };

    return { sortedData, sortBy, sortOrder, handleClick };

}

export default useSort;