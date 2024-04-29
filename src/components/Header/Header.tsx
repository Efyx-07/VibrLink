import SiteName from './SiteName';
import Navigation from './Navigation';
import UserPanel from './UserPanel';
import './Header.scss';

export default function Header() {
    return (
        <header>
            <div className="content">
                <SiteName />
                <Navigation />
                <UserPanel />
            </div>
        </header>
    )
};
