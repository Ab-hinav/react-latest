import { useRemoveAlbumMutation } from "../store";
import ExpandablePanel from "./ExpandablePanel";
import Button from "./Button";
import { GoTrashcan } from "react-icons/go";
import PhotoshList from "./PhotoshList";

export default function AlbumsListItem({ album }) {

    const [removeAlbum, removeAlbumstate] = useRemoveAlbumMutation();

    const header = <><Button className="rounded-md" isLoading={removeAlbumstate.isLoading} onClick={() => removeAlbum(album)}>
        <GoTrashcan className="text-red-500"></GoTrashcan>
    </Button>
        <h3>{album.name}</h3>
        {removeAlbumstate.error && <div>{removeAlbumstate.error.message}</div>}
    </>

    return <ExpandablePanel key={album.id} header={header} ><PhotoshList album={album}></PhotoshList></ExpandablePanel>;

}