import { Link } from "react-router-dom";
import { useUserStore } from "../../stores";
import { useEffect } from "react";
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
    const user = useUserStore(state => state.user );

    useEffect(() => {
    }, [isLogged]);

    const loggedOutNavItems: NavItem[] = [
        { name: 'Create a free account', navTo: '/signup'},
        { name: 'Sign in', navTo: '/login'}
    ];

    const loggedInNavItems: NavItem[] = [
        { name: 'New vibrlink', navTo: '' },
        { name: 'My vibrlinks', navTo: '' }
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
            {isLogged && <p>{user?.email}</p>} 
        </div>
    )
}; 
