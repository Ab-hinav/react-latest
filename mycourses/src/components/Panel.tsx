import { ReactNode } from "react";
import Button from "./Button";

export default function Panel({text,children}:{text:string,children:ReactNode}) {


    return (
        <div className="flex justify-between items-center" >
            <h1 className="text-3xl font-bold mb-1">{text}</h1>
            <div className="flex" >
            {children}
            </div>
        </div>
    );
}