import SiteName from './SiteName';
import Navigation from './Navigation';
import './Header.scss';

export default function Header() {
    return (
        <header>
            <div className="header-content">
                <SiteName />
                <Navigation />
            </div>
        </header>
    )
};
