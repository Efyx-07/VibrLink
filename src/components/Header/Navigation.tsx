import { Link } from "react-router-dom";
import { useUserStore } from "../../stores";
import { useEffect } from "react";
import './Navigation.scss';

interface NavItem {
    name: string,
    navTo: string
};

function NavItem({name, navTo, onItemClick}: NavItem & NavigationProps) {

    const handleClick = () => {
        onItemClick();
    }

    return (
        <Link className="navItem" to={navTo} onClick={handleClick}>
            <p>{name}</p>
        </Link>
    )
};

interface NavigationProps {
    onItemClick: () => void; 
}

export default function Navigation({onItemClick}: NavigationProps) {

    const isLogged: boolean = useUserStore(state => state.isLoggedIn);

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
                        <NavItem key={item.name} name={item.name} navTo={item.navTo} onItemClick={onItemClick}/>
                    ))
                ) 
                : 
                (
                    loggedOutNavItems.map(item => (
                        <NavItem key={item.name} name={item.name} navTo={item.navTo} onItemClick={onItemClick}/>
                    ))

                ) 
            }
        </div>
    )
}; 
