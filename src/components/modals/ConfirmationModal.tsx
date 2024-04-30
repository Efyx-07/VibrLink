import { MouseEventHandler } from "react";
import './ConfirmationModal.scss';

interface ConfirmationModal {
    icon: string;
    topline: string;
    message: string;
    onConfirm: MouseEventHandler<HTMLButtonElement>;
    onCancel: MouseEventHandler<HTMLButtonElement>;
    isOpen: boolean;
}

export default function ConfirmationModal({ icon, topline, message, onConfirm, onCancel, isOpen }: ConfirmationModal) {
    
    return (
        <div className={`modal ${isOpen ? '' : 'hidden'}`}>
            <div className={`modal-content ${isOpen ? '' : 'hidden-modal-content'}`}>
                <div className="icon-container">
                    <p className="icon">{icon}</p>
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