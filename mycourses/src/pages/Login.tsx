import axios, { AxiosError } from "axios";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { userState } from "../store/state";
import { useNavigate } from "react-router-dom";

export default function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [userAtom, setUserAtom] = useRecoilState(userState);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {

            const url = userAtom.isAdmin ? "http://localhost:3000/api/admin/login" : "http://localhost:3000/api/user/login";

            const response = await axios.post(url, {
                username: username,
                password: password
            });

            if (response.status === 200) {
                console.log('Login Successful');
                setUserAtom((prevState) => ({
                    ...prevState,
                    username: username,
                    password: password,
                    token: response.data.token
                }));
                console.log(userAtom);
                if (userAtom.isAdmin) {
                    navigate("/mycourses");
                } else {
                    navigate("/courses");
                }

            }
        } catch (error) {
            console.log(error);
            const err = error as AxiosError;
            if (err.status === 400) {
                console.log('Bad Request');
                // @ts-ignore
                alert(err?.response?.data?.message || 'Bad Request');
                setUserAtom((prevState) => ({
                    ...prevState,
                    username: "",
                    password: "",
                    token: "",
                    isAdmin: false
                }));
            }

            if (err.status === 401) {
                console.log('Invalid Credentials');
                setUserAtom((prevState) => ({
                    ...prevState,
                    username: "",
                    password: "",
                    token: "",
                    isAdmin: false
                }));
                navigate("/");
                alert('Invalid Credentials');
            }
            if (err.status === 500) {
                console.log('Server Error');
                alert('Server Error');
                setUserAtom((prevState) => ({
                    ...prevState,
                    username: "",
                    password: "",
                    token: "",
                    isAdmin: false
                }));
            }

        }

        setUsername("");
        setPassword("");


    };


    return (
        <div className="m-5 h-[70vh] flex flex-col items-center justify-center">
            <div className="border p-2 rounded-md" >
                <h1 className="text-2xl text-center my-6 font-bold" >{userAtom.isAdmin ? "Admin" : ""} Login</h1>
                <div className="flex flex-col items-center justify-center">
                    <div className="w-full">
                        <form className="flex flex-col items-center justify-center" onSubmit={handleSubmit}>
                            <div className="w-[1/2]">
                                <label htmlFor="username" className="text-lg font-bold">Username</label>
                                <input type="username" id="username" className="w-full p-2 border-2 border-gray-300 rounded-md" placeholder="Enter your username" value={username} onChange={(e) => setUsername(e.target.value)} />
                            </div>
                            <div className="w-[1/2] mt-4">
                                <label htmlFor="password" className="text-lg font-bold">Password</label>
                                <input type="password" id="password" className="w-full p-2 border-2 border-gray-300 rounded-md" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <div className="w-[1/2] mt-4">
                                <button className="bg-black hover:bg-black/80 text-white font-bold py-2 px-4 rounded-md">Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    )
}