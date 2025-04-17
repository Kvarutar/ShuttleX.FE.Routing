import { observer } from "mobx-react-lite";
import Bar from "../../../shared/atoms/Bar";

import styles from './RouteLoader.module.scss';
import Loader from "./Loader";

const RouteLoader = observer(() => {
    return (
        <Bar style={styles.loader}>
            <Loader/>
            <h4>Bulding route...</h4>
        </Bar>
    )
})

export default RouteLoader;