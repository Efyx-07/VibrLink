import { useGlobalDataStore } from "../../stores";
import { Link } from "react-router-dom";

const SiteName = () => {

    const {siteName} = useGlobalDataStore();

    return (
        <Link to="/">
            <h1>{siteName}</h1>
        </Link>
    )
};

export default SiteName;