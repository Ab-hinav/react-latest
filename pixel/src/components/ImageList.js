import ImageShow from "./ImageShow";
import './ImageList.css'
function ImageList({ images }) {


    // console.log(images.data.results);
    const renderedImages = images.map((image) => <ImageShow image={image} key={image.id} ></ImageShow>)

    console.log(images.length);
    return <div className="image-list" >
        {renderedImages}
        </div>
}


export default ImageList;