import { Point } from "../../../core/stores/points/types"

export type PointItemsProps = {
    points: Point[], 
    isWithDragNDrop?: boolean, 
    rearrangeItems?: (startIndex: number, endIndex: number) => void, 
    removeItem: (itemIndex: string) => void, 
    updatePoint: (newPoint: Point) => void,
    optimizedPoints?: Point[],
}