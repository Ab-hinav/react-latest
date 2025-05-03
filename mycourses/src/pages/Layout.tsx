
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Layout() {
    return (
        <div className="bg-[#F2F2F2] flex ">
        <div className=" mx-auto flex flex-col px-20 my-auto">
          <Header />
          <Outlet />
          <Footer />
        </div>
        </div>
        
    )
}