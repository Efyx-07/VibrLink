import { create } from 'zustand';
import { fetchReleasesData } from '../services/releasesApi';
import { Release } from '../types/releaseTypes';

interface State {
    releases: Release[];
    loadReleasesData: (userId: number) => Promise<void>;
    getReleaseById: (releaseId: number) => Release | undefined;
}

const useReleaseStore = create<State>((set, get) => ({
    releases: [],
    loadReleasesData: async(userId) => {
        try {
            const releasesData: Release[] = await fetchReleasesData(userId);
            set({ releases: releasesData});
        } catch (error) {
            console.error('Error fetching releases data:', error);
        }
    }, 
    getReleaseById: (releaseId) => {
        const release = get().releases.find((release) => release.id === releaseId);
        return release;
    }
}));

export default useReleaseStore;