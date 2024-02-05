import { Link } from "react-router-dom";

const MainNavigation = props => {
    return(
        <div>
            <Link to='/lehrbetriebe'>Lehrbetriebe</Link>
            <Link to='/lehrbetriebe/add'>Add Lehrbetrieb</Link>
            <Link to='/lernende'>Lernende</Link>
        </div>
    );
};

export default MainNavigation;