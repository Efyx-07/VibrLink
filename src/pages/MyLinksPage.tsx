import { Release } from "../types/releaseTypes";
import { useEffect } from "react";
import { useUserStore, useReleaseStore } from "../stores";
import DashboardReleaseCard from "../components/cards/DashboardReleaseCard";
import PageTitle from "../components/common/PageTitle";
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
                {releases.length > 0 ? 
                (
                    <>
                        <PageTitle mainPart="Manage" secondaryPart="your vibrlinks"/>
                        <div className="dashboard-releaseCards-container">
                            {reversedReleases.map(release => (
                                <DashboardReleaseCard release={release} key={release.id}/>
                            ))}
                        </div>
                    </>
                )
                :
                (
                    <p>No vibrlink yet !</p>
                )
                }
            </div>
        </div>
    )
};