import { observer } from "mobx-react-lite";
import { useState } from "react";

import { useAppStore } from "../../core/stores/StoreContext";
import Bar from "../../shared/atoms/Bar";
import Button from "../../shared/atoms/Button";
import ImportPointsPopup from "./ImportPointsPopup";
import PointItems from "./PointItems";
import styles from './RouteSelector.module.scss';
import Toggle from "../../shared/atoms/Toggle";
import RouteLoader from "./RouteLoader";
import DropDown from "../../shared/atoms/DropDown";

const RouteSelector = observer(() => {
    const {pointsStore} = useAppStore();
    const [isImportPointsPopupVisible, setIsImportPointsPopupVisible] = useState(false);

    const onToggle = () => {
        if (pointsStore.optimizeRouteType === 'Distance'){
            pointsStore.setOptimizeRouteType('Fuel');
        }else{
            pointsStore.setOptimizeRouteType('Distance');
        }
    }

    const onSelect = (option: string) => {
        if (option === 'Import'){
            pointsStore.setIsShowPointsByOptimization(false);
        }else{
            pointsStore.setIsShowPointsByOptimization(true);
        }
    }

    return (
    <div className={styles.wrapper}>
        <div className={styles.content}>
            <Bar style={styles.import} onClick={() => setIsImportPointsPopupVisible(true)}> 
                <h3>Import points</h3> 
                <div className={styles.additional}>
                    {pointsStore.isRoutesLoading && <RouteLoader/>}
                </div>
            </Bar>
            <Bar style={styles.points}>
                <div className={styles.select}>
                    <h3><span>or</span> Select manualy</h3>
                    {pointsStore.pointsSortedByOptimezedIndex.length > 1 && !pointsStore.isRoutesLoading && <DropDown options={['Import', 'Optimization']} defaultValue='Optimization' label="Sort by" onSelect={onSelect}/>}
                </div>
                <PointItems 
                points={(pointsStore.isShowPointsByOptimization) ? pointsStore.pointsSortedByOptimezedIndex : pointsStore.points} 
                removeItem={(itemIndex: string) => pointsStore.removePoint(itemIndex)} 
                isWithDragNDrop 
                rearrangeItems={(startIndex, endIndex) => pointsStore.rearrangePoints(startIndex, endIndex)} 
                updatePoint={(newPoint) => pointsStore.updatePoint(newPoint)}/>
                <Button style={styles.button} onClick={() => pointsStore.addPoint()}>+</Button>
            </Bar>
            <Bar style={styles.options}>
                <h3 className={styles.title}>Optimize route by</h3>
                <div className={styles.toggles}>
                    <div className={styles.toggle}>
                        <p>Shortest route</p>
                        <Toggle isActive={pointsStore.optimizeRouteType === 'Distance'} onToggle={onToggle}/>
                    </div>
                    <div className={styles.toggle}>
                        <p>Fuel consumption</p>
                        <Toggle isActive={pointsStore.optimizeRouteType === 'Fuel'} onToggle={onToggle}/>
                    </div>
                </div>
            </Bar>
        </div>
        {isImportPointsPopupVisible && <ImportPointsPopup closePopup={() => setIsImportPointsPopupVisible(false)}/>}
    </div>
    )
})

export default RouteSelector;