import { MouseEventHandler } from "react";
import { Icon } from '@iconify-icon/react';
import './ConfirmationModal.scss';

interface ConfirmationModalProps {
    icon: string;
    topline: string;
    message: string;
    onConfirm: MouseEventHandler<HTMLButtonElement>;
    onCancel: MouseEventHandler<HTMLButtonElement>;
    isOpen: boolean;
}

export default function ConfirmationModal({ icon, topline, message, onConfirm, onCancel, isOpen }: ConfirmationModalProps) {
    
    return (
        <div className="modal">
            <div className={`modal-content ${isOpen ? '' : 'hidden-modal-content'}`}>
                <div className="icon-container">
                    <Icon icon={icon} className="icon"/>
                </div>
                <div className="message-container">
                    <div className="text-container">
                        <p className="topline">{topline}</p>
                        <p className="message">{message}</p>
                    </div>
                    <div className="buttons-container">
                        <button className="confirm" onClick={onConfirm}>Confirm</button>
                        <button className="cancel" onClick={onCancel}>Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    )
};
