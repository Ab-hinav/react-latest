import Button from "../components/Button";
import { GoBell, GoClockFill, GoDatabase, GoStar, GoCloud } from "react-icons/go";

function ButtonPage() {
    return (
        <div>
            <div>
                <Button onClick={() => alert('clicked')} primary className="m-5" ><GoBell />Click me</Button>
            </div>
            <div>
                <Button secondary ><GoDatabase />Buy Now!</Button>
            </div>
            <div>
                <Button danger ><GoClockFill />See Deal!</Button>
            </div>
            <div>
                <Button warning><GoStar />Hurray!</Button>
            </div>
            <div>
                <Button success outline ><GoStar />look here</Button>
            </div>
            <div>
                <Button danger outline rounded ><GoCloud /> outline</Button>
            </div>
        </div>
    );
}

export default ButtonPage;
