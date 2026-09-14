import L from 'leaflet';

export const MAP_MARKER_ICON_SIZE = 35;
export const MAP_MARKER_ICON_RATIO = 1.74;


export const mapMarkerIcon = L.icon({
    iconUrl: '/icon/pin.png',
    iconSize: [MAP_MARKER_ICON_SIZE, MAP_MARKER_ICON_SIZE * MAP_MARKER_ICON_RATIO] // size of the icon
});

export type MapPositionType = { lat: number; lng: number };