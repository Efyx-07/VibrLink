import { useModal } from "../../contexts/ModalContext";
import { useReleaseStore, useUserStore } from "../../stores";
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "./ConfirmationModal";

export default function SignoutModal() {

    const { isSignOutModalOpen, closeSignOutModal } = useModal();
    const releaseStore = useReleaseStore();
    const userStore = useUserStore();
    const navigate = useNavigate();

    const handleSignoutAndNavToHomePage = () => {
        releaseStore.releases = [];
        userStore.logOutUser();
        closeSignOutModal();
        navigate('/');
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
                    onConfirm={handleSignoutAndNavToHomePage}
                    onCancel={handleCancel}
                    isOpen={isSignOutModalOpen}
                />
            )}
        </>
    )
};