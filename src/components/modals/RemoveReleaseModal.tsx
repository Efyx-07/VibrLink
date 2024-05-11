import { useModal } from "../../contexts/ModalContext";
import { useState, useEffect } from "react";
import { useUserStore, useReleaseStore } from "../../stores";
import { removeReleaseById } from "../../services/releaseService";
import ConfirmationModal from "./ConfirmationModal";

export default function RemoveReleaseModal() {

    const { isRemoveReleaseModalOpen, modalReleaseId, closeRemoveReleaseModal } = useModal();
    const releaseStore = useReleaseStore();
    const userStore = useUserStore();
    const userId = userStore.user?.id;

    // state for the release title
    const [releaseTitle, setReleaseTitle] = useState<string | null>(null);

    useEffect(() => {
        if (modalReleaseId !== null) {
            // get the release matching with modalReleaseId
            releaseStore.getReleaseById(modalReleaseId)
                .then(release => {
                    // update the release title
                    if (release) {
                        setReleaseTitle(release.title);
                    }
                })
                .catch(error => {
                    console.error('Error while fetching release:', error);
                });
        }
    }, [modalReleaseId, releaseStore]);

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
                    icon="mdi:skull-crossbones"
                    topline={`Are you sure you want to delete "${releaseTitle}?"`}
                    message="This will definitely remove this release."
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