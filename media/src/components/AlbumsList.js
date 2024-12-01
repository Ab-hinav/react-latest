import { useFetchAlbumsQuery, useAddAlbumMutation } from "../store";
import Skeleton from "./Skeleton";
import Button from "./Button";
import AlbumsListItem from "./AlbumsListItem";

function AlbumsList({ user }) {

    let { data, error, isFetching } = useFetchAlbumsQuery(user);
    const [addAlbum, addAlbumstate] = useAddAlbumMutation();

    // tag useFetchAlbumsQuery

    // console.log(data, error, isFetching);

    const handleAddAlbumClik = () => {
        console.log('clicked');
        addAlbum(user);
    };



    let renderedContent = isFetching ? (
        <div className="grid grid-cols-1 gap-2">
            <Skeleton times={3} className="h-10 w-full bg-inherit"></Skeleton>
        </div>
    ) : (
        data.map((album) => {

            return <AlbumsListItem key={album.id} album={album}></AlbumsListItem>;
        })
    );

    if (error) {
        renderedContent = <div>Error fetching data: {error.message}</div>;
    }


    return (
        <div>
            <div className="flex justify-between">
                <h2 className="font-bold">Albums by {user.name}</h2>{' '}
                <Button className="rounded-md" loading={addAlbumstate.isFetching} onClick={() => handleAddAlbumClik()}>+ Add Album</Button>
            </div>
            <div>{renderedContent}</div>
        </div>
    );
}

export default AlbumsList;