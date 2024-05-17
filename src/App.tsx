import { useUserStore, useReleaseStore } from './stores';
import { useEffect, useState } from 'react';
import AppRouter from './app/AppRouter';
import { useLocation } from 'react-router-dom';
import { ModalProvider } from './contexts/ModalContext';

// components available in the whole app
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import SignoutModal from './components/modals/SignoutModal';
import DeleteAccountModal from './components/modals/DeleteAccountModal';
import RemoveReleaseModal from './components/modals/RemoveReleaseModal';

// other components
import LoadingSpinner from './components/common/LoadingSpinner';

export default function App() {

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
        setLoading(false)
      }
    };

    initApp();
  }, []);

  // conditionnal display of the header by pathname
  const location = useLocation();
  const [shouldShowComponent, setShouldShowComponent] = useState<boolean>(true);

  useEffect(() => {
    const isVibrlinkLandingPage = location.pathname.includes('/v');
    setShouldShowComponent(!isVibrlinkLandingPage);
  }, [location.pathname]);

  if (loading) {
    return <div><LoadingSpinner /></div>
  }

  return (
    <ModalProvider>
      <div>
        {shouldShowComponent && <Header />}
        <AppRouter />
        {shouldShowComponent && <Footer />}
        <SignoutModal />
        <DeleteAccountModal />
        <RemoveReleaseModal />
      </div>
    </ModalProvider>
  );
}
