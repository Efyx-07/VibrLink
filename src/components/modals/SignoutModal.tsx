import ConfirmationModal from "./ConfirmationModal";

export default function SignoutModal() {
    const handleSignout = () => {
        // Logique de déconnexion
    };

    const handleCancel = () => {
        // Annulation de la déconnexion
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