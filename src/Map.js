import React, {useState} from 'react';
import SearchBar from "./SearchBar";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/leaflet.css';


function Map (props) {
    
    console.log("Mapprops")
    console.log(props)

    let DefaultIcon = L.icon({
        iconUrl: icon,
        shadowUrl: iconShadow
    });
    
    L.Marker.prototype.options.icon = DefaultIcon;

    const locationData = props.locationData.location;
    const centerLoc = [locationData.lat, locationData.lng];
    return (
        <div className="mapContainer">
        <MapContainer
            style={{ height: "100vh", width: "100vw" }}
            center={centerLoc}
            zoom={13}
            scrollWheelZoom={false}
        >
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
        </MapContainer>
        <div className="searchContainer">
        <SearchBar
            getData={props.getData}
            query={props.query} 
            cities={props.cities}
            cuisine={props.cuisine}
            selectedCuisine={props.selectedCuisine}
            selectedCity={props.selectedCity}
            handleSelectChange={props.handleSelectChange}
        /></div>

        </div>
    )
}

export default Map