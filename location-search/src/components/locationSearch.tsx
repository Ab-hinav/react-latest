import type { Place } from "../api/place";
import React, { Fragment } from "react";
import { searchPlaces } from "../api/search";


interface LocationSearchProps {
    setPlace: (place: Place) => void;
}

export default function LocationSearch({setPlace}: LocationSearchProps) {

    const [enteredLocation, setEnteredLocation] = React.useState<string>("");
    const [places, setPlaces] = React.useState<Place[]>([]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const places = await searchPlaces(enteredLocation);
        setPlaces(places);
    }

  return (
    <div>
      <h1 className="text-2xl mb-4 font-extrabold">Location Search</h1>
      <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
        <label className="text-lg font-semibold" htmlFor="location">Enter Location</label>
      <input className="border-2 border-black rounded-md p-2 focus shadow-sm" type="text" id="enteredLocation" value={enteredLocation} onChange={(e) => setEnteredLocation(e.target.value)} />
      <button >Search</button>
      </form>

        <h1 className="text-xl font-bold mt-6" >Found Locations</h1>
        <div className="grid grid-cols-2 mt-2 gap-2 items-center" >
       
        {   
            places.map((place) => {
                return (
                    <Fragment key={place.id}>
                      <p className="text-base " >{place.name}</p>
                      <button className="text-sm text-blue-500 border rounded-md hover:text-blue-100 hover:bg-black " onClick={() => setPlace(place)} >Go</button>
                        <div className="col-span-2 w-full border-b"></div>
                    </Fragment>

                )
            })

        }
        </div>
      

    </div>
  )
}