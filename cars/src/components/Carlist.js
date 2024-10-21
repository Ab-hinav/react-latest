import { useSelector } from "react-redux";
import { removeCar } from "../store";
import { useDispatch } from "react-redux";
import Carsearch from "./carsearch";

export default function Carlist() {

  const dispatch = useDispatch();

  const {cars,name} = useSelector(({ form,cars: { data, searchTerm } }) => {
    const filteredCars =  data.filter((car) => {
      return car.name.toLowerCase().includes(searchTerm.toLowerCase());
    });

    return {
      cars: filteredCars,
      name: form.name,
    }
  });


  const handleCarDelete = (id) => {
    dispatch(removeCar(id));
  };


  const renderCars = () => {
    return cars.map((car) => {
      const carTextClasses = name && car.name.toLowerCase().includes(name.toLowerCase()) ? "text-xl font-bold" : "text-xl";
      return (
        <div key={car.id} className="flex justify-between  gap-2 m-2">
          <p className={carTextClasses}>
            {car.name} - ${car.cost}
          </p>
          <button
            className="px-3  bg-black text-white rounded-md hover:text-black hover:bg-white border hover:border-black border-black"
            onClick={() => handleCarDelete(car.id)}
          >
            Remove
          </button>
        </div>
      );
    });
  };

  console.log(cars);

  const content = <div className="flex flex-col  justify-center m-2 border rounded-md ">
    <div className="flex justify-around items-center">
  <h1 className="text-4xl text-center font-extrabold m-2" >Carlist</h1>
  <Carsearch></Carsearch>
  </div>
  {renderCars()}
</div>

  return (
    <> {cars.length>=0 ? content : null}</>
  );
}