import { useModal } from "../../contexts/ModalContext";
import ConfirmationModal from "./ConfirmationModal";

export default function SignoutModal() {

    const { isSignOutModalOpen, closeSignOutModal } = useModal();

    const handleSignout = () => {
    };

    const handleCancel = () => {
        closeSignOutModal();
    };

    return (
        <>
            {isSignOutModalOpen && (
                <ConfirmationModal 
                    icon="?"
                    topline="Are you sure ?"
                    message="Please confirm to sign out."
                    onConfirm={handleSignout}
                    onCancel={handleCancel}
                    isOpen={isSignOutModalOpen}
                />
            )}
        </>
    )
};