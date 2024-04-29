import './UserPanel.scss';
import { Icon } from '@iconify-icon/react';

export default function UserPanel() {
    return (
        <div className="user-panel">
            <div className="items-container">
                <div className="item-container">
                    <Icon icon="mdi:tools" className='icon'/>
                    <p>Update password</p>
                </div>
                <div className="item-container">
                    <Icon icon="material-symbols:delete-outline-sharp" className='icon'/>
                    <p>Delete account</p>
                </div>
                <div className="item-container">
                    <Icon icon="material-symbols:logout-sharp" className='icon'/>
                    <p>Sign out</p>
                </div>
            </div>
        </div>
    )
}