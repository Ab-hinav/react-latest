import { useNavigate, useParams } from "react-router-dom";
import { useRecoilRefresher_UNSTABLE, useRecoilState, useRecoilValueLoadable } from "recoil";
import { courseDetailsQuery, userState } from "../store/state";
import Button from "../components/Button";
import axios from "axios";

export default function CourseDetail() {


    const { id } = useParams();

    const courseLoadable = useRecoilValueLoadable(courseDetailsQuery(id || ''));
    const refresh = useRecoilRefresher_UNSTABLE(courseDetailsQuery(id || ''));
    const courseDetailValue = courseLoadable.contents;
    const [userAtom] = useRecoilState(userState);
    const navigate = useNavigate();


    if (courseLoadable.state === 'loading') {
        return <p className="text-center text-gray-500 text-xl m-2" >Loading course details...</p>;
    }

    if (courseLoadable.state === 'hasError') {
        return <p className="text-center text-gray-500 text-xl m-2">Failed to load course. Please try again later.</p>;
    }

    if (!userAtom.token) {
        navigate("/login");
    }

    const handleBuyClick = async () => {
        console.log('Buy Clicked');

        try {

            const response = await axios.post(
                `http://localhost:3000/api/user/courses/purchase/${id}`, {},
                {
                    headers: {
                        Authorization: `Bearer ${userAtom.token}`,
                    },
                }
            );

            console.log(response.data);

            if (response.status === 201) {
                console.log('Course Purchased');
                alert('Course Purchased');
                refresh();
            }

        } catch (error) {

            alert('Something went wrong');
            console.log(error);

        }


    }

    return (
        <div className="container mx-auto px-20 border-2 border-gray-300 rounded-md m-2">
            <img src={courseDetailValue.data.imageUrl} alt="course image" className="p-2 w-full h-60 object-cover" />
            <h1 className="text-3xl font-bold mb-2">{courseDetailValue.data.title}</h1>
            <p className="text-xl mb-2"> Course Description {courseDetailValue.data.description}</p>
            <div className="flex gap-1 flex-col">
                { courseDetailValue.data.status === 0 ? <Button to={``} onClick={handleBuyClick} rounded={true} primary={true} className="w-full max-w-24">Buy Now</Button> : <p className="text-gray-500">Not Available Yet</p> }
                <div className="" > Created By {courseDetailValue.data.creatorId.username}</div>
            </div>
        </div>
    )
}