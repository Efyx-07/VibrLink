import { MouseEventHandler } from "react";
import './ConfirmationModal.scss';

interface ConfirmationModal {
    isOpen: boolean;
    icon: string;
    topline: string;
    message: string;
    onConfirm: MouseEventHandler<HTMLButtonElement>;
    onCancel: MouseEventHandler<HTMLButtonElement>;
}

export default function ConfirmationModal({ isOpen, icon, topline, message, onConfirm, onCancel }: ConfirmationModal) {
    return (
        <div className={`modal ${isOpen ? 'open' : ''}`}>
            <div className="modal-content">
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
}