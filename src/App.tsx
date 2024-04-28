import { Route, Routes } from 'react-router-dom';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Header from './components/header/Header';

export default function App() {

  return (
    <div>
      <Header />
      <Routes>
        <Route index path="/" element={<HomePage />} />
        <Route index path="/login" element={<LoginPage />} />
        <Route index path="/register" element={<RegisterPage />} />
      </Routes>
    </div>
  )
};
