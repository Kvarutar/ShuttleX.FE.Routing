import { autorun, makeAutoObservable, reaction, runInAction, toJS } from "mobx";
import { v4 as uuidv4 } from 'uuid';

import { getRandomDistinctHslColor } from "../../../shared/utils";
import geoMapping from "../../clients/geoMappingClient";
import { EnrichPointAPIResponse, GetRouteInfoAPIResponse, OptimizeRouteAPIRequest, OptimizeRouteAPIResponse, Point, RouteFromBE, RouteOptimizationModeFromBE, SearchAddressAPIResponse } from "./types";

class PointsStore {
    points: Point[] = [{
        id: uuidv4(),
        externalId: null,
        country: null,
        city: null,
        distanceMtr: null,
        mainText: '',
        secondaryText: '',
        geo: null,
        color: getRandomDistinctHslColor(),
        countryCode: null,
        region: null,
        cityOrLocality: null,
        optimizedIndex: null
    }, {
        id: uuidv4(),
        externalId: null,
        country: null,
        city: null,
        distanceMtr: null,
        mainText: '',
        secondaryText: '',
        geo: null,
        color: getRandomDistinctHslColor(),
        countryCode: null,
        region: null,
        cityOrLocality: null,
        optimizedIndex: null
    }];
    routes: RouteFromBE[] = [];
    optimizeRouteType: RouteOptimizationModeFromBE = 'Distance';
    isShowPointsByOptimization: boolean = false;

    //network
    isRoutesLoading: boolean = false;
    

    constructor() {
        makeAutoObservable(this);
    }

    addPoint(){
        this.points.push({
            id: uuidv4(),
            externalId: null,
            country: null,
            city: null,
            distanceMtr: null,
            mainText: '',
            secondaryText: '',
            geo: null,
            color: getRandomDistinctHslColor(),
            countryCode: null,
            region: null,
            cityOrLocality: null,
            optimizedIndex: null
        });

        this.isShowPointsByOptimization = false;
    }

    removePoint(id: Point['id']){
        this.points = this.points.filter(point => point.id !== id);
        this.isShowPointsByOptimization = false;
    }

    updatePoint(newPoint: Point){
        this.points[this.points.findIndex(el => el.id === newPoint.id)] = newPoint;
        this.isShowPointsByOptimization = false;
    }

    setPoints(newPointsArray: Point[]){
        this.points = newPointsArray;
        this.isShowPointsByOptimization = false;
    }

    rearrangePoints(startIndex: number, endIndex: number){
        const element = this.points.splice(startIndex, 1)[0];
        this.points.splice(endIndex, 0, element);
    }

    setOptimizeRouteType(newOptimizeRouteType: RouteOptimizationModeFromBE){
        this.optimizeRouteType = newOptimizeRouteType;
    }

    setIsShowPointsByOptimization(isShowPointsByOptimization: boolean){
        this.isShowPointsByOptimization = isShowPointsByOptimization;
    }

    //axios
    async searchAddress(query: string){
        try {
            const result = await geoMapping.get<SearchAddressAPIResponse>('/query', {params: {
                Query: query,
                Language: 'en',
                Region: 'GE'
            }})

            return result.data;
        } catch (error){
            console.log(error);
        }
    }

    async enrichPoint(pointExternalId: string){
        try{
            const result = await geoMapping.get<EnrichPointAPIResponse>(`/query/${pointExternalId}`, {params: {
                Language: 'en',
                Region: 'AE'
            }})

            return result.data;
        } catch (error){
            console.log(error);
        }
    }

    async optimizeRoute(){
        runInAction(() => {
            this.isRoutesLoading = true;
            this.isShowPointsByOptimization = false;
        });


        const requestBody: OptimizeRouteAPIRequest = {
            InitialPoint: {geo: this.points[0].geo!, pointType: "Loading",},
            Points: this.points.map(point => ({geo: point.geo!, pointType: "Loading",})).splice(1),
            optimizeRouteType: this.optimizeRouteType,
        }

        try{
            runInAction(() => {
                this.routes = [];
            })
            const result = await geoMapping.post<OptimizeRouteAPIResponse>('/routes/optimize', requestBody);

            const enrichedRoutes = await Promise.all(result.data.routes.sort((a, b) => a.index - b.index).map(el => geoMapping.get<GetRouteInfoAPIResponse>(`/route/${el.routeId}`)))
            ;

            const opimizedPoints: string[] = [];

            enrichedRoutes.forEach((el) => {
                el.data.waypoints.sort((a, b) => a.index - b.index).forEach(point => {
                    const stringifyedPoint = JSON.stringify(point.geo);
                    if (!opimizedPoints.find(el => el === stringifyedPoint)){
                        opimizedPoints.push(stringifyedPoint);
                    }
                });
            })

            runInAction(() => {
                opimizedPoints.forEach((point, index) => {
                    console.log(index);
                    this.points[this.points.findIndex(el => JSON.stringify(el.geo) === point)].optimizedIndex = index + 1;
                })
            })
            
            runInAction(() => {
                result.data.routes.forEach((el, index) => {
                    this.routes.push({
                        ...el,
                        ...enrichedRoutes[index].data,
                    })
                })
            });
        } catch (error){
            runInAction(() => this.isRoutesLoading = false)
            console.log(error);
        }

        runInAction(() => {
            this.isRoutesLoading = false;
            this.isShowPointsByOptimization = true;
        });
    }

    //getters
    get pointsWithCoordinates(){
        return this.points.filter(point => point.geo !== null);
    }

    get pointsSortedByOptimezedIndex(){
        if (this.points.some(el => el.optimizedIndex === null)){
            return []
        }else {
            return [...this.points].sort((a, b) => a.optimizedIndex! - b.optimizedIndex!);
        }
    }
}

const pointsStore = new PointsStore();

reaction(
    (): [Point[], RouteOptimizationModeFromBE]  => [pointsStore.points.slice().sort((a, b) => a.id.localeCompare(b.id)), pointsStore.optimizeRouteType],
    ([points, optimizeRouteType], [prevPoints, preOptimizeRouteType]) => {
        if (!points.some(point => !point.geo) && (JSON.stringify(points) !== JSON.stringify(prevPoints) || optimizeRouteType !== preOptimizeRouteType)){
            pointsStore.optimizeRoute();
        }
    }
)

export default pointsStore;