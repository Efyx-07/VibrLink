import SiteName from "./SiteName";
import Navigation from "./Navigation";
import './Header.scss';

const Header = () => {
    return (
        <header>
            <div className="content">
                <SiteName />
                <Navigation />
            </div>
        </header>
    )
};

export default Header;