import { useRecoilValueLoadable } from "recoil";
import { multiplePackagesQuery } from "../store/state";
import { PackageDetails } from "../api/types";
import { Link } from "react-router-dom";

const renderedPackageData = (packageDetails: PackageDetails) => {
    return (
        <div className="p-4 border-2 border-gray-300 rounded-md m-2  items-center justify-between" key={packageDetails.name}>
            <div>
                <h3 className="text-3xl font-bold"> {packageDetails.name}</h3>
            </div>
            <div>
                <h3 className="text-lg font-bold">Description</h3>
                <div className="p-3 bg-gray-200 rounded">
                    {packageDetails.description}
                </div>
            </div>
            <div className="mb-3">
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
            <div className="items-center flex justify-center">
            <Link to={`/packages/${packageDetails.name}`} className="bg-black hover:bg-black/80 text-white font-bold py-2 px-4 rounded-md">
                View
            </Link>
            </div>
        </div>
    );
}


export default function HomePage() {

    const vitePackageDetail = useRecoilValueLoadable(multiplePackagesQuery);

    const toRender =(vitePackageDetails: PackageDetails[]) => {
        
        const data = vitePackageDetails.map((packageDetails) => {
        return renderedPackageData(packageDetails);
        })

        return data;
    }


    return (
        <div>
            <h1 className="font-extrabold text-3xl ml-2 mb-2" >Home Page</h1>
            {vitePackageDetail.state === "hasValue" && 
                <div className="grid-cols-2 grid" >
                    { toRender(vitePackageDetail.contents)}
                </div>
            }
        </div>
    )
}