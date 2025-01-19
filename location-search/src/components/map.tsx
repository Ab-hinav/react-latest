
import type { Place } from "../api/place";
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import type { Map as LeafletMap } from 'leaflet';
import { useEffect, useRef } from "react";

interface MapProps {
    place: Place | null;
}


export default function Map({ place }: MapProps) {

    const mapRef = useRef<LeafletMap | null>(null);

    useEffect(() => {
        if (mapRef.current && place) {
            mapRef.current.flyTo([place.longitude, place.latitude]);
        }
    }, [place])

    return (
        <MapContainer ref={mapRef} className="h-full" center={[51.505, -0.09]} zoom={13} scrollWheelZoom >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' />
            {place && <Marker position={[place.longitude, place.latitude]} >
            </Marker>}
        </MapContainer>
    )
}