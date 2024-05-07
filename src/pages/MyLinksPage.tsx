import { useEffect } from "react";
import { useUserStore, useReleaseStore } from "../stores";
import DashboardLinkCard from "../components/cards/DashboardLinkCard";
import '../assets/sass/common/pages-common-styles.scss';
import './MyLinksPage.scss';

export default function MyLinksPage() {

    // get user and release data from the stores
    const user = useUserStore(state => state.user);
    const releases = useReleaseStore(state => state.releases);
    const loadReleasesData = useReleaseStore(state => state.loadReleasesData);

    // useEffect to display the updates
    useEffect(() => {
        if (user) {
            loadReleasesData(user.id);
        }
    }, [user, loadReleasesData]);

    return (
        <div className="page myLinks-page">
            <div className="content">
                <DashboardLinkCard releases={releases} />
            </div>
        </div>
    )
};