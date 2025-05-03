import { Link, useNavigate } from "react-router-dom";
import { SiAcademia } from "react-icons/si";
import { SiCloudera } from "react-icons/si";
import { useRecoilState } from "recoil";
import { userState } from "../store/state";

export default function Header() {

    const [userAtom, setUserAtom] = useRecoilState(userState);
    const navigate = useNavigate();

    const handleLogout = () => {
        setUserAtom((prevState) => ({
            ...prevState,
            username: "",
            password: "",
            token: "",
            isAdmin: false
        }));
        navigate("/");
    }

    const handleAdminLogin = () => {
        setUserAtom((prevState) => ({
            ...prevState,
            isAdmin: true
        }));
        navigate("/login");
    }

    const handleAdminSignUp = () => {
        setUserAtom((prevState) => ({
            ...prevState,
            isAdmin: true
        }));
        
        navigate("/signUp");
    }



    return (
        <div className="flex sticky top-0 justify-between w-full items-center mb-10">
            <div className="mt-2 flex justify-between w-full items-center mb-3">
                <div className="flex">
                    <SiAcademia className="text-4xl font-extrabold" />
                    <h2 className="text-4xl font-extrabold">wesome</h2>
                    <SiCloudera className="text-4xl font-extrabold" />
                    <h2 className="text-4xl font-extrabold">ourses</h2>
                </div>
                <div className="flex gap-2">{!userAtom.token ?
                    <Link
                        className="text-blue-500 hover:text-white border-2 rounded p-1 hover:bg-blue-500 "
                        to="/login"
                    >
                        Login
                    </Link> : <button className="text-blue-500 hover:text-white border-2 rounded p-1 hover:bg-blue-500" onClick={handleLogout}> LogOut </button>}
                    {!userAtom.token && <Link
                        className="text-blue-500 hover:text-white border-2 rounded p-1 hover:bg-blue-500 "
                        to="/signUp"
                    >
                        Sign Up
                    </Link>}
                    {!userAtom.token && <Link to="/login" className="text-blue-500 hover:text-white border-2 rounded p-1 hover:bg-blue-500" onClick={handleAdminLogin} >Admin Login</Link>}
                    {!userAtom.isAdmin && <Link to="/signUp" className="text-blue-500 hover:text-white border-2 rounded p-1 hover:bg-blue-500" onClick={handleAdminSignUp} >Admin SignUp</Link>}
                    {userAtom.isAdmin && <Link to="/mycourses" className="text-blue-500 hover:text-white border-2 rounded p-1 hover:bg-blue-500" >MyCourses</Link>}
                </div>
            </div>
        </div>
    );


}