export type LatLng = {
    latitude: number,
    longitude: number
}

export type Point = {
    id: string, 
    color: string, 
    geo: LatLng | null,
    mainText: string | null,
    secondaryText: string | null,
    externalId: string | null,
    country: string | null,
    city: string | null,
    distanceMtr: number | null,
    countryCode: string | null,
    region: string | null,
    cityOrLocality: string | null,
    optimizedIndex: number | null
};

export type SearchedAddressFromBE = {
    mainText: string,
    secondaryText: string,
    externalId: string,
    country: string,
    city: string,
    distanceMtr: number | null
};

export type SearchAddressAPIResponse = SearchedAddressFromBE[]

export type EnrichPointAPIResponse = {
    geo: LatLng
    countryCode: string,
    region: string,
    cityOrLocality: string
}

export type RouteOptimizationModeFromBE = 'Distance' | 'Fuel'

export type OptimizeRouteAPIRequest = {
    initialGeo: LatLng
    geos: LatLng[]
    optimizeRouteType: RouteOptimizationModeFromBE
}

export type OptimizeRouteAPIResponse = {
    routes: {
        routeId: string,
        index: number
      }[]
}

export type GetRouteInfoAPIResponse = {
  routeId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  totalDistanceMtr: 0,
  totalDurationSec: 0,
  waypoints: {
    geo: LatLng,
    index: number
  }[],
  legs: {
    accurateGeometries: {
        polylineStartIndex: number,
        polylineEndIndex: number,
        trafficLoad: string
      }[]
    durationSec: 0,
    distanceMtr: 0,
    geometry: string,
    trafficLoad: string,
    index: 0
  }[]
}

export type RouteFromBE = GetRouteInfoAPIResponse;

// export type PointFromBE = {
//     mainText: string,
//     secondaryText: string,
//     externalId: string,
//     country: string,
//     city: string,
//     distanceMtr: number | null
// }

// export type EnrichedPointFromBE = {
//     geo: LatLng
//     countryCode: string,
//     region: string,
//     cityOrLocality: string
// }