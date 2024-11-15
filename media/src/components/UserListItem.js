import Button from "./Button";
import { GoTrashcan } from "react-icons/go";
import useThunk from "../hooks/useThunk";
import { removeUser } from "../store/thunks/removeUsers";
import ExpandablePanel from "./ExpandablePanel";
import AlbumsList from "./AlbumsList";

function UserListItem({ user }) {

    const [doRemoveUser, isRemovingUser, removingUserError] = useThunk(removeUser);


    const header = <><Button loading={isRemovingUser} onClick={() => doRemoveUser(user)}>
        <GoTrashcan className="text-red-500"></GoTrashcan>
    </Button>
        <h2>{user.name}</h2>
        {removingUserError && <div>{removingUserError.message}</div>}
    </>

    return (
        <ExpandablePanel header={header}><AlbumsList user={user} /></ExpandablePanel>


    );
}

export default UserListItem;