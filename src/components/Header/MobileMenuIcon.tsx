import { Icon } from '@iconify-icon/react';
import { MouseEventHandler } from "react";
import './MobileMenuIcon.scss';

interface MobileMenuIconProps {
    isOpen: boolean;
    onOpenClick: MouseEventHandler<HTMLDivElement>;
    onCloseClick: MouseEventHandler<HTMLDivElement>;
}

export default function MobileMenuIcon({isOpen, onOpenClick, onCloseClick}: MobileMenuIconProps) {
    return (
        <div className="menu-icon-container">
            {!isOpen ? 
                (
                    <Icon icon="material-symbols:menu" className='menu-icon' onClick={onOpenClick}/>
                )
                :
                (
                    <Icon icon="material-symbols:close" className='menu-icon' onClick={onCloseClick}/>
                )
            }
        </div>
    )
};