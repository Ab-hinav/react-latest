import { Place } from "./place";

interface SearchResponse {
    features: Feature[];
}

interface Feature { 
    geometry: Geometry;
    properties: Properties;
}

interface Geometry {
    coordinates: number[];
}

interface Properties {
    display_name: string;
    place_id: number;
}



export async function searchPlaces(location: string): Promise<Place[]> {
    const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${location}&format=geojson&addressdetails=1&layer=address&limit=5`);

    const data: SearchResponse = await response.json();

    console.log(data);

    const places:Place[] = data.features.map((feature) => {

        return {
            id: feature.properties.place_id.toString(),
            name: feature.properties.display_name,
            longitude: feature.geometry.coordinates[1],
            latitude: feature.geometry.coordinates[0]
        }
    });

    return places;


}