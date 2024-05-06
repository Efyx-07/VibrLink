import { useState } from "react";
import { useUserStore, useReleaseStore } from "../../stores";
import { createLink } from "../../services/releaseService";
import { useNavigate } from "react-router-dom";
import FormButton from "../common/FormButton";
import './NewLinkForm.scss';

export default function NewVibrlinkForm() {

    const [spotifyId, setSpotifyId] = useState('');
    const spotifyPrefix: string = "https://open.spotify.com/intl-fr/album/";
    const userStore = useUserStore();
    const releaseStore = useReleaseStore();
    const navigate = useNavigate();

    const getSpotifyUrl = () => {
        return spotifyPrefix + spotifyId;
    };

    const sendSpotifyUrlAndUserId = async (e: React.FormEvent<HTMLFormElement>): Promise <void> => {
        e.preventDefault();

        const albumUrl: string = getSpotifyUrl();
        const userId: number | undefined = userStore.user?.id;

        try {
            const data  = await createLink(albumUrl, userId);
            console.log('New release datas:',data);

            const releaseSlug: string = data.releaseSlug;
        
            if (userId) {
              await releaseStore.loadReleasesData(userId);
              navigate(`/link-editor/${releaseSlug}`);
            }
            
          } catch (error) {
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
            <FormButton type="submit" name="Create the link" />
        </form>
    )
}