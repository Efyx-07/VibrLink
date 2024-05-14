import { create } from 'zustand';
import { ImportMetaEnv } from '../vite-env';

interface State {
    hostName: ImportMetaEnv;
    frontendAddress: ImportMetaEnv;
    siteName: string;
    currentYear: number;
};

const useGlobalDataStore = create<State>(() => ({
    hostName: import.meta.env.VITE_BACKEND_URL,
    frontendAddress: import.meta.env.VITE_FRONTEND_URL,
    siteName: 'VibrLink',
    currentYear: new Date().getFullYear(),
}));

export default useGlobalDataStore;