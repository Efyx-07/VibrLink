export default function SignoutModal() {
    return (
        <div className="modal">
            <div className="logout-window">
                <div className="icon">
                    <p>?</p>
                </div>
                <div className="mention-container">
                    <div className="text-container">
                        <p className="topline">Are you sure?</p>
                        <p className="subline">Please confirm to logout.</p>
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