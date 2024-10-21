import { useSelector } from 'react-redux';

export default function Totalvalue() {
  const totalCost = useSelector(({ cars: { data, searchTerm } }) => {
    return data
      .filter((car) => {
        return car.name.toLowerCase().includes(searchTerm.toLowerCase());
      })
      .reduce((acc, car) => {
        return acc + car.cost;
      }, 0);
  });

  return (
    <div>
      <h1>Total Cost: ${totalCost}</h1>
    </div>
  );
}
