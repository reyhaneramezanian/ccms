import React, { memo, useEffect, useRef } from 'react';

import { MapContainer, Marker, TileLayer, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import { mapMarkerIcon, MapPositionType } from './contant';
import { MAP_DEFAULT_POSITION } from 'src/constants/value';

interface MapProps {
    position?: MapPositionType;
    style?: any;
}

export const MapComponent = ({ position }: MapProps) => {
    const map = useMapEvents({});

    const positionRef = useRef(position);
    useEffect(() => {
        if (positionRef.current.lat !== position.lat && positionRef.current.lng !== position.lng) {
            map.flyTo(position, map.getZoom());
            positionRef.current = position;
        }
    }, [position, map]);

    return (
        <>
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker icon={mapMarkerIcon} position={position} />
        </>
    );
};

const MMap = memo(
    ({ position = MAP_DEFAULT_POSITION, style }: MapProps) => {
        return (
            <MapContainer
                style={{ width: '100%', height: 100, ...style }}
                center={position}
                zoom={13}
                scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <MapComponent position={position} />
            </MapContainer>
        );
    },
    (prev, next) => prev.position === next.position
);

export default MMap;
