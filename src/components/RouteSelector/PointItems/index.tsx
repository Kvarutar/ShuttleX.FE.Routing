import { DragDropContext, Draggable, Droppable, DropResult } from "@hello-pangea/dnd";
import { observer } from "mobx-react-lite";

import minus from '../../../assets/icons/minus.svg'
import { Point } from "../../../core/stores/points/types";
import RoundButton from "../../../shared/atoms/RoundButton";
import { RoundButtonSizes } from "../../../shared/atoms/RoundButton/types";
import PointItem from "./PointItem";
import styles from './PointItems.module.scss';
import { PointItemsProps } from "./types";
import { useMemo } from "react";

const PointItems = observer(({points, isWithDragNDrop = false, rearrangeItems, removeItem, updatePoint}: PointItemsProps) => {
    if (isWithDragNDrop){
        const onDragEnd = (result: DropResult<string>) => {
            if(!result.destination) {
                return; 
            }
            
            rearrangeItems?.(result.source.index, result.destination.index)
        }

        return (
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="droppable">
                {(provided) => (
                    <div 
                    ref={provided.innerRef} 
                    {...provided.droppableProps}
                    className={styles.wrapper}
                    >
                    <PointsDraggableWrapper removePoint={removeItem} points={points} updatePoint={updatePoint}/>
                    {provided.placeholder}
                    </div>
                )}
                </Droppable>
            </DragDropContext>
        )
    }

    return (
        <div className={styles.wrapper}>
            {points.map((point, index) => <PointItem key={point.id} point={point} index={index} updatePoint={updatePoint}/>)}
        </div>
    )
})

const PointsDraggableWrapper = observer(({points, removePoint, updatePoint}: {points: Point[], removePoint?: (pointId: string) => void, updatePoint: (newPoint: Point) => void}) => {
    return points.map((point, index) => (
        <Draggable
        key={point.id}
        draggableId={point.id}
        index={index}
        >
        {(provided) => (
            <div
            ref={provided.innerRef}
            {...provided.dragHandleProps}
            {...provided.draggableProps}
            className={styles.content}>
                <PointItem point={point} index={index} updatePoint={updatePoint}/>
                {index > 0 && points.length > 2 && <RoundButton onClick={() => removePoint?.(point.id)} size={RoundButtonSizes.S}><img className={styles.icon} src={minus} alt="delete" /></RoundButton>}
            </div>
        )}
        </Draggable>))
})

export default PointItems;