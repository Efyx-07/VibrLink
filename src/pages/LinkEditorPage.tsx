import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Release } from "../types/releaseTypes";
import { useReleaseStore, useUserStore } from "../stores";
import ReleaseBanner from "../components/cards/ReleaseBanner";
import LinkEditorForm from "../components/release-forms/link-editor/LinkEditorForm";
import LoadingSpinner from "../components/common/LoadingSpinner";
import './LinkEditorPage.scss'

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
    }, [userId]);

    return (
        <div className="page">
            <div className="content">
                {selectedRelease ? (
                    <div className="linkEditor-wrapper">
                        <ReleaseBanner selectedRelease={selectedRelease} />
                        <LinkEditorForm selectedRelease={selectedRelease} />
                    </div>
                ) 
                : 
                <LoadingSpinner />}   
            </div>
        </div>
    )
};