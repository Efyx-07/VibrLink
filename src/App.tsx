import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Header from './components/header/Header';
import { useUserStore, useReleaseStore } from './stores';

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
    <div>
      <Header />
      <Routes>
        <Route index path="/" element={<HomePage />} />
        <Route index path="/login" element={<LoginPage />} />
        <Route index path="/signup" element={<SignupPage />} />
      </Routes>
    </div>
  );
}
