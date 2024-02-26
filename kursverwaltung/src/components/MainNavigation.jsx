import { NavLink } from "react-router-dom";
import styles from "./MainNavigation.module.css";

const MainNavigation = props => {
    return(
        <div className={styles.navContainer}>
            <div className={styles.nav}>
                <NavLink to="/kurse">Kurse</NavLink>
                <NavLink to='/lehrbetriebe'>Lehrbetriebe</NavLink>
                <NavLink to='/lehrbetriebe/add'>Add Lehrbetrieb</NavLink>
                <NavLink to='/lernende'>Lernende</NavLink>
            </div>
        </div>
    );
};

export default MainNavigation;