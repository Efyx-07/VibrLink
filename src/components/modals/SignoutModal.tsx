import ConfirmationModal from "./ConfirmationModal";
import { useModal } from "../../context/ModalContext";

export default function SignoutModal() {

    const { isSignoutModalOpen, closeSignoutModal } = useModal();

    const handleSignout = () => {
        closeSignoutModal(); 
    };

    const handleCancel = () => {
        closeSignoutModal();
    };

    return (
        <ConfirmationModal 
            icon="?"
            topline="Are you sure ?"
            message="Please confirm to sign out."
            onConfirm={handleSignout}
            onCancel={handleCancel}
            isOpen={isSignoutModalOpen}
        />
    )
}