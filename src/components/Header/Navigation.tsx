import { Link } from "react-router-dom";
import { useUserStore } from "../../stores";
import { useEffect } from "react";

interface NavItem {
    name: string,
    navTo: string
};

const NavItem = ({name, navTo}: NavItem) => {
    return (
        <Link className="navItem" to={navTo}>
            <p>{name}</p>
        </Link>
    )
};

const Navigation = () => {

    const isLogged = useUserStore(state => state.isLoggedIn);

    useEffect(() => {
    }, [isLogged]);

    const loggedOutNavItems: NavItem[] = [
        { name: 'Create a free account', navTo: '/register'},
        { name: 'Sign in', navTo: '/login'}
    ];

    const loggedInNavItems: NavItem[] = [
        { name: 'New vibrlink', navTo: '' },
        { name: 'My vibrlinks', navTo: '' },
        { name: 'Account', navTo: ''},
    ];

    return (
        <div className="navItems-container">
            {isLogged ? (
                    loggedInNavItems.map(item => (
                        <NavItem key={item.name} name={item.name} navTo={item.navTo} />
                    ))
                ) : (
                    loggedOutNavItems.map(item => (
                        <NavItem key={item.name} name={item.name} navTo={item.navTo} />
                    ))
                )
            }    
        </div>
    )
}; 

export default Navigation