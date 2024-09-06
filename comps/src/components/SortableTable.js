import Button from './Button';
import Table from './Table';
import { useState } from 'react';
import { GoChevronDown } from "react-icons/go";
import { GoChevronUp } from "react-icons/go";

function SortableTable(props) {
  const { config ,data} = props;

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
              {getIcons(column.label,sortOrder,sortBy)}{column.label}
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
