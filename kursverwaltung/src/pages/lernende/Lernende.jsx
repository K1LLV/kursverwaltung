import { useState, useEffect } from "react";
import styles from "./Lernende.module.css";

const Lernende = props => {

    const [shouldRender, setShouldRender] = useState(true);

    return(
        <div>
            <div className={styles.title}>Lernende</div>
            <div className={styles.results}>

            </div>
        </div>
    );
};

export default Lernende;