import { Release } from "../types/releaseTypes";
import { useEffect } from "react";
import { useUserStore, useReleaseStore } from "../stores";
import { useNavigate } from "react-router-dom";
import DashboardReleaseCard from "../components/cards/DashboardReleaseCard";
import PageTitle from "../components/common/PageTitle";
import FormButton from "../components/common/FormButton";
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

    const navigate = useNavigate();

    // useEffect to display the updates
    useEffect(() => {
        if (user) {
            loadReleasesData(user.id);
        }
    }, [user, loadReleasesData]);

    // get the releases starting from the most recent
    const reversedReleases = reverseReleases(releases);

    return (
        <div className={`page ${releases.length > 0 ? "myLinks-page" : "" }`}>
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
                        <>
                            <div className="empty-list-container">
                                <div className="image-container">
                                    <img src="../../public/decoration/empty-list.svg" />
                                </div>
                                <p>You have no vibrlink yet!</p>
                                <FormButton type="button" name="Create a vibrLink" onClick={() => navigate('/new-vibrlink')}/>
                            </div>
                        </>
                    )
                }
            </div>
        </div>
    )
};