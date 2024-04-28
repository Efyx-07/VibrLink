import { useGlobalDataStore } from "../../stores";
import { Link } from "react-router-dom";
import './SiteName.scss';

const SiteName = () => {

    const {siteName} = useGlobalDataStore();

    return (
        <Link to="/">
            <h1 className="siteName">{siteName}</h1>
        </Link>
    )
};

export default SiteName;