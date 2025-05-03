import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div >
            <div
                className="p-3"
                style={{
                    // @ts-ignore
                    "background-image": "url('https://picsum.photos/200/300')",
                    width: '100%',
                    height: '70vh',
                }}
            >
                <h1 className="text-3xl font-bold">Home Page</h1>
                <p className="text-xl mb-3">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    elementum, nulla vitae tincidunt tincidunt, justo ipsum
                    condimentum quam, quis dapibus metus turpis at eros. Sed
                    elementum, nulla vitae tincidunt tincidunt, justo ipsum
                    condimentum quam, quis dapibus metus turpis at eros. Sed
                    lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    elementum, nulla vitae tincidunt tincidunt, justo ipsum
                    condimentum.
                </p>

                <div className="flex items-center justify-center">
                    <Link to="/courses" className="bg-blue hover:bg-white text-white hover:text-black font-bold py-2 px-4 rounded-md">
                        View Courses
                    </Link>
                </div>
            </div>
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-xl font-bold mb-1">Awesome Courses</h1>
                <div className="m-1">
                    <p>A collection of awesome courses for developers.</p>
                </div>
            </div>
        </div>
    );
}