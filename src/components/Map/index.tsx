import "leaflet/dist/leaflet.css";

import L, { LatLngExpression } from "leaflet";
import { MapContainer, Polyline,TileLayer, useMap, ZoomControl, Marker, LayerGroup } from "react-leaflet";

import { observer } from "mobx-react-lite";
import { useAppStore } from "../../core/stores/StoreContext";
import { decodeGooglePolyline } from "../../shared/utils/polylines";
import { useEffect, useMemo, useState } from "react";
import { toJS } from "mobx";
import { Point } from "../../core/stores/points/types";

const mapOptions: {center: LatLngExpression, zoom: number} = {
  center: [24.46, 54.36],
  zoom: 8,
}

const Map = observer(() => {
    const {pointsStore} = useAppStore();
    const [center, setCenter] = useState<LatLngExpression>(mapOptions.center);
    const [pointsGeos, setPointsGeos] = useState<number[][] | null>(null);

    const pointsWithGeo = pointsStore.pointsWithCoordinates;

    useEffect(() => {
      if (pointsWithGeo.length > 0){
        const allGeos = pointsWithGeo.reduce((acc, point) => {
            acc.latitude += point.geo!.latitude;
            acc.longitude += point.geo!.longitude;
            return acc;
        },
        { latitude: 0, longitude: 0 })
  
        setCenter([allGeos.latitude / pointsWithGeo.length,  allGeos.longitude / pointsWithGeo.length]);
      } else {
        setCenter(mapOptions.center);
      }

      setPointsGeos((pointsWithGeo.map(el => [el.geo!.latitude, el.geo!.longitude])))
    }, [pointsWithGeo])

    return (
        <MapContainer zoomControl={false} center={center} zoom={mapOptions.zoom} scrollWheelZoom={false} doubleClickZoom style={{height: "100vh", width: "100vw", zIndex: 1}}>
            <ChangeView center={center} zoom={mapOptions.zoom} bounds={pointsGeos}/>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LayerGroup>
              <PolylinesWrapper/>
            </LayerGroup>
            {pointsGeos && pointsGeos.length > 0 && <MarkersWrapper positions={pointsWithGeo}/>}
            <ZoomControl position="bottomright"/>
          </MapContainer>
      );
  }
)

export type DecodedGeo = {
  geometry: LatLngExpression[],
  color: string
}

const PolylinesWrapper = observer(() => {
  const {pointsStore} = useAppStore();

  const decodedGeo: DecodedGeo[] = useMemo(() => {
    const newElems: DecodedGeo[] = [];

    pointsStore.routes.forEach((route, routeIndex) => {
      console.log(route.waypoints);
      
      [...route.legs].sort((a,b) => a.index - b.index).forEach(leg => {
        const decodedGeometry = decodeGooglePolyline(leg.geometry).map(el => [el.latitude, el.longitude]) as LatLngExpression[];
  
        if (routeIndex < pointsStore.points.length){
          newElems.push({
            geometry: decodedGeometry,
            color: pointsStore.points[routeIndex].color
          });
        }
      })
    });

    return newElems;
  }, [toJS(pointsStore.routes)])

  return decodedGeo.map((el, index) => <Polyline key={index} positions={el.geometry} pathOptions={{color: '#5295f7'}}/>)
})

const MarkersWrapper = observer(({positions}: {positions: Point[]}) => {
  const {pointsStore} = useAppStore();

  return positions.map((el, index) => {
    if (pointsStore.points[index]){
      const markerHtmlStyles = `
        background-color: ${pointsStore.points[index].color};
        width: 2rem;
        height: 2rem;
        display: block;
        left: -1rem;
        top: -1rem;
        position: relative;
        border-radius: 3rem 3rem 0;
        transform: rotate(45deg);
        border: 1px solid #FFFFFF`

      const markerLabelWrapperHtmlStyles = `
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) rotate(-45deg);
        width: 1.2rem;
        height: 1.2rem;
        display: flex;
        justify-content: center;
        border-radius: 100%;
        background-color: white;
      `

      const markerLabelHtmlStyles = `
        font-weight: 700
      `

      const icon = L.divIcon({
        className: "my-custom-pin",
        iconAnchor: [0, 24],
        html: `<span style="${markerHtmlStyles}"><span style="${markerLabelWrapperHtmlStyles}"><h4 style="${markerLabelHtmlStyles}">${el.optimizedIndex ?? (index + 1)}</h4></span></span>`
      })

      return <Marker key={index} position={[el.geo!.latitude, el.geo!.longitude]} icon={icon}/>
    }
  })
})

const ChangeView = ({ center, zoom, bounds }: {center: LatLngExpression, zoom: number, bounds: number[][] | null}) => {
  const map = useMap();
  map.setView(center, zoom);
  
  if (bounds && bounds.length > 0){
    map.fitBounds(bounds);
  }
  return null;
}

export default Map;