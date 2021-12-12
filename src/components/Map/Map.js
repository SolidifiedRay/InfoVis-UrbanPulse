import React from 'react';
import GoogleMapReact from 'google-map-react';
import mapStyles from './mapStyles';

const Marker = ({ children }) => children;

export default function Map({ lat, lng, data, color }) {
  console.log(data);
  return (
    <GoogleMapReact
      bootstrapURLKeys={{
        key: 'Replace this with your google map API',
        libraries: ['visualization'],
      }}
      defaultCenter={{ lat: lat, lng: lng }}
      defaultZoom={12}
      options={{ styles: mapStyles }}
    >
      {/**data.features.map((d) =>
        d.latLng.map((p) => {
          let heatColor = color;
          if (color === 'orange') {
            if (d.rank > 2.5) {
              heatColor = 'red';
            }
          }
          return (
            <Marker lat={p[0]} lng={p[1]} key={p.gridIndex}>
              <svg height="20" width="20">
                <circle cx="10" cy="10" r="8" fill={heatColor} opacity="0.6" />
              </svg>
            </Marker>
          );
        })
      )**/}
      {data.features.map((p) => (
        <Marker lat={p.latLng[0][0]} lng={p.latLng[0][1]} key={p.gridIndex}>
          <svg height="20" width="20">
            <circle
              cx="10"
              cy="10"
              r="5"
              stroke="black"
              strokeWidth="1"
              fill={color}
              opacity="0.6"
            />
          </svg>
        </Marker>
      ))}
    </GoogleMapReact>
  );
}
