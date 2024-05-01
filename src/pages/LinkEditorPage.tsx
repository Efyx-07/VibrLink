import { useReleaseStore } from "../stores";
import { Release } from "../types/releaseTypes";
import { useParams } from "react-router-dom";

export default function LinkEditorPage() {

    const releaseStore = useReleaseStore();
    const allReleases: Release[] = releaseStore.releases;

    const {releaseId} = useParams();

    let selectedRelease: Release | undefined = allReleases.find((release) => {
        return release.id.toString() === releaseId;
    });

    return (
        <div className="page">
            <div className="content">
                <h1>{selectedRelease?.title}</h1>
            </div>
        </div>
    )
}