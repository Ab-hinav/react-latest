
import { useParams } from "react-router-dom";
import { useRecoilValueLoadable } from "recoil";
import { packageDetailsQuery } from "../store/state";
import { PackageDetails } from "../api/types";

const renderedPackageData = (packageDetails: PackageDetails) => {
    return (
        <div className="p-4 border-2 border-gray-300 rounded-md m-2  items-center justify-between">
            <div>
                <h3 className="text-3xl font-bold">Name</h3>
                <div className="p-3 bg-gray-200 rounded">
                    {packageDetails.name}
                </div>
            </div>
            <div>
                <h3 className="text-lg font-bold">Description</h3>
                <div className="p-3 bg-gray-200 rounded">
                    {packageDetails.description}
                </div>
            </div>
            <div>
                <h3 className="text-lg font-bold">Lisence</h3>
                <div className="p-3 bg-gray-200 rounded">
                    {packageDetails.license}
                </div>
                <div>
                    <h3 className="text-lg font-bold">Author</h3>
                    <div className="p-3 bg-gray-200 rounded">
                        {packageDetails.author?.name}
                    </div>
                </div>
            </div>
        </div>
    );
}


export default function DetailsPage() {

    const { name } = useParams();
    const packageDetailsResp = useRecoilValueLoadable(packageDetailsQuery(name || ''));

    return (
        <div>
            <h1 className="text-2xl font-bold ml-2" >Details Page</h1>
            {packageDetailsResp.state === "hasValue" && renderedPackageData(packageDetailsResp.contents)}
        </div>
    )
}