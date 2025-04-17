import { useState } from "react";

import { Point } from "../../../core/stores/points/types";
import Bar from "../../../shared/atoms/Bar";
import Button from "../../../shared/atoms/Button";
import { ButtonMods } from "../../../shared/atoms/Button/props";
import Popup from "../../../shared/atoms/Popup";
import TextArea from "../../../shared/atoms/TextArea";
import PointItems from "../PointItems"
import styles from './ImportPointsPopup.module.scss';
import { observer } from "mobx-react-lite";
import { useAppStore } from "../../../core/stores/StoreContext";
import { getRandomDistinctHslColor } from "../../../shared/utils";
import { v4 as uuidv4 } from 'uuid';

const ImportPointsPopup = observer( ({closePopup}: {closePopup: () => void}) => {
    const [parsedPoints, setParsedPoints] = useState<Point[]>([]);
    const [value, setValue] = useState('');

    const {pointsStore} = useAppStore();

    const rearrangePoints = (startIndex: number, endIndex: number) => {
        const tmp = [...parsedPoints]
        const element = tmp.splice(startIndex, 1)[0];

        tmp.splice(endIndex, 0, element);
        setParsedPoints(tmp);
    }

    const removeItem = (itemIndex: string) => {
        setParsedPoints(prev => prev.filter(point => point.id !== itemIndex));
    }

    const updatePoint = (newPoint: Point) => {
        parsedPoints[parsedPoints.findIndex(el => el.id === newPoint.id)] = newPoint;
    }

    const parsePoints = async () => {
        //setParsedPoints(value.split(/\r?\n|\r|\n/g));
        const parsedAddresses = value.split(/\r?\n|\r|\n/g);

        const parsedResult = (await Promise.all(parsedAddresses.map(async address => {
            const searchedAddress = (await pointsStore.searchAddress(address))?.[0];

            if (searchedAddress){
                const enrichedAddress = await pointsStore.enrichPoint(searchedAddress.externalId);

                return {
                    id: uuidv4(),
                    externalId: searchedAddress.externalId,
                    country: searchedAddress.country,
                    city: searchedAddress.city,
                    distanceMtr: searchedAddress.distanceMtr,
                    mainText: searchedAddress.mainText,
                    secondaryText: searchedAddress.secondaryText,
                    geo: enrichedAddress ? enrichedAddress.geo : null,
                    color: getRandomDistinctHslColor(),
                    countryCode: enrichedAddress ? enrichedAddress.countryCode : null,
                    region: enrichedAddress ? enrichedAddress.region : null,
                    cityOrLocality: enrichedAddress ? enrichedAddress.cityOrLocality : null
                } as Point
            }
        }))).filter(el => el !== undefined)

        setParsedPoints(parsedResult);
    }

    const onDone = () => {
        pointsStore.setPoints(parsedPoints);
        closePopup();
    }

    return (
        <Popup closePopup={closePopup} wrapperStyles={styles.popup__wrapper} contentStyles={styles.popup__content}>
            <Bar style={styles.popup__parser}>
                <h3>Paste your addresses. One address per line</h3>
                <TextArea value={value} onChange={setValue}/>
                <div className={styles.popup__buttons}>
                    <Button mode={ButtonMods.Mode2}>Clear</Button>
                    {value && <Button onClick={parsePoints}>Parse</Button>}
                </div>
            </Bar>
            <Bar style={styles.popup__result}>
                <h3>Your points</h3>
                <PointItems points={parsedPoints} isWithDragNDrop rearrangeItems={rearrangePoints} removeItem={removeItem} updatePoint={updatePoint}/>
                {parsedPoints.length > 0 && (
                    <Button onClick={onDone}>Done</Button>
                )}
            </Bar>
        </Popup>
    )
})

export default ImportPointsPopup;
