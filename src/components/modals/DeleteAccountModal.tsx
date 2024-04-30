import { useModal } from "../../contexts/ModalContext";
import { useUserStore } from "../../stores";
import { deleteAccount } from "../../services/authService";
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "./ConfirmationModal";

export default function DeleteAccountModal() {

    const { isDeleteAccountModalOpen, closeDeleteAccountModal } = useModal();
    const userStore = useUserStore();
    const navigate = useNavigate();

    const deleteUserAccount = async(): Promise<void> => {

        const userId: number | undefined = userStore.user?.id

        if (!userId) {
            console.error('No userId found');
            return
        }

        try {
            await deleteAccount(userId);
            closeDeleteAccountModal();
            userStore.logOutUser();
            navigate('/');

        } catch (error) {
            console.error('Error while deleting user account', error);
        }
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
                    onConfirm={deleteUserAccount}
                    onCancel={handleCancel}
                    isOpen={isDeleteAccountModalOpen}
                />
            )}
        </>
    )
}