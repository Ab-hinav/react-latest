import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "../components/ui/card";


export interface RandomUserResponse {
  results: RandomUser[];
  info: {
    seed: string;
    results: number;
    page: number;
    version: string;
  };
}

export interface RandomUser {
  gender: string;
  name: {
    title: string;
    first: string;
    last: string;
  };
  location: {
    street: {
      number: number;
      name: string;
    };
    city: string;
    state: string;
    country: string;
    postcode: number | string;
    coordinates: {
      latitude: string;
      longitude: string;
    };
    timezone: {
      offset: string;
      description: string;
    };
  };
  email: string;
  login: {
    uuid: string;
    username: string;
    password: string;
    salt: string;
    md5: string;
    sha1: string;
    sha256: string;
  };
  dob: {
    date: string;
    age: number;
  };
  registered: {
    date: string;
    age: number;
  };
  phone: string;
  cell: string;
  id: {
    name: string;
    value: string | null;
  };
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
  nat: string;
}

export default function HomePage(){


    const [userList,setUserList] = useState<RandomUser[]>([]);
    const [currentPage,setCurrentPage] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(()=>{

        async function fetchData(){
            setIsLoading(true);
            try {
              const response = await axios.get<RandomUserResponse>(`https://randomuser.me/api/?page=${currentPage}`);
              setUserList(prev => [...prev, ...response.data.results]);
            } finally {
              setIsLoading(false);
            }
        }
        
       fetchData();

    },[currentPage]);
    
    return (
      <div className="container mx-auto py-10">
        <div className="mb-6 text-center">
          <h1 className="text-4xl font-semibold tracking-tight">Home Page</h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {userList.map((user: RandomUser) => (
            <Card key={user.login.uuid} className="text-center">
              <CardHeader>
                <img
                  src={user.picture.thumbnail}
                  alt={`${user.name.first} ${user.name.last}`}
                  className="rounded-full mx-auto w-16 h-16"
                />
              </CardHeader>
              <CardContent>
                <p className="font-medium">{user.name.first}</p>
                <p className="text-sm text-muted-foreground">{user.name.last}</p>
              </CardContent>
            </Card>
          ))}
          {isLoading && (
            <Card className="animate-pulse h-full bg-muted" />
          )}
        </div>
       
        <div className="mt-6 text-center">
          <Button onClick={() => setCurrentPage((prev) => prev + 1)} disabled={isLoading}>
            {isLoading ? "Loading..." : "Load More"}
          </Button>
        </div>
      </div>
    );
}