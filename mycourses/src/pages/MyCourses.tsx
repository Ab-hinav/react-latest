import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { Course, currCourseListState, userState } from "../store/state";
import Button from "../components/Button";
import Panel from "../components/Panel";
import CourseCard from "../components/CourseCard";
import { useEffect } from "react";
import axios from "axios";

export default function MyCourses() {

    const [userAtom] = useRecoilState(userState);
    const [courseList, setCourseList] = useRecoilState(currCourseListState);
    const navigate = useNavigate();

    if (!userAtom.token) {
        navigate("/login");
    }

    if(!userAtom.isAdmin) {
        navigate("/login");
    }


    const handleCreateCourseClick = async () => {
        navigate("/createcourse");
    }

    useEffect(() => {
        loadMyCourses();
        if (!userAtom.token) {
            navigate("/login");
        }
    
        if(!userAtom.isAdmin) {
            navigate("/login");
        }
    }, [])

    const loadMyCourses = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/admin/courses/creator', {
                headers: {
                    Authorization: `Bearer ${userAtom.token}`
                }
            });
            if (response.status === 200) {
                console.log('My Courses Loaded');
                console.log(response.data.courses);
                setCourseList(response.data.courses);
            } else {
                alert('Something went wrong');
            }
        } catch (error) {
            console.log(error);
        }
    }



    const prepareCourseData = (courses: Course[]) => {
        const courseList = courses.map((course) => {
            return <CourseCard key={course._id} id={course._id} courseName={course.title} courseDescription={course.description} coursePrice={course.price} status={course.status} />
        })
        return courseList;
    }


    return (
        <div>
            <h1 className="text-2xl font-bold ml-2" >My Courses Page</h1>
            <Panel text={"Created Courses List"} ><Button to={"/createcourse"} rounded={true} primary={true} onClick={handleCreateCourseClick}>Create New Course</Button>
            </Panel>
            <div className="grid grid-cols-2 gap-4 m-3">
                {prepareCourseData(courseList)}
            </div>



        </div>
    )
}