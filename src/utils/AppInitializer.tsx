import { useUserStore, useReleaseStore } from '../stores';
import { useEffect, useState } from 'react';
import isTokenExpired from './VerifyUserTokenExpiry';
import { useNavigate } from 'react-router-dom';

// hook to initialize the app
export default function useAppInitializer() {
    const [loading, setLoading] = useState<boolean>(true);

    useAppInitialization();
    useTokenExpirationCheck();

    useEffect(() => {
        setLoading(false);
    }, []);

    return loading;
};

// initialize the app
function useAppInitialization(): boolean {

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

    return loading; 
};

// hook to check the token expiry and apply handling 
function useTokenExpirationCheck(): void {

    const userStore = useUserStore();
    const navigate = useNavigate();

    useEffect(() => {
        // ckeck the token expiry with regular intervals (in ms);
        const checkTokenExpiration = setInterval(() => {

          const token = localStorage.getItem('token');

          if (token && isTokenExpired(token)) {
            // if token has expired, log out user and initialiaze app
            userStore.logOutUser();
            navigate('/');
          }
        }, 360000);
    
        // clear the interval when component is unmounted
        return () => clearInterval(checkTokenExpiration);

      }, [userStore, navigate]);
}