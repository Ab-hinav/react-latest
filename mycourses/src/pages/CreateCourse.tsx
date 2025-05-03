import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { Course, userState } from "../store/state";
import axios from "axios";

export default function CreateCourse() {

    const [userAtom] = useRecoilState(userState);
    const [courseDetails, setCourseDetails] = useState<Course>({
        title: "",
        description: "",
        price: 0,
        imageUrl: "",
    } as Course);

    const courseId = useParams().id;

    useEffect(() => {

        if(!userAtom.token) {            
            navigate("/login");
        }

        if(!userAtom.isAdmin) {
            navigate("/login");
        }

        if (courseId) {
            loadCourseDetails(courseId);
        }
    }, [courseId]);

    const loadCourseDetails = async (id: string) => {
        try {
            const response = await axios.get(`http://localhost:3000/api/user/courses/${id}`, {
                headers: {
                    Authorization: `Bearer ${userAtom.token}`
                }
            });
            setCourseDetails(response.data.data);
            console.log(response.data.data);
        } catch (error) {
            console.log(error);
        }
    }

    const navigate = useNavigate();

    if (!userAtom.token) {
        navigate("/login");
    }

    if (!userAtom.isAdmin) {
        navigate("/login");
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {

            let url = "http://localhost:3000/api/admin/course";

            if (courseId) {
                url = `http://localhost:3000/api/admin/course/${courseId}`;

                const response = await axios.put(url, courseDetails, {
                    headers: {
                        Authorization: `Bearer ${userAtom.token}`
                    }
                });
                console.log(response.data);

                if (response.status === 201) {
                    console.log('Course updated');
                    alert('Course updated');
                    navigate("/mycourses");
                }

                return;

            }

            const response = await axios.post(url, courseDetails, {
                headers: {
                    Authorization: `Bearer ${userAtom.token}`
                }
            });
            console.log(response.data);

            if (response.status === 201) {
                console.log('Course created');
                alert('Course created');
                navigate("/mycourses");
            }

        } catch (error) {

            alert('Something went wrong');
            console.log(error);

        }
    }




    return (
        <div>
            <h1>Create Course Page</h1>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col items-center justify-center">
                    <div className="w-full">
                        <label htmlFor="title" className="text-lg font-bold">Title</label>
                        <input type="text" id="title" className="w-full p-2 border-2 border-gray-300 rounded-md" placeholder="Enter your title" value={courseDetails.title} onChange={(e) => setCourseDetails((prevState) => ({ ...prevState, title: e.target.value }))} />
                    </div>
                    <div className="w-full">
                        <label htmlFor="description" className="text-lg font-bold">Description</label>
                        <textarea id="description" className="w-full p-2 border-2 border-gray-300 rounded-md" placeholder="Enter your description" value={courseDetails.description} onChange={(e) => setCourseDetails((prevState) => ({ ...prevState, description: e.target.value }))} />
                    </div>
                    <div className="w-full">
                        <label htmlFor="price" className="text-lg font-bold">Price</label>
                        <input type="number" id="price" className="w-full p-2 border-2 border-gray-300 rounded-md" placeholder="Enter your price" value={courseDetails.price} onChange={(e) => setCourseDetails((prevState) => ({ ...prevState, price: Number(e.target.value) }))} />
                    </div>
                    <div className="w-full">
                        <label htmlFor="imageUrl" className="text-lg font-bold">Image Url</label>
                        <input type="text" id="imageUrl" className="w-full p-2 border-2 border-gray-300 rounded-md" placeholder="Enter your image url" value={courseDetails.imageUrl} onChange={(e) => setCourseDetails((prevState) => ({ ...prevState, imageUrl: e.target.value }))} />
                    </div>
                    <div className="w-full">
                        <button className="bg-black hover:bg-black/80 text-white font-bold py-2 px-4 rounded-md">{courseId ? "Update Course" : "Create Course"}</button>
                    </div>
                </div>
            </form>
        </div>
    )
}