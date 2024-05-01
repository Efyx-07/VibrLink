import { Release } from "../../types/releaseTypes";
import { useReleaseStore, useUserStore, useGlobalDataStore } from "../../stores";
import CardButton from "./CardButton";
import './DbVibrlinkCard.scss';

interface DbVibrlinkCard {
    releases: Release[];
};

const reverseReleases = (releases: readonly Release[]) => {
    return [...releases].reverse();
};

export default function DbVibrlinkCard({releases}: DbVibrlinkCard) {

    const reversedReleases = reverseReleases(releases);
    
    const { hostName } = useGlobalDataStore();
    const releaseStore = useReleaseStore();
    const userStore = useUserStore();
    const userId = userStore.user?.id;

    const navToReleaseToEditPage = () => {};

    const removeRelease = async (releaseId: number): Promise <void> => {
        try {

            const response = await fetch(`${hostName}/releasesRoute/${releaseId}`, {
                method: 'DELETE'
            });
    
            if (!response.ok) {
                throw new Error('Failed to delete release');
            }
    
            console.log('Release succesfully removed: ', releaseId);
    
            if (userId) {
                releaseStore.loadReleasesData(userId);
            }
    
        } catch (error) {
            console.error('Error removing release:', error);
        }
    };

    const navToReleaseLandingPage = () => {};

    return (
        <div className="container">
            {reversedReleases.map(release => (
                <div className="release-card" key={release.id}>
                    <div className="image-container">
                        <img src={release.cover} />
                    </div>
                    <div className="infos-container">
                        <p className="title">{release.title}</p>
                        <p className="artist">{release.artist}</p>
                    </div>
                    <div className="buttons-container">
                        <CardButton name="Edit link" icon="mdi:tools" onClick={navToReleaseToEditPage}/>
                        <CardButton name="Delete link" icon="mdi:skull-crossbones" onClick={() => removeRelease(release.id)}/>
                        <CardButton name="View landing page" icon="mdi:telescope" onClick={navToReleaseLandingPage} />
                    </div>
                </div>
            ))}   
        </div>
    ) 
};