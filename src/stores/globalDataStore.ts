import { create } from 'zustand';
import { ImportMetaEnv } from '../vite-env';

interface State {
    hostName: ImportMetaEnv;
};

const useGlobalDataStore = create<State>(() => ({
    hostName: import.meta.env.VITE_BACKEND_URL
}));

export default useGlobalDataStore;