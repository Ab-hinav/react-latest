import Map from "./components/map";
import LocationSearch from "./components/locationSearch";
import type { Place } from "./api/place";
import React from "react";


function App() {

  const [place, setPlace] = React.useState<Place | null>(null);

  return <div className=" h-screen w-screen grid grid-cols-12">
    <div className="col-span-3 p-2" >
      <LocationSearch setPlace={(p) => setPlace(p)} />
    </div>
    <div className="col-span-9 p-2">
      <Map place={place} />
    </div>
  </div>
}

export default App
