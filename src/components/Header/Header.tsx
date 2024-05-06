import SiteName from './SiteName';
import Navigation from './Navigation';
import MobileMenu from './MobileMenu';
import './Header.scss';

export default function Header() {
    return (
        <header>
            <div className="content">
                <SiteName />
                <Navigation />
            </div>
            <MobileMenu />
        </header>
    )
};
