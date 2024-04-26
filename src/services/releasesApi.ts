import type { Release, Platform } from '../types/releaseTypes';
import type { ImportMetaEnv } from '../vite-env';

const hostName: ImportMetaEnv = import.meta.env.VITE_BACKEND_URL;

export async function fetchReleasesData(userId: number): Promise<Release[]> {
    try {
        
        const response = await fetch(`${hostName}/releasesRoute/releases/${userId}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });

        if (!response.ok) {
            throw new Error ('Error while fetching datas');
        }

        const data = await response.json();

        if (!data.formattedReleases) {
            console.error('Invalid response format:', data);
            throw new Error('Invalid response format');
        };

        // convert the visibility values from number to boolean (1 = true, 0 = false)
        data.formattedReleases.forEach((release: Release) => {
            release.platforms.forEach((platform: Platform) => {
                platform.visibility = !!platform.visibility;
            });
        });

        console.log('datas recupérées: ', data.formattedReleases)
        
        return data.formattedReleases;

    } catch (error) {
        console.error('Error while fetching datas', error);
        throw error;
    }
};