import type { ImportMetaEnv } from '../vite-env';

// backend server address
const hostName: ImportMetaEnv = import.meta.env.VITE_BACKEND_URL;

// backend query to create a new link
export async function createLink(albumUrl: string, userId: number | undefined): Promise <{ releaseId: number }> {

    try {
        const response = await fetch(`${hostName}/releasesRoute/getReleaseSpotifyUrl`, { 
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ albumUrl, userId })
        });

        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error('Failed to send album URL' + response.statusText);
        }

    } catch (error) {
        throw new Error('Failed to send album URL' + error);
    }
};

// backend query to remove a release by Id
export async function removeReleaseById(releaseId: number): Promise <void> {

    try {
        const response = await fetch(`${hostName}/releasesRoute/${releaseId}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            console.log('Release succesfully removed: ', releaseId)
        } else {
            throw new Error('Failed to delete release' + response.statusText);
        }

    } catch (error) {
        throw new Error('Failed to delete release' + error);
    }
}