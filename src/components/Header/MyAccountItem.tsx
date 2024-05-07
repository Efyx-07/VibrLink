import { useState } from "react";
import HoverUserMenu from './HoverUserMenu';
import './Navigation.scss';

export default function MyAccountItem() {
    const [isHoverUserMenuVisible, setIsHoverUserMenuVisible] = useState<boolean>(false);
    const handleEmailMouseEnter = (): void => {
        setIsHoverUserMenuVisible(true);
    };

    const handleEmailMouseLeave = (): void => {
        setIsHoverUserMenuVisible(false);
    };

    return (
        <div className="navItems-container">
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
        </div>
    )
}