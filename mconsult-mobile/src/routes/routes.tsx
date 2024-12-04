import { useContext } from "react";
import RoutesPrivate from "./routesPrivate"
import RoutesPublic from "./routesPublic";
import { AuthContext } from "../utils/context/auth";


const Routes = () => {
    const auth = useContext(AuthContext);

    return (auth.token.length > 0)? <RoutesPrivate/> : <RoutesPublic/>;
};

export default Routes;