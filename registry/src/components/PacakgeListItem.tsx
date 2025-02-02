
import { Link } from "react-router-dom";
import { ResponseObject } from "../store/state";


export default function PackageListItem({ packageObject }: { packageObject: ResponseObject }) {
    return (
        <div className="p-4 border-2 border-gray-300 rounded-md m-2 flex items-center justify-between">
            <div className="w-3/4">
                <Link to={`/packages/${packageObject.package.name}`} className="font-bold">{packageObject.package.name}</Link>
                <p>{packageObject.package.description}</p>
                <p>Version: {packageObject.package.version}</p>
                <div className="flex gap-1">
                    {packageObject.package.keywords?.map((keyword, index) => {
                        if (index > 1) return;
                        return (
                            <div className="bg-gray-200  p-2 rounded-md border-2 border-gray-300">
                                {keyword}
                            </div>
                        );
                    })}
                </div>
                <p>Downloads: {packageObject.downloads.monthly} downloads/month</p>
            </div>
            <div className="w-1/4 flex justify-center">
                <Link to={`/packages/${packageObject.package.name}`} className="bg-black hover:bg-black/80 text-white font-bold py-2 px-4 rounded-md">
                    View
                </Link>
            </div>
        </div>
    );
}