import { observer } from "mobx-react-lite";
import { useEffect,useRef,useState } from "react";

import { Point, SearchedAddressFromBE } from "../../../../core/stores/points/types";
import { useAppStore } from "../../../../core/stores/StoreContext";
import TextInput from "../../../../shared/atoms/TextInput";
import { numberToLetters, useDebounce } from "../../../../shared/utils";
import styles from './PointItem.module.scss';
import SearchedAddresses from "./SearchedAddresses";

const PointItem = observer(({ point, index, updatePoint }: { point: Point, index: number, updatePoint: (newPoint: Point) => void}) => {
    const [searchedAddresses, setSearchedAddresses] = useState<SearchedAddressFromBE[] | null>();
    const [inputValue, setInputValue] = useState<string>(point.secondaryText ?? '');
    const debouncedValue = useDebounce(inputValue, 300);
    const [isFocused, setIsFocused] = useState(false);
    const {pointsStore} = useAppStore();
    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        if (debouncedValue && isFocused){
            (async () => {
                const addresses = await pointsStore.searchAddress(debouncedValue);
    
                setSearchedAddresses(addresses);
            })()
        }
    }, [debouncedValue])

    const onAddressSelect = async (searchedAddress: SearchedAddressFromBE) => {
        const enrichedPoint = await pointsStore.enrichPoint(searchedAddress.externalId);
        
        const newPoint: Point = {
            id: point.id,
            externalId: searchedAddress.externalId,
            country: searchedAddress.country,
            city: searchedAddress.city,
            distanceMtr: searchedAddress.distanceMtr,
            mainText: searchedAddress.mainText,
            secondaryText: searchedAddress.secondaryText,
            geo: enrichedPoint ? enrichedPoint.geo : null,
            color: point.color,
            countryCode: enrichedPoint ? enrichedPoint.countryCode : null,
            region: enrichedPoint ? enrichedPoint.region : null,
            cityOrLocality: enrichedPoint ? enrichedPoint.cityOrLocality : null,
            optimizedIndex: null,
        }

        inputRef.current?.blur();
        updatePoint(newPoint);
        setInputValue(newPoint.secondaryText ?? '');
    }

    return (
        <div className={styles.content}>
            <div>
                <div style={{borderColor: point.color}} className={styles.label}>
                    <h3 style={{color: point.color}}>{pointsStore.isShowPointsByOptimization ? point.optimizedIndex : numberToLetters(index + 1).toUpperCase()}</h3>
                </div>
            </div>
            <TextInput style={styles.input} ref={inputRef} value={inputValue} onChange={setInputValue} onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)}/>
            {isFocused && searchedAddresses && <SearchedAddresses addresses={searchedAddresses} onAddressSelect={onAddressSelect}/>}
        </div>
    )
})

export default PointItem;