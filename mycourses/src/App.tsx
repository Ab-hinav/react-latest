
import { BrowserRouter, Route, Routes, } from "react-router-dom"
import Layout from "./pages/Layout"
import Home from "./pages/Home"
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"
import Courses from "./pages/Courses"
import MyCourses from "./pages/MyCourses"
import CreateCourse from "./pages/CreateCourse"
import CourseDetail from "./pages/Course"


function App() {


  return (
    <BrowserRouter >
      <Routes >
        <Route path="/" element={<Layout />} >
          <Route index element={<Home />} />
          <Route path="courses" element={<Courses />} />
          <Route path="courses/:id" element={<CourseDetail />} />
          <Route path="login" element={<Login />} />
          <Route path="signUp" element={<SignUp />} />
          <Route path="mycourses" element={<MyCourses />} />
          <Route path="createcourse/:id?" element={<CreateCourse />} />
          <Route path="*" element={<Home />} />
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App
