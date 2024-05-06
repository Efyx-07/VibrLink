import { useState } from "react";
import { useUserStore, useReleaseStore } from "../../stores";
import { createLink } from "../../services/releaseService";
import { useNavigate } from "react-router-dom";
import FormButton from "../common/FormButton";
import LoadingSpinner from "../common/LoadingSpinner";
import './NewLinkForm.scss';

export default function NewVibrlinkForm() {

    const [spotifyId, setSpotifyId] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const spotifyPrefix: string = "https://open.spotify.com/intl-fr/album/";
    const userStore = useUserStore();
    const releaseStore = useReleaseStore();
    const navigate = useNavigate();

    const getSpotifyUrl = () => {
        return spotifyPrefix + spotifyId;
    };

    const sendSpotifyUrlAndUserId = async (e: React.FormEvent<HTMLFormElement>): Promise <void> => {
        e.preventDefault();
        setIsLoading(true);

        const albumUrl: string = getSpotifyUrl();
        const userId: number | undefined = userStore.user?.id;

        try {
            const data  = await createLink(albumUrl, userId);

            setIsLoading(false);

            const releaseSlug: string = data.releaseSlug;
        
            if (userId) {
              await releaseStore.loadReleasesData(userId);
              navigate(`/link-editor/${releaseSlug}`);
            }
            
          } catch (error) {
            setErrorMessage(true);
            setIsLoading(false);
            // if error reset the form after 3s
            setTimeout(() => {
                setErrorMessage(false);
                setSpotifyId('Hey');
            }, 3000);
            console.error('Failed to send album URL: ', error);
          }
    }

    return (
        <form onSubmit={sendSpotifyUrlAndUserId}>
            <div className="input-container">
                <label htmlFor="spotifyId">Enter your release Spotify id:</label>
                <div className="newLinkForm-input-wrapper">
                <p>{spotifyPrefix}</p>
                <input 
                    className="input" 
                    type="text" 
                    name="spotifyId" 
                    id="spotifyId" 
                    required 
                    onChange={(e) => setSpotifyId(e.target.value)}
                />
                </div>
            </div>
            {errorMessage && <p className="error-message">This is not a valid Id or the release already exists !</p>}
            {isLoading ? (
                <div className="spinner-container">
                    <LoadingSpinner />
                </div>
            ) : <FormButton type="submit" name="Create your link" />}
        </form>
    )
}