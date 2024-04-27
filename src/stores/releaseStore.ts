import { create } from 'zustand';
import { fetchReleasesData } from '../services/releasesApi';
import { Release } from '../types/releaseTypes';

interface State {
    releases: Release[];
    loadReleasesData: (userId: number) => Promise<void>;
}

const useReleaseStore = create<State>((set) => ({
    releases: [],
    loadReleasesData: async(userId) => {
        try {
            const releasesData: Release[] = await fetchReleasesData(userId);
            set({ releases: releasesData});
        } catch (error) {
            console.error('Error fetching releases data:', error);
        }
    }
}));

export default useReleaseStore;