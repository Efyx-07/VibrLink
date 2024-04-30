import { useModal } from "../../contexts/ModalContext";
import ConfirmationModal from "./ConfirmationModal";

export default function DeleteAccountModal() {

    const { isDeleteAccountModalOpen, closeDeleteAccountModal } = useModal();
    const handleSignout = () => {
    };

    const handleCancel = () => {
        closeDeleteAccountModal();
    };
    
    return (
        <>
            {isDeleteAccountModalOpen && (
                <ConfirmationModal 
                    icon="?"
                    topline="Are you sure you want to delete your account?"
                    message="This will definitely remove your account and all your datas."
                    onConfirm={handleSignout}
                    onCancel={handleCancel}
                    isOpen={isDeleteAccountModalOpen}
                />
            )}
        </>
    )
}