import { NavLink } from "react-router-dom";
import styles from "./MainNavigation.module.css";

const MainNavigation = props => {
    return(
        <div className={styles.navContainer}>
            <div className={styles.nav}>
                <NavLink to="/kurse" className={({isActive}) => isActive ? styles.active : undefined}>Kurse</NavLink>
                <NavLink to='/lehrbetriebe' className={({isActive}) => isActive ? styles.active : undefined}>Lehrbetriebe</NavLink>
                <NavLink to='/dozenten' className={({isActive}) => isActive ? styles.active : undefined}>Dozenten</NavLink>
                <NavLink to='/lernende' className={({isActive}) => isActive ? styles.active : undefined}>Lernende</NavLink>
            </div>
        </div>
    );
};

export default MainNavigation;