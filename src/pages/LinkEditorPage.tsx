import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Release } from "../types/releaseTypes";
import { useReleaseStore, useUserStore } from "../stores";
import ReleaseBanner from "../components/cards/ReleaseBanner";
import EditLinkForm from "../components/release-forms/EditLinkForm";

export default function LinkEditorPage() {

    const { releaseId } = useParams();
    const [selectedRelease, setSelectedRelease] = useState<Release | null>(null);
    const releaseStore = useReleaseStore();
    const userId = useUserStore().user?.id;

    useEffect(() => {
        const initialize = async () => {
            await releaseStore.initializeStore(Number(userId));
            const release = await releaseStore.getReleaseById(Number(releaseId));
            setSelectedRelease(release || null);
        };
        initialize();
    }, [releaseStore, releaseId]);

    return (
        <div className="page">
            <div className="content">
                {selectedRelease ? (
                    <div>
                        <ReleaseBanner selectedRelease={selectedRelease} />
                        <EditLinkForm selectedRelease={selectedRelease} />
                    </div>
                ) 
                : 
                <p>No release found for ID {releaseId}</p>}   
            </div>
        </div>
    )
};