import { useUserStore, useReleaseStore } from './stores';
import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { ModalProvider } from './contexts/ModalContext';
import ProtectedRoute from './utils/ProtectedRoute';

// routed components
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import AccountSettingsPage from './pages/AccountSettingsPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import MyLinksPage from './pages/MyLinksPage';
import NewLinkPage from './pages/NewLinkPage';
import LinkEditorPage from './pages/LinkEditorPage';
import VibrlinkLandingPage from './pages/VibrlinkLandingPage';

// components available in the whole app
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import SignoutModal from './components/modals/SignoutModal';
import DeleteAccountModal from './components/modals/DeleteAccountModal';
import RemoveReleaseModal from './components/modals/RemoveReleaseModal';

export default function App() {
  const userStore = useUserStore();
  const releaseStore = useReleaseStore();

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

  return (
    <ModalProvider>
      <div>
      {shouldShowComponent && <Header />}
        <Routes>
          <Route index path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
          <Route path="/v/:releaseSlug" element={<VibrlinkLandingPage />} />
          <Route 
            path="/account-settings" 
            element={
              <ProtectedRoute>
                <AccountSettingsPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/my-vibrlinks" 
            element={
              <ProtectedRoute>
                <MyLinksPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/new-vibrlink" 
            element={
              <ProtectedRoute>
                <NewLinkPage/>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/link-editor/:releaseSlug" 
            element={
              <ProtectedRoute>
                <LinkEditorPage />
              </ProtectedRoute>
            } 
          />
        </Routes>
      {shouldShowComponent && <Footer />}
        <SignoutModal />
        <DeleteAccountModal />
        <RemoveReleaseModal />
      </div>
    </ModalProvider>
  );
}
