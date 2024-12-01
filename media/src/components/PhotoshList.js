import { useAddPhotoMutation, useFetchPhotosQuery } from "../store";
import Skeleton from "./Skeleton";
import Button from "./Button";
import PhotoListItem from "./PhotosListItem";


export default function PhotoshList({ album }) {

    let { data, error, isFetching } = useFetchPhotosQuery(album);
    const [addPhoto, addPhotostate] = useAddPhotoMutation();


    const handleAddPhotoClik = () => {
        console.log('clicked');
        addPhoto(album);
    };

    let renderedContent = isFetching ? (
        <div className="grid grid-cols-1 gap-2">
            <Skeleton times={3} className="h-10 w-full bg-inherit"></Skeleton>
        </div>
    ) : <div className="grid grid-cols-4 gap-2">{
        data.map((photo) => {
            return <PhotoListItem key={photo.id} photo={photo}></PhotoListItem>;
        })
    }</div>;

    if (error) {
        renderedContent = <div>Error fetching data: {error.message}</div>;
    }

    return (
        <>
            <div className="flex justify-between">
                <h2 className="font-bold">Photos by {album.name}</h2>{' '}
                <Button className="rounded-md" loading={addPhotostate.isLoading} onClick={() => handleAddPhotoClik()}>+ Add Photo</Button>
            </div>
            {renderedContent}
        </>
    );




}