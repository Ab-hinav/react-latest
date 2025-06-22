import { Card, CardHeader } from "./ui/card";

export default function LeftSidePane(){



    return <div className="w-sm h-full" >

    <Card>
        <CardHeader>
            <h1 className="text-2xl font-bold">Left Side Pane</h1>
        </CardHeader>
        <div className="p-4">
            <p className="text-sm text-gray-500">This is the left side pane</p>
        </div>
        
    </Card>


    </div>



}