import { create } from 'zustand';
import { User } from '../types/userTypes';

interface State {
    user: User | null;
    token: string | null;
    isLoggedIn: boolean;
    setToken: (newToken: string | null) => void;
    logOutUser: () => void;
    saveUserDataInLocalStorage: () => void;
    setUserData: (user: User) => void;
    loadUserDataFromLocalStorage: () => Promise<void>;
    isLogged: boolean;
};

const useUserStore = create<State>((set, get) => ({
    user: null,
    token: null,
    isLoggedIn: false,
    setToken: (newToken) => set ({ token: newToken, isLoggedIn: !!newToken}),
    logOutUser: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        set({ user: null, token: null, isLoggedIn: false});
    },
    saveUserDataInLocalStorage: () => {
        localStorage.setItem('user', JSON.stringify(get().user));
    },
    setUserData: (user) => {
        set({ user });
        get().saveUserDataInLocalStorage();
    },
    loadUserDataFromLocalStorage: async() => {
        const localStorageUserData = localStorage.getItem('user');
        if (localStorageUserData) {
            set({ user: JSON.parse(localStorageUserData)})
        }
    },
    get isLogged() {
        console.log('Getting isLogged:', !!get().token);
        return !!get().token;
    }
}));

export default useUserStore