import ConfirmationModal from "./ConfirmationModal";

export default function DeleteAccountModal() {
    const handleSignout = () => {
    };

    const handleCancel = () => {
    };
    
    return (
        <ConfirmationModal 
            icon="?"
            topline="Are you sure you want to delete your account?"
            message="This will definitely remove your account and all your datas."
            onConfirm={handleSignout}
            onCancel={handleCancel}
        />
    )
}