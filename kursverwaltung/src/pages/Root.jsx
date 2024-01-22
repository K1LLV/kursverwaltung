import { Outlet } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";

const Root = props => {
    return(
        <div>
            <MainNavigation/>
            <Outlet/>
        </div>
    );
};

export default Root;