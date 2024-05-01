import { useUserStore, useReleaseStore } from './stores';
import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { ModalProvider } from './contexts/ModalContext';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import AccountSettingsPage from './pages/AccountSettingsPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import VibrlinksPage from './pages/VibrlinksPage';
import NewVibrlinkPage from './pages/NewVibrlinkPage';
import LinkEditorPage from './pages/LinkEditorPage';
import VibrlinkLandingPage from './pages/VibrlinkLandingPage';
import Header from './components/header/Header';
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

  // conditionnal display of the header 
  const location = useLocation();
  const [shouldShowHeader, setShouldShowHeader] = useState(true);

  useEffect(() => {
    const isVibrlinkLandingPage = location.pathname.includes('/v');
    setShouldShowHeader(!isVibrlinkLandingPage);
  }, [location.pathname]);

  return (
    <ModalProvider>
      <div>
      {shouldShowHeader && <Header />}
        <Routes>
          <Route index path="/" element={<HomePage />} />
          <Route index path="/login" element={<LoginPage />} />
          <Route index path="/signup" element={<SignupPage />} />
          <Route index path="/account-settings" element={<AccountSettingsPage />} />
          <Route index path="/reset-password/:token" element={<ResetPasswordPage />} />
          <Route index path="/my-vibrlinks" element={<VibrlinksPage />} />
          <Route index path="/new-vibrlink" element={<NewVibrlinkPage />} />
          <Route index path="/link-editor/:releaseId" element={<LinkEditorPage />} />
          <Route index path="/v/:releaseSlug" element={<VibrlinkLandingPage />} />
        </Routes>
        <SignoutModal />
        <DeleteAccountModal />
        <RemoveReleaseModal />
      </div>
    </ModalProvider>
  );
}
