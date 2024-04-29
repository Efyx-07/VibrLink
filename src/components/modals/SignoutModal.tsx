import ConfirmationModal from "./ConfirmationModal";

export default function SignoutModal() {

    const handleSignout = () => {
    };

    const handleCancel = () => {
    };

    return (
        <ConfirmationModal 
            icon="?"
            topline="Are you sure ?"
            message="Please confirm to sign out."
            onConfirm={handleSignout}
            onCancel={handleCancel}
        />
    )
}