import { create } from "zustand";
import axiosInstance from "./axiosInstance";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { resolvePath } from "react-router-dom";


interface User {
    id: number;
    email: string;
    age: number;
}

interface authTokens {
    access: string;
    refresh: string;
}

interface AuthState {
    authTokens: authTokens | null;
    user: User | null;
    isAuthenticated: boolean;
    setTokens: (tokens: authTokens) => void;
    setUser: (user: User) => void;
    registerUser: (formData: FormData) => Promise<void>;
    loginUser: (formData: FormData) => Promise<void>;
    logoutUser: () => void;
    fetchUserData: () => Promise<void>;
    refreshToken: () => Promise<void>;
}

const useAuthStore = create<AuthState>((set, get) => ({
    authTokens: null,
    user: null,
    isAuthenticated: false,

    setTokens: (tokens: authTokens | null) => {
        if (tokens) {
            set({
                authTokens: tokens,
                user: jwtDecode(tokens.access) as User,
                isAuthenticated: true
            });
        } else {
            set({
                authTokens: null,
                user: null,
                isAuthenticated: false
            });
        }
    },

    setUser: (user: User) => set({ user }),

    registerUser: async (formData: FormData) => {
        try {
            const response = await axiosInstance.post('/user/register/', formData);
            if (response.status === 201) {
                console.log("Registered successfully:", response.data);
                get().loginUser(formData)
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    loginUser: async (formData: FormData) => {
        try {
            const response = await axiosInstance.post('/user/login/', formData);
            const { access, refresh } = response.data;
            const tokens: authTokens = { access, refresh };
            Cookies.set('access', access, { expires: 7 / 24 / 60, secure: true, sameSite: 'Strict' }); // 5 minutes
            Cookies.set('refresh', refresh, { expires: 7, secure: true, sameSite: 'Strict' });
            get().setTokens(tokens);
            get().setUser(jwtDecode(access) as User);
            window.location.href = '/profile';
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    logoutUser:  () => {
            Cookies.remove('access');
            Cookies.remove('refresh');
            set({ authTokens: null, user: null, isAuthenticated: false });
            window.location.href = '/login';
    },

    fetchUserData: async () => {
        try{
            const response = await axiosInstance.get('/user/data');
            get().setUser(response.data);
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
    refreshToken: async () => {
        try{
            const refreshToken = Cookies.get('refresh');
            if (refreshToken) {
                const response = await axiosInstance.post('/user/token-refresh/', { refresh: refreshToken });
                const { access, refresh } = response.data;
                Cookies.set('access', access, { expires: 7 / 24 / 60, secure: true, sameSite: 'Strict' }); 
                Cookies.set('refresh', refresh, { expires: 7, secure: true, sameSite: 'Strict' });
                get().setTokens(response.data);
            } else {
                get().logoutUser();
                throw new Error('Refresh token not found');
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}));

// Initialize store with cookies
const initializeAuthState = () => {
    const accessToken = Cookies.get('access');
    const refreshToken = Cookies.get('refresh');
    if (accessToken && refreshToken) {
        const tokens: authTokens = { access: accessToken, refresh: refreshToken };
        useAuthStore.getState().setTokens(tokens);
        useAuthStore.getState().setUser(jwtDecode(accessToken) as User);
    }
};

initializeAuthState();

export default useAuthStore;
