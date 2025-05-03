import { useRecoilState } from "recoil";
import Button from "./Button";
import { userState } from "../store/state";

export default function CourseCard({
    id,
    courseName,
    courseDescription,
    coursePrice,
    status,
}: {
    id: string;
    courseName: string;
    courseDescription: string;
    coursePrice: number;
    status: number;
}) {

    const [userAtom] = useRecoilState(userState);

    const courseStatus = () => {
        if (status === 1) {
            return <p className="text-gray-500">Not Available</p>;
        } else if (status === 0) {
            return <p className="text-gray-500">Available</p>;
        } else if (status === 2) {
            return <p className="text-gray-500">Not Availble</p>;
        }
    };

    const courseButton = () => {
        return (
            <Button to={`/courses/${id}`} rounded={true} outline={true}>
                View Course
            </Button>
        );
    };

    const adminButton = () => {
        return (
            <Button to={`/createcourse/${id}`} rounded={true} outline={true}>
                Edit Course
            </Button>
        );
    };

    return (
        <div className="bg-gray-200 p-3 rounded-md bg-linear-65 from-purple-500 to-pink-500">
            <h3 className="text-xl font-bold">{courseName}</h3>
            <p>{courseDescription}</p>
            <div className="flex gap-2">
                {courseStatus()}
            </div>
            <p>Price: Rs{coursePrice}</p>
            <div className="flex mt-1">{courseButton()}</div>
            {userAtom.isAdmin && <div className="flex mt-2 ">{adminButton()}</div>}
        </div>
    );
}