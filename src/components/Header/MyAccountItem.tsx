import { useState } from "react";
import { useUserStore } from "../../stores";
import HoverUserMenu from './HoverUserMenu';
import './Navigation.scss';

export default function MyAccountItem() {

    // get the login status of the user to display or not the item
    const isLogged: boolean = useUserStore(state => state.isLoggedIn);

    // state for HoverUserMenu
    const [isHoverUserMenuVisible, setIsHoverUserMenuVisible] = useState<boolean>(false);
    
    const handleEmailMouseEnter = (): void => {
        setIsHoverUserMenuVisible(true);
    };

    const handleEmailMouseLeave = (): void => {
        setIsHoverUserMenuVisible(false);
    };

    return (
        <div className="navItems-container">
            {isLogged && (
                <div
                    className="navItem"
                    onMouseEnter={handleEmailMouseEnter}
                    onMouseLeave={handleEmailMouseLeave}
                >
                    <p>My Account</p>
                    {isHoverUserMenuVisible && 
                        (
                            <HoverUserMenu />
                        )}
                </div>
            )}  
        </div>
    )
}