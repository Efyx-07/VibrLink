import { useState, useEffect } from "react";
import { useUserStore, useReleaseStore } from "../stores";
import { Release } from "../types/releaseTypes";
import { User } from "../types/userTypes";
import DbVibrlinkCard from "../components/cards/DbVibrlinkCard";
import '../assets/sass/common/pages-common-styles.scss';

export default function VibrlinksPage() {

    const userStore = useUserStore();
    const releaseStore = useReleaseStore();
    const user: User | null = userStore.user;
    const [releases, setReleases] = useState<Release[]>([]);

    useEffect(() => {
        const fetchReleasesData = async () => {
            try {
                if(!!user) {
                    const userId = user.id;
                    await releaseStore.loadReleasesData(userId);
                    setReleases(releaseStore.releases);
                }
            } catch (error) {
                console.error('Error while fetching datas: ', error);
            }
        }
        fetchReleasesData(); 
    }, [releaseStore, user]);

    return (
        <div className="page">
            <div className="content">
                <DbVibrlinkCard releases={releases} />
            </div>
        </div>
    )
};