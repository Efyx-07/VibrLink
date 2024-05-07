import { useState } from "react";
import { useUserStore } from "../../stores";
import HoverUserMenu from './HoverUserMenu';
import './Navigation.scss';

export default function MyAccountItem() {

    const isLogged: boolean = useUserStore(state => state.isLoggedIn);

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