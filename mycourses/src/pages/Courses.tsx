import { useRecoilState } from "recoil";
import { userState } from "../store/state";
import { useNavigate } from "react-router-dom";
import CourseList from "../components/CourseList";

export default function Courses() {

    const [userAtom] = useRecoilState(userState);
    const navigate = useNavigate();

    console.log(JSON.stringify(userAtom));

    if (!userAtom.token) {
        navigate("/login");
    }



    return (
        <div>
            <h1 className="text-2xl font-bold " >Courses Page</h1>
            <CourseList />


        </div>
    )
}