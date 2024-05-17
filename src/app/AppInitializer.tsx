// hook to initialize the app
import { useUserStore, useReleaseStore } from '../stores';
import { useEffect, useState } from 'react';

export default function useAppInitializer() {

    const userStore = useUserStore();
    const releaseStore = useReleaseStore();
    // state to manage the render if the user is logged or not
    const [loading, setLoading] = useState<boolean>(true);

    // get the datas before app initialisation
    useEffect(() => {
        const initApp = async (): Promise<void> => {
            try {
                await userStore.loadUserDataFromLocalStorage();
                const token = localStorage.getItem('token');

                if (token) {
                userStore.setToken(token);
                const userId = userStore.user?.id;

                    if (userId) {
                        await releaseStore.loadReleasesData(userId);
                    }
                }
            } catch (error) {
                console.error('Error while fetching data: ', error);
            } finally {
                setLoading(false);
            }
        };

        initApp();
    }, []);

    return { loading }; 
}