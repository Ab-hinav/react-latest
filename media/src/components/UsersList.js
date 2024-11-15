import { useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchUsers, addUser } from "../store";
import Button from "./Button";
import Skeleton from "./Skeleton";
import useThunk from "../hooks/useThunk";
import UserListItem from "./UserListItem";


export default function UsersList() {

    const [doFetchUsers, isLoadingUsers, loadingUsersError] = useThunk(fetchUsers);
    const [doAddUser, isCreatingUser, creatingUserError] = useThunk(addUser);

    const { data } = useSelector((state) => {
        return state.users;
    });



    useEffect(() => {
        doFetchUsers();
    }, [doFetchUsers]);

    const handleAddUser = () => {
        console.log('clicked');
        doAddUser();
    };



    const renderUsers = () => {
        return data.map((user) => {
            return (
                <UserListItem user={user}></UserListItem>
            );
        });
    };

    let renderedContent = isLoadingUsers ? (
        <div className="grid grid-cols-1 gap-2">
            <Skeleton times={4} className="h-10 w-full"></Skeleton>
        </div>
    ) : renderUsers();

    if (loadingUsersError || creatingUserError) {
        renderedContent = loadingUsersError ? (
            <div>Error fetching data: {loadingUsersError.message}</div>
        ) : (
            <div>Error creating user: {creatingUserError.message}</div>
        );
    }



    return (
        <div className="p-2">
            <div className="flex items-center justify-between p-3">
                <h2>List Of Users</h2>{' '}

                <Button loading={isCreatingUser} onClick={() => handleAddUser()}>
                    + Add User
                </Button>

            </div>
            <div className="grid grid-cols-1 gap-2">{renderedContent}</div>
        </div>
    );
}