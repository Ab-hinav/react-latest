export interface Package {
    name: string;
    description: string;
    version: string;
    keywords?: string[];
}

type Maintainer = {
    name: string;
    email: string;
}

export interface PackageDetails {
    name: string;
    description: string;
    readme: string;
    author?: Maintainer;
    license: string;
    maintainers: Maintainer[];
}