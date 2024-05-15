import { useUserStore } from "../stores";
import { Navigate } from 'react-router-dom';
import { ReactNode } from 'react';

interface ProtectedRouteProps {
    children: ReactNode;
}

export default function ProtectedRoute({children}: ProtectedRouteProps) {

    const userStore = useUserStore();
    const isLoggedIn = userStore.isLoggedIn;

    if (!isLoggedIn) {
        return <Navigate to='/' replace />;
    }

    return <>{children}</>;
}