import { Fragment } from 'react';

function Table({ data, config, keyFn }) {
  const renderHeaders = config.map((colHeader) => {
    if (colHeader.header) {
      return <Fragment key={colHeader.label}>{colHeader.header()}</Fragment>;
    }

    return (
      <th className="p-3" key={colHeader.label}>
        {colHeader.label}
      </th>
    );
  });

  const renderedRows = () => {
    return data.map((row) => {
      const renderedRow = config.map((colHeader) => {
        return <td className="p-3">{colHeader.render(row)}</td>;
      });

      return (
        <tr className="border-b" key={keyFn(row)}>
          {renderedRow}
        </tr>
      );
    });
  };

  return (
    <table className="table-auto border-spacing-2  ">
      <thead>
        <tr className="border-b-2">{renderHeaders}</tr>
      </thead>
      <tbody>{renderedRows()}</tbody>
    </table>
  );
}

export default Table;
