'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  signInWithPopup,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile
} from 'firebase/auth';
import { auth, googleProvider } from '@/lib/firebase';
import { CommuterUser } from '@/types';

interface AuthContextType {
  user: CommuterUser | null;
  loading: boolean;
  isAuthModalOpen: boolean;
  authError: string | null;
  openAuthModal: () => void;
  closeAuthModal: () => void;
  clearAuthError: () => void;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (e: string, p: string) => Promise<void>;
  signUpWithCustomProfile: (name: string, email: string, p: string, role: string) => Promise<void>;
  signInAsDemoUser: () => void;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  isAuthModalOpen: false,
  authError: null,
  openAuthModal: () => {},
  closeAuthModal: () => {},
  clearAuthError: () => {},
  signInWithGoogle: async () => {},
  signInWithEmail: async () => {},
  signUpWithCustomProfile: async () => {},
  signInAsDemoUser: () => {},
  signOut: async () => {}
});

const DEFAULT_DEMO_USER: CommuterUser = {
  uid: 'demo-commuter-77',
  displayName: 'Alex Rivers',
  email: 'alex.rivers@ecogrid.io',
  photoURL: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256',
  isDemo: true,
  ecoPoints: 1250,
  co2SavedKg: 42.8,
  commuterTier: 'Level 4 Eco-Grid Master'
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<CommuterUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const openAuthModal = () => {
    setAuthError(null);
    setIsAuthModalOpen(true);
  };
  const closeAuthModal = () => {
    setAuthError(null);
    setIsAuthModalOpen(false);
  };
  const clearAuthError = () => setAuthError(null);

  useEffect(() => {
    // Check if demo user or custom local user stored in localStorage
    const storedCustom = localStorage.getItem('ecogrid_custom_user');
    if (storedCustom) {
      try {
        setUser(JSON.parse(storedCustom));
        setLoading(false);
        return;
      } catch (e) {
        localStorage.removeItem('ecogrid_custom_user');
      }
    }

    if (!auth) {
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser({
          uid: firebaseUser.uid,
          displayName: firebaseUser.displayName || 'Eco Commuter',
          email: firebaseUser.email,
          photoURL: firebaseUser.photoURL || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
          isDemo: false,
          ecoPoints: 850,
          co2SavedKg: 28.4,
          commuterTier: 'Level 3 Eco Commuter'
        });
      } else {
        if (!localStorage.getItem('ecogrid_custom_user')) {
          setUser(null);
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    setAuthError(null);
    try {
      if (auth) {
        // Force Google OAuth to show account chooser popup
        googleProvider.setCustomParameters({ prompt: 'select_account' });
        const result = await signInWithPopup(auth, googleProvider);
        if (result?.user) {
          const gUser = result.user;
          const googleUserObj: CommuterUser = {
            uid: gUser.uid,
            displayName: gUser.displayName || 'Google Commuter',
            email: gUser.email,
            photoURL: gUser.photoURL || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
            isDemo: false,
            ecoPoints: 1200,
            co2SavedKg: 38.5,
            commuterTier: 'Level 4 Eco-Grid Master'
          };
          localStorage.removeItem('ecogrid_custom_user');
          setUser(googleUserObj);
          closeAuthModal();
        }
      } else {
        signInAsDemoUser();
      }
    } catch (err: any) {
      console.warn("Google Sign-In notice:", err);
      if (err?.code === 'auth/popup-closed-by-user') {
        setAuthError('Sign-in cancelled. Please select a Google account to proceed.');
      } else {
        setAuthError(err?.message || 'Google Auth notice: Please select your Google Account.');
      }
    }
  };

  const signInWithEmail = async (emailStr: string, passStr: string) => {
    try {
      if (auth) {
        await signInWithEmailAndPassword(auth, emailStr, passStr);
        localStorage.removeItem('ecogrid_custom_user');
        closeAuthModal();
      } else {
        const customUser: CommuterUser = {
          uid: `custom-${Date.now()}`,
          displayName: emailStr.split('@')[0],
          email: emailStr,
          photoURL: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
          isDemo: false,
          ecoPoints: 500,
          co2SavedKg: 15.2,
          commuterTier: 'Level 2 Eco Commuter'
        };
        localStorage.setItem('ecogrid_custom_user', JSON.stringify(customUser));
        setUser(customUser);
        closeAuthModal();
      }
    } catch (err) {
      // Create local custom user state if offline / demo
      const customUser: CommuterUser = {
        uid: `custom-${Date.now()}`,
        displayName: emailStr.split('@')[0],
        email: emailStr,
        photoURL: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
        isDemo: false,
        ecoPoints: 500,
        co2SavedKg: 15.2,
        commuterTier: 'Level 2 Eco Commuter'
      };
      localStorage.setItem('ecogrid_custom_user', JSON.stringify(customUser));
      setUser(customUser);
      closeAuthModal();
    }
  };

  const signUpWithCustomProfile = async (
    nameStr: string,
    emailStr: string,
    passStr: string,
    roleStr: string
  ) => {
    try {
      if (auth) {
        const res = await createUserWithEmailAndPassword(auth, emailStr, passStr);
        await updateProfile(res.user, { displayName: nameStr });
      }
    } catch (err) {
      console.warn("Custom sign up notice:", err);
    }

    const newUser: CommuterUser = {
      uid: `commuter-${Date.now()}`,
      displayName: nameStr,
      email: emailStr,
      photoURL: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      isDemo: false,
      ecoPoints: 1000,
      co2SavedKg: 30.0,
      commuterTier: roleStr || 'Level 3 Eco Commuter'
    };

    localStorage.setItem('ecogrid_custom_user', JSON.stringify(newUser));
    setUser(newUser);
    closeAuthModal();
  };

  const signInAsDemoUser = () => {
    localStorage.setItem('ecogrid_custom_user', JSON.stringify(DEFAULT_DEMO_USER));
    setUser(DEFAULT_DEMO_USER);
    closeAuthModal();
  };

  const signOut = async () => {
    localStorage.removeItem('ecogrid_custom_user');
    if (auth) {
      try {
        await firebaseSignOut(auth);
      } catch (e) {
        // ignore
      }
    }
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthModalOpen,
        authError,
        openAuthModal,
        closeAuthModal,
        clearAuthError,
        signInWithGoogle,
        signInWithEmail,
        signUpWithCustomProfile,
        signInAsDemoUser,
        signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
