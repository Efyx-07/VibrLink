import { MouseEventHandler } from "react";
import { useNavigate } from 'react-router-dom';
import { useUserStore } from "../../stores";
import { useModal } from "../../contexts/ModalContext";
import { Icon } from '@iconify-icon/react';
import './HoverUserMenu.scss';

// component for an item
interface UserItem {
    name: string;
    icon: string;
    onClick: MouseEventHandler<HTMLDivElement>;
};

function UserItem({name, icon, onClick}: UserItem) {
    return (
        <div className="item-container" onClick={onClick}>
            <Icon icon={icon} className='icon'/>
            <p>{name}</p>
        </div>
    )
};

export default function HoverUserMenu() {

    // get the user from the store
    const user = useUserStore(state => state.user );

    const navigate = useNavigate();
    const navToSettings = (): void => {
        navigate('/account-settings');
    };

    // use the modalContext to get the functions
    const { openSignOutModal } = useModal();
    const { openDeleteAccountModal } = useModal();

    return (
        <>
        <div className="hover-user-menu">
            <div className="items-container">
                <div className="userEmail-container">
                    <Icon icon="" className='icon'/>
                    <p>{user?.email}</p>
                </div>
                <UserItem name="Update password" icon="mdi:tools" onClick={navToSettings} />
                <UserItem name="Delete account" icon="mdi:skull-crossbones" onClick={openDeleteAccountModal} />
                <UserItem name="Sign out" icon="material-symbols:logout-sharp" onClick={openSignOutModal} />
            </div>
        </div>
        </>
    )
};