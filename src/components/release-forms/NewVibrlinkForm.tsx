import { useState } from "react";
import { useUserStore, useReleaseStore, useGlobalDataStore } from "../../stores";
import { useNavigate } from "react-router-dom";
import FormButton from "../common/FormButton";
import './NewVibrlinkForm.scss';

export default function NewVibrlinkForm() {

    const [spotifyId, setSpotifyId] = useState('');
    const spotifyPrefix: string = "https://open.spotify.com/intl-fr/album/";
    const { hostName } = useGlobalDataStore();
    const userStore = useUserStore();
    const releaseStore = useReleaseStore();
    const navigate = useNavigate();

    const getSpotifyUrl = () => {
        return spotifyPrefix + spotifyId;
    };

    const sendSpotifyUrlAndUserId = async(e: React.FormEvent<HTMLFormElement>): Promise <void> => {
        e.preventDefault();

        const spotifyUrl: string = getSpotifyUrl();

        try {
            const userId: number | undefined = userStore.user?.id;
        
            const response = await fetch(`${hostName}/releasesRoute/getReleaseSpotifyUrl`, { 
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ albumUrl: spotifyUrl, userId: userId })
            });
        
            if (!response.ok) {
              throw new Error('Failed to send Spotify URL');
            }
        
            const data = await response.json();
            console.log('New release datas:',data);
        
            if (userId) {
              await releaseStore.loadReleasesData(userId);
              navigate(`/my-vibrlinks`);
            }
        
          } catch (error) {
            console.error('Error sending Spotify URL:', error);
          }
    }

    return (
        <form onSubmit={sendSpotifyUrlAndUserId}>
            <div className="input-container">
                <label htmlFor="spotifyId">Enter your release Spotify id:</label>
                <div className="input-wrapper">
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