import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { useRecoilValueLoadable, useSetRecoilState } from "recoil";
import { searchTermState, packageListQuery } from "../store/state";
import PackageListItem from "../components/PacakgeListItem";


export default function SearchPage() {

    const [searchParams] = useSearchParams();
    const term = searchParams.get("text");
    const setSearchTerm = useSetRecoilState(searchTermState);

    useEffect(() => {
        if (!term) return;
        setSearchTerm(term);
    }, [term]);

    const packageLoadable = useRecoilValueLoadable(packageListQuery);


    return (
        <div>
            <h1 className="text-2xl my-6 font-bold ml-2" >Search Results</h1>

            {packageLoadable.state === "hasValue" && packageLoadable.contents.map((packageObject) => {
                return (
                    <PackageListItem key={packageObject.package.name} packageObject={packageObject} />
                )
            })}
        </div>
    )
}