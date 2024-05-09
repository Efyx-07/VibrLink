import { Release } from "../types/releaseTypes";
import { useEffect } from "react";
import { useUserStore, useReleaseStore } from "../stores";
import DashboardReleaseCard from "../components/cards/DashboardReleaseCard";
import '../assets/sass/common/pages-common-styles.scss';
import './MyLinksPage.scss';


// function to create an new array for reversed releases
const reverseReleases = (releases: readonly Release[]) => {
    return [...releases].reverse();
};

export default function MyLinksPage() {

    // get user and releases data from the stores
    const user = useUserStore(state => state.user);
    const releases = useReleaseStore(state => state.releases);
    const loadReleasesData = useReleaseStore(state => state.loadReleasesData);

    // useEffect to display the updates
    useEffect(() => {
        if (user) {
            loadReleasesData(user.id);
        }
    }, [user, loadReleasesData]);

    // get the releases starting from the most recent
    const reversedReleases = reverseReleases(releases);

    return (
        <div className="page myLinks-page">
            <div className="content">
                <div className="dashboard-releaseCards-container">
                    {reversedReleases.map(release => (
                        <DashboardReleaseCard release={release}/>
                    ))}
                </div>
            </div>
        </div>
    )
};