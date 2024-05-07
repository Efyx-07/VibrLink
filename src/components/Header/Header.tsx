import { useState } from 'react';
import SiteName from './SiteName';
import Navigation from './Navigation';
import MyAccountItem from './MyAccountItem';
import MobileMenu from './MobileMenu';
import MobileMenuIcon from './MobileMenuIcon';
import './Header.scss';

export default function Header() {

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const openMobileMenu = () => {
        setIsOpen(true);
    };

    const closeMobileMenu = () => {
        setIsOpen(false);
    };

    return (
        <header>
            <div className="content">
                <SiteName />
                <div className="nav-wrapper-desktop">
                    <Navigation onItemClick={() => {}}/>
                    <MyAccountItem />
                </div>
                <div className="nav-wrapper-mobile">
                    <MyAccountItem />
                    <MobileMenuIcon 
                        isOpen={isOpen}
                        onOpenClick={openMobileMenu}
                        onCloseClick={closeMobileMenu}
                    />
                </div>
            </div>
            <MobileMenu
                isOpen={isOpen}
                closeMenu={closeMobileMenu}
             />
        </header>
    )
};
