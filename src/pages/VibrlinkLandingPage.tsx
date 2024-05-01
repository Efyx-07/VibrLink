import { useReleaseStore } from "../stores";
import { Release } from "../types/releaseTypes";
import { useParams } from "react-router-dom";

export default function VibrlinkLandingPage() {

    const releaseStore = useReleaseStore();
    const allReleases: Release[] = releaseStore.releases;

    const {releaseSlug} = useParams();

    let selectedRelease: Release | undefined = allReleases.find((release) => {
        return release.slug === releaseSlug;
    });

    console.log('title: ', selectedRelease?.title)

    return (
        <div className="page">
            <div className="content">
                <h1>{selectedRelease?.title}</h1>
            </div>
        </div>
    )
};