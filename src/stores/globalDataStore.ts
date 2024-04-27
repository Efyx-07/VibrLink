import { create } from 'zustand';
import { ImportMetaEnv } from '../vite-env';

interface State {
    hostName: ImportMetaEnv;
    siteName: string;
};

const useGlobalDataStore = create<State>(() => ({
    hostName: import.meta.env.VITE_BACKEND_URL,
    siteName: 'VibrLink'
}));

export default useGlobalDataStore;