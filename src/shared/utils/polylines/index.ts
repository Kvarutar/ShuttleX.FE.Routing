import { decode } from "@googlemaps/polyline-codec";
import { LatLng } from "../../../core/stores/points/types";

export const decodeGooglePolyline = (encodedGeometry: string): LatLng[] => {
    return decode(encodedGeometry, 6).map(([latitude, longitude]) => ({ latitude, longitude }));
  };