import './Modals-style.scss';

export default function DeleteAccountModal() {
    return (
        <div className="modal">
            <div className="modal-content">
                <div className="icon">
                    <p>?</p>
                </div>
                <div className="mention-container">
                    <div className="text-container">
                        <p className="topline">Are you sure you want to delete your account?</p>
                        <p className="mention">This will definitely remove your account and all your datas.</p>
                    </div>
                    <div className="buttons-container">
                        <button className="confirm">Confirm</button>
                        <button className="cancel">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    )
}