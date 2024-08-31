import { useState } from "react";
import './SearchBar.css'

function SearchBar({ onSubmit }) {


    const [term, setTerm] = useState('');

    const handleFormSubmit = (event) => {
        event.preventDefault();
        onSubmit(term)
    }

    const handleChange = (event) => {
        setTerm(event.target.value);
    }


    return <div className="search-bar">SearchBar
        <form onSubmit={handleFormSubmit}  >
            <input value={term} onChange={handleChange} />
            <button onClick={onSubmit} > submit</button>
        </form>
        
    </div>
}


export default SearchBar;