import { SearchedAddressFromBE } from "../../../../../core/stores/points/types";

import styles from './SearchedAddresses.module.scss';

const SearchedAddresses = ({addresses, onAddressSelect}: {addresses: SearchedAddressFromBE[], onAddressSelect: (searchedAddress: SearchedAddressFromBE) => void}) => {
    return(
        <div className={styles.wrapper}>
            {addresses.slice(0, 5).map(address => (
                <div className={styles.item} key={address.externalId}onClick={() => onAddressSelect(address)}>
                    <p>{address.mainText}</p>
                    <h5>{address.secondaryText}</h5>
                </div>
            ))}
        </div>
    )
}

export default SearchedAddresses;