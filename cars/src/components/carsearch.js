import { useSelector,useDispatch } from "react-redux";
import { changeSearchTerm } from "../store";

export default function Carsearch() {

  const dispatch = useDispatch();

  const handleSearch = (e) => {
    console.log(e.target.value);
    dispatch(changeSearchTerm(e.target.value));
  };

  const searchTerm = useSelector((state) => {
    return state.cars.searchTerm;
  });


  return (
    <div>
      <input type="text" value={searchTerm} onChange={handleSearch} className="p-1 border rounded-md" placeholder="Search cars" />
    </div>
  );
}