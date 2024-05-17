// dedicated component for the router
import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from '../utils/ProtectedRoute';

// routed components
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SignupPage';
import AccountSettingsPage from '../pages/AccountSettingsPage';
import ResetPasswordPage from '../pages/ResetPasswordPage';
import MyLinksPage from '../pages/MyLinksPage';
import NewLinkPage from '../pages/NewLinkPage';
import LinkEditorPage from '../pages/LinkEditorPage';
import VibrlinkLandingPage from '../pages/VibrlinkLandingPage';

export default function AppRouter() {

    return (
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
    )
}