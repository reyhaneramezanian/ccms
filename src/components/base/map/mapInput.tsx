import React, { memo, useCallback, useEffect, useRef, useState } from 'react';

import { FieldMetaProps, useField, useFormikContext } from 'formik';
import { MapContainer, Marker, TileLayer, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { mapMarkerIcon, MapPositionType } from './contant';
import { MAP_DEFAULT_POSITION } from 'src/constants/value';


interface MapInputProps {
    defaultPosition?: MapPositionType;
    name: string;
    clearField: () => void;
    setField: (_: MapPositionType) => void;
    style?: any;
    meta?: FieldMetaProps<any>;
}

export const MMapInput = memo(
    ({ clearField, setField, name, defaultPosition }: MapInputProps) => {
        const [marker, setMarker] = useState(MAP_DEFAULT_POSITION);
        const map = useMapEvents({
            click(e) {
                const pos = {
                    lat: e.latlng.lat,
                    lng: e.latlng.lng
                };
                setField(pos);
                setMarker(pos);
            }
        });

        const init = useRef(false);
        useEffect(() => {
            if (!init.current && typeof defaultPosition === 'object') {
                setMarker(defaultPosition);
                map.flyTo(defaultPosition, map.getZoom());
                init.current = true;
            }
        }, [defaultPosition, map]);

        return (
            <>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {marker === null ? null : <Marker icon={mapMarkerIcon} position={marker} />}
            </>
        );
    },
    (prev, next) =>
        prev.name === next.name &&
        prev.defaultPosition === next.defaultPosition &&
        next?.meta?.touched === prev?.meta?.touched &&
        next?.meta?.error === prev?.meta?.error
);

const MMapInputFormik = memo((props: { name: string; style?: any }) => {
    const { setFieldValue } = useFormikContext();
    const [field, meta] = useField(props.name);

    const clearField = useCallback(() => {
        setFieldValue(props.name, '');
    }, [setFieldValue, props]);

    const setField = useCallback(
        (value: MapPositionType) => {
            setFieldValue(props.name, value);
        },
        [setFieldValue, props]
    );

    return (
        <MapContainer
            style={{ width: '100%', height: 400, ...props.style }}
            center={MAP_DEFAULT_POSITION}
            zoom={13}
            scrollWheelZoom={false}>
            <MMapInput
                {...props}
                defaultPosition={field?.value}
                meta={meta}
                clearField={clearField}
                setField={setField}
            />
        </MapContainer>
    );
});

export default MMapInputFormik;
