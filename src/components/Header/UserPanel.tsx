import './UserPanel.scss';
import { Icon } from '@iconify-icon/react';
import { MouseEventHandler } from "react";
import { useNavigate } from 'react-router-dom';
import { useModal } from '../../context/ModalContext';

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

export default function UserPanel() {

    const navigate = useNavigate();

    const { openSignoutModal } = useModal();

    const navToSettings = (): void => {
        navigate('/account-settings');
    }

    const openDeleteAccountModal = () => {}

    return (
        <>
        <div className="user-panel">
            <div className="items-container">
                <UserItem name="Update password" icon="mdi:tools" onClick={navToSettings} />
                <UserItem name="Delete account" icon="material-symbols:delete-outline-sharp" onClick={openDeleteAccountModal} />
                <UserItem name="Sign out" icon="material-symbols:logout-sharp" onClick={openSignoutModal} />
            </div>
        </div>
        </>
    )
};