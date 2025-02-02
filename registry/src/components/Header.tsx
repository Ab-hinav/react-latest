
import { Link } from "react-router-dom";
import SearchInput from "./SearchInput";

export default function Header() {
    return (
        <div className="flex justify-start items-center">
            <div className="w-full font-extrabold text-2xl py-3 pl-2 flex items-center" >
            <Link to="/" >NPM Registry</Link>
            </div>
            <div className="w-full py-3 ml-2 mr-2" >
            <SearchInput />
            </div>
        </div>
    )
}