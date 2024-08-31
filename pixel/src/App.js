import { useState } from "react";
import searchImages from "./api";
import SearchBar from "./components/SearchBar";
import ImageList from "./components/ImageList";

function App() {

    const [images, setImag] = useState([]);

    const searchI = async (term) => {
        console.log(term);
        setImag(await searchImages(term));
    }


    return <div>
        <SearchBar onSubmit={searchI} ></SearchBar>
        <ImageList images={images} ></ImageList>
    </div>
}


export default App;