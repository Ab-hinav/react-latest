import {useDispatch} from "react-redux";
import { changeName, changeCost,addCar } from "../store";
import { useSelector } from "react-redux";

export default function Carform() {

  const dispatch = useDispatch();
  const { name, price } = useSelector((state) => {
    return { name: state.form.name, price: state.form.cost };
  });

  const handleNameChange = (e) => {
    dispatch(changeName(e.target.value));
  };

  const handlePriceChange = (e) => {
    const carCost = parseInt(e.target.value) || 0;
    dispatch(changeCost(carCost));
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    const car = {
      name: name,
      cost: price,
    };
    dispatch(addCar(car));
    console.log(car);
  };


  return (
    <div className="flex flex-col justify-center items-center m-2">
      <h4 className="text-2xl font-bold">My Cars</h4>
      <form className="flex items-center border p-2 rounded-md" onSubmit={handleSubmit} >
        <label className="mr-1 text-lg" >Car Name</label>
        <input className="p-1 mr-1 border rounded-md" type="text" value={name} onChange={handleNameChange} placeholder="Enter car name" />
        <label className="mr-1 text-lg">Car Price</label>
        <input  className="p-1 mr-1 border rounded-md" type="number" value={price || 0} onChange={handlePriceChange} placeholder="Enter car price" />
        <button className="px-3 py-1 bg-black text-white rounded-md hover:text-black hover:bg-white border hover:border-black border-black" type="submit">Add Car</button>
      </form>
    </div>
  );
}
