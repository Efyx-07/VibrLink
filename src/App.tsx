import useAppInitializer from './app/AppInitializer';
import AppRouter from './app/AppRouter';
import useComponentVisibility from './app/ComponentVisibility';
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

  // use a personnal hook to initialize the app
  const loading = useAppInitializer();
  // use a personnal hook to display a component depending on the path name
  const shouldShowComponent = useComponentVisibility();

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
};
