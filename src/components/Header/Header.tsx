import { useState } from 'react';
import SiteName from './SiteName';
import Navigation from './Navigation';
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
                <Navigation />
                <MobileMenuIcon 
                    isOpen={isOpen}
                    onOpenClick={openMobileMenu}
                    onCloseClick={closeMobileMenu}
                />
            </div>
            <MobileMenu
                isOpen={isOpen}
             />
        </header>
    )
};
