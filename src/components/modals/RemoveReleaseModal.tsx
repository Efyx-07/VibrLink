import { useModal } from "../../contexts/ModalContext";
import { useUserStore, useReleaseStore } from "../../stores";
import { removeReleaseById } from "../../services/releaseService";
import ConfirmationModal from "./ConfirmationModal";

export default function RemoveReleaseModal() {

    const { isRemoveReleaseModalOpen, modalReleaseId, closeRemoveReleaseModal } = useModal();
    const releaseStore = useReleaseStore();
    const userStore = useUserStore();
    const userId = userStore.user?.id;

    const removeRelease = async (): Promise <void> => {

        if (modalReleaseId === null) {
            console.error('modalReleaseId is null');
            return;
        }

        console.log('id of the release to remove: ', modalReleaseId)

        try {
            await removeReleaseById(modalReleaseId); 
            if (userId) {
                releaseStore.loadReleasesData(userId);
            }

            closeRemoveReleaseModal();
    
        } catch (error) {
            console.error('Error while removing release:', error);
        }
    };

    const handleCancel = () => {
        closeRemoveReleaseModal();
    };

    return (
        <>
            {isRemoveReleaseModalOpen && (
                <ConfirmationModal 
                    icon="?"
                    topline="Are you sure you want to delete this release?"
                    message="This will definitely remove your account and all your datas."
                    onConfirm={() => {
                        if (modalReleaseId !== null) {
                            removeRelease();
                        }
                    }}
                    onCancel={handleCancel}
                    isOpen={isRemoveReleaseModalOpen}
                />
            )}
        </>
    )
};