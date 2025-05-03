import { useRecoilState, useRecoilValue } from "recoil";
import Button from "./Button";
import Panel from "./Panel";
import { Course, currCourseListState, userState } from "../store/state";
import CourseCard from "./CourseCard";
import axios from "axios";
import { useEffect } from "react";

export default function CourseList() {

    const [courseList, setCourseList] = useRecoilState(currCourseListState);
    const userAtom = useRecoilValue(userState);


    useEffect(() => {

        handleAllCoursesClick();

    }, [])


    const handleAllCoursesClick = async () => {

        try {
            const response = await axios.get('http://localhost:3000/api/user/courses', {
                headers: {
                    Authorization: `Bearer ${userAtom.token}`
                }
            });

            if (response.status === 200) {
                console.log('My Courses Loaded');
                console.log(response.data.data);
                setCourseList(response.data.data);
            } else {
                alert('Something went wrong');
            }

        } catch (error) {
            console.log(error);
        }



    }


    const handleMyCoursesClick = async () => {

        try {
            const response = await axios.get('http://localhost:3000/api/user/courses/purchase', {
                headers: {
                    Authorization: `Bearer ${userAtom.token}`
                }
            });

            if (response.status === 200) {
                console.log('My Courses Loaded');
                console.log(response.data);
                setCourseList(response.data.data);
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

        if (courseList.length === 0) {
            return <p>No Courses Found</p>
        }

        // console.log(courses);
        return <>
            {courseList}
        </>
    }

    return (
        <div>
            <h1>Course List</h1>
            <Panel text={"Awesome Courses"} ><><Button to={"/courses"} rounded={true} primary={true} onClick={handleAllCoursesClick}>View All Courses</Button>
                <Button to={"/courses"} rounded={true} outline={true} onClick={handleMyCoursesClick}>View My Courses</Button></></Panel>
            <div className="grid grid-cols-2 gap-4 m-3">
                {prepareCourseData(courseList)}
            </div>
        </div>
    )
}