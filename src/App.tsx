import { useUserStore, useReleaseStore } from './stores';
import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ModalProvider } from './contexts/ModalContext';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import AccountSettingsPage from './pages/AccountSettingsPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import VibrlinksPage from './pages/VibrlinksPage';
import NewVibrlinkPage from './pages/NewVibrlinkPage';
import LinkEditorPage from './pages/LinkEditorPage';
import Header from './components/header/Header';
import SignoutModal from './components/modals/SignoutModal';
import DeleteAccountModal from './components/modals/DeleteAccountModal';
import RemoveReleaseModal from './components/modals/RemoveReleaseModal';

export default function App() {
  const userStore = useUserStore();
  const releaseStore = useReleaseStore();

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

  return (
    <ModalProvider>
      <div>
        <Header /> 
        <Routes>
          <Route index path="/" element={<HomePage />} />
          <Route index path="/login" element={<LoginPage />} />
          <Route index path="/signup" element={<SignupPage />} />
          <Route index path="/account-settings" element={<AccountSettingsPage />} />
          <Route index path="/reset-password/:token" element={<ResetPasswordPage />} />
          <Route index path="/my-vibrlinks" element={<VibrlinksPage />} />
          <Route index path="/new-vibrlink" element={<NewVibrlinkPage />} />
          <Route index path="/link-editor/:releaseId" element={<LinkEditorPage />} />
        </Routes>
        <SignoutModal />
        <DeleteAccountModal />
        <RemoveReleaseModal />
      </div>
    </ModalProvider>
  );
}
