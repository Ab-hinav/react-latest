
import Link from "./components/Link";
import AccordionPage from "./pages/AccordionPage";
import ButtonPage from "./pages/ButtonPage";
import DropdownPage from "./pages/DropdownPage";
import Route from "./components/Route";
import Sidebar from "./components/Sidebar";

function App() {


    return (
        <div className="container mx-auto grid grid-cols-6 gap-4 mt-4">
           <Sidebar ></Sidebar>
            <div className="col-span-5">
                <Route path="/accordion"><AccordionPage /></Route>
                <Route path="/button"><ButtonPage /></Route>
                <Route path="/"><DropdownPage /></Route>
            </div>
        </div>
    );
}

export default App;
