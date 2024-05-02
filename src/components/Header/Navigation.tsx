import { Link } from "react-router-dom";
import { useUserStore } from "../../stores";
import { useState, useEffect } from "react";
import HoverUserMenu from './HoverUserMenu';
import './Navigation.scss';

interface NavItem {
    name: string,
    navTo: string
};

function NavItem({name, navTo}: NavItem) {
    return (
        <Link className="navItem" to={navTo}>
            <p>{name}</p>
        </Link>
    )
};

export default function Navigation() {

    const isLogged = useUserStore(state => state.isLoggedIn);

    const [isHoverUserMenuVisible, setIsHoverUserMenuVisible] = useState(false);

    const handleEmailMouseEnter = () => {
        setIsHoverUserMenuVisible(true);
    };

    const handleEmailMouseLeave = () => {
        setIsHoverUserMenuVisible(false);
    };

    useEffect(() => {
    }, [isLogged]);

    const loggedOutNavItems: NavItem[] = [
        { name: 'Create a free account', navTo: '/signup'},
        { name: 'Sign in', navTo: '/login'}
    ];

    const loggedInNavItems: NavItem[] = [
        { name: 'New vibrlink', navTo: '/new-vibrlink' },
        { name: 'My vibrlinks', navTo: '/my-vibrlinks' }
    ];

    return (
        <div className="navItems-container">
            {isLogged ? 
                (
                    loggedInNavItems.map(item => (
                        <NavItem key={item.name} name={item.name} navTo={item.navTo} />
                    ))
                ) 
                : 
                (
                    loggedOutNavItems.map(item => (
                        <NavItem key={item.name} name={item.name} navTo={item.navTo} />
                    ))

                ) 
            }
            {isLogged && (
                <div
                    className="navItem"
                    onMouseEnter={handleEmailMouseEnter}
                    onMouseLeave={handleEmailMouseLeave}
                >
                    <p>My Account</p>
                    {isHoverUserMenuVisible && (
                        <HoverUserMenu />
                    )}
                </div>
            )}
        </div>
    )
}; 
