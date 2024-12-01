import { useRemovePhotoMutation } from "../store";
import { GoTrashcan } from "react-icons/go";


export default function PhotosListItem({ photo }) {


    const [removePhoto, removePhotostate] = useRemovePhotoMutation();

    const handleRemovePhoto = (photo) => {
        removePhoto(photo);
    };



    return (
        <div  className="m-2 relative cursor-pointer" >
            <img src={photo.data} alt="photo" className="w-fit h-fit object-cover"></img>
            <div onClick={()=>handleRemovePhoto(photo)} className="absolute inset-0 flex items-center justify-center hover:bg-gray-400 opacity-0 hover:opacity-80 w-[150px] h-[150px] ">
                <GoTrashcan className="text-3xl"></GoTrashcan>
            </div>
        </div>
    );
}