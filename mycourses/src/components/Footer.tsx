import { Link } from "react-router-dom";

export default function Footer() {
    return (
      <div className="mt-10 mb-10 flex flex-col justify-center items-center w-full h-20 bg-gray-100">
        <div className="grid grid-cols-4 gap-4 w-full m-3">
          <div className="col-span-1">
            <h3 className="text-xl font-bold">About</h3>
            <p className="text-gray-500 text-xs">
              Wesome is a platform that provides a one-stop solution for all
              your learning needs. Whether you're a student, a professional, or
              a teacher, we have got you covered.
            </p>
          </div>
          <div className="col-span-1">
            <h3 className="text-xl font-bold">Explore</h3>
            <div className=" flex flex-col">
                <div>
              <Link
                to="/courses"
                className=" text-blue-500 hover:text-white   hover:bg-blue-500"
              >
                Courses
              </Link>
            </div>
            <div>
              <Link
                to="/mycourses"
                className=" text-blue-500 hover:text-white   hover:bg-blue-500"
              >
                My Courses
              </Link>
              </div>
              <div>
              <Link
                to={'/login'}
                className="text-blue-500 hover:text-white   hover:bg-blue-500"
              >
                My Profile
              </Link>
              </div>
            </div>
          </div>
          <div className="col-span-1">
            <h3 className="text-xl font-bold">Useful Links</h3>
            <div className=" flex flex-col">
              <div>
                <Link
                  to="/about"
                  className=" text-blue-500 hover:text-white   hover:bg-blue-500"
                >
                  About Us
                </Link>
              </div>
              <div>
                <Link
                  to="/contact"
                  className=" text-blue-500 hover:text-white   hover:bg-blue-500"
                >
                  Contact Us
                </Link>
                </div>
                <div>
                  <Link
                    to="/faq"
                    className=" text-blue-500 hover:text-white   hover:bg-blue-500"
                  >
                    FAQ
                  </Link>
                </div>
            </div>
          </div>
          <div className="col-span-1">
            <h3 className="text-xl font-bold">Contact Info</h3>
            <p className="text-gray-500 text-xs">
              Email: contact@wesome.io
            </p>
          </div>
        </div>
        <p className="text-center text-gray-500 text-xs">
          Copyright © 2023 Wesome. All rights reserved.
        </p>
      </div>
    );
}