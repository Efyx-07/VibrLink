//import { useUserStore, useReleaseStore } from './stores';
import { useEffect, useState } from 'react';
import useAppInitializer from './app/AppInitializer';
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

  // use a hook to initialize the app
  const {loading} = useAppInitializer();

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
