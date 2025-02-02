import { atom, selector, selectorFamily ,waitForAll} from "recoil";
import axios from "axios";
import { Package, PackageDetails } from "../api/types";


export const searchTermState = atom({
    key: "searchTermState",
    default: "react" // Default search term
});


const packageNames = ["react", "redux", "axios","esbuild"];

export const multiplePackagesQuery = selector({
  key: "multiplePackagesQuery",
  get: ({ get }) => {
    return get(waitForAll(packageNames.map((name) => packageDetailsQuery(name))));
  }
});


export const packageDetailsQuery = selectorFamily({
    key: "packageDetailsQuery",
    get: (name: string) => async () => {
        try {
            const response = await axios.get(`https://registry.npmjs.org/${name}`);
            return response.data as PackageDetails;
        } catch (error) {
            console.error("Error fetching package details:", error);
            throw error;
        }
    }
})




export interface ResponseObject {
    package: Package;
    score: {
        final: number;
    };
    downloads: {
        monthly: number;
        weekly: number;
    };
}



export const packageListQuery = selector({
    key: "packageListQuery",
    get: async ({ get }) => {
        const packageName = get(searchTermState); // Get search term from state

        try {
            const response = await axios.get(`https://registry.npmjs.org/-/v1/search?text=${packageName}`);
            const allPackages: ResponseObject[] = response.data.objects || [];

            // Sort by score (descending) and return top 10
            const topPackages = allPackages
                .sort((a, b) => b.score.final - a.score.final)
                .slice(0, 10);

            return topPackages;
        } catch (error) {
            console.error("Error fetching packages:", error);
            throw error;
        }
    }
});

