// store/authStore.ts
'use client';

import { create } from 'zustand';
import { supabase } from '@/lib/supabase';

interface User {
    id: string;
    email?: string;
    user_metadata?: {
        name?: string;
        avatar_url?: string;
    };
}

interface AuthState {
    currentUser: User | null;
    recentUsers: User[];
    isLoading: boolean;
    error: string | null;
    setCurrentUser: (user: User | null) => void;
    addRecentUser: (user: User) => void;
    login: (email: string, password: string) => Promise<void>;
    signUp: (email: string, password: string) => Promise<void>;
    signInWithGoogle: () => Promise<void>;
    signOut: () => Promise<void>;
    initialize: () => Promise<void>;
    resetError: () => void;
}

const MAX_RECENT_USERS = 10;

export const useAuthStore = create<AuthState>((set, get) => ({
    currentUser: null,
    recentUsers: [],
    isLoading: false,
    error: null,

    setCurrentUser: (user) => set({ currentUser: user }),

    addRecentUser: (user) => {
        const { recentUsers } = get();
        const updatedUsers = recentUsers.filter(u => u.id !== user.id);
        updatedUsers.unshift(user);
        if (updatedUsers.length > MAX_RECENT_USERS) {
            updatedUsers.pop();
        }
        set({ recentUsers: updatedUsers });
    },

    login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) throw error;
            if (data.user) {
                const user = {
                    id: data.user.id,
                    email: data.user.email,
                    user_metadata: data.user.user_metadata,
                };
                set({ currentUser: user });
                get().addRecentUser(user);
            }
        } catch (error) {
            set({ error: error instanceof Error ? error.message : 'Login failed' });
            throw error;
        } finally {
            set({ isLoading: false });
        }
    },

    signUp: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    emailRedirectTo: `${location.origin}/auth/callback`,
                },
            });

            if (error) throw error;
            if (data.user) {
                const user = {
                    id: data.user.id,
                    email: data.user.email,
                    user_metadata: data.user.user_metadata,
                };
                set({ currentUser: user });
                get().addRecentUser(user);
            }
        } catch (error) {
            set({ error: error instanceof Error ? error.message : 'Signup failed' });
            throw error;
        } finally {
            set({ isLoading: false });
        }
    },

    signInWithGoogle: async () => {
        set({ isLoading: true, error: null });
        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: `${location.origin}/auth/callback`,
                },
            });
            if (error) throw error;
        } catch (error) {
            set({ error: error instanceof Error ? error.message : 'Google login failed' });
            throw error;
        } finally {
            set({ isLoading: false });
        }
    },

    signOut: async () => {
        set({ isLoading: true, error: null });
        try {
            const { error } = await supabase.auth.signOut();
            if (error) throw error;
            set({ currentUser: null });
        } catch (error) {
            set({ error: error instanceof Error ? error.message : 'Logout failed' });
            throw error;
        } finally {
            set({ isLoading: false });
        }
    },

    initialize: async () => {
        set({ isLoading: true });
        try {
            const { data: { user }, error } = await supabase.auth.getUser();

            if (error) throw error;
            if (user) {
                const formattedUser = {
                    id: user.id,
                    email: user.email,
                    user_metadata: user.user_metadata,
                };
                set({ currentUser: formattedUser });
                get().addRecentUser(formattedUser);
            }
        } catch (error) {
            console.error('Initialization error:', error);
        } finally {
            set({ isLoading: false });
        }
    },

    resetError: () => set({ error: null }),
}));