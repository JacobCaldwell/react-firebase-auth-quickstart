import React, { createContext, useContext, useEffect, useState } from 'react'
import { auth, signInWithProvider } from "../auth/Firebase"
import firebase from 'firebase/app'

type ContextValueType = {
  currentUser: typeof auth.currentUser
  login: typeof auth.signInWithEmailAndPassword
  signup: typeof auth.createUserWithEmailAndPassword
  logout: typeof auth.signOut
  signInWithProvider: typeof signInWithProvider
}

function createAuthContext<T>() {
  const context = React.createContext<T | undefined>(undefined);
  function useAuth() {
    const c = React.useContext(context);
    if (!c) throw new Error("useAuth must be used inside an AuthProvider");
    return c;
  }
  return [useAuth, context.Provider] as const;
}

const [useAuthContext, AuthContextProvider] = createAuthContext<ContextValueType>();

export function useAuth() {
  return useAuthContext()
}

export const AuthProvider: React.FC = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<firebase.User | null>(null)

  function login(email: string, password: string) {
    return auth.signInWithEmailAndPassword(email, password)
  }
  function signup(email: string, password: string) {
    return auth.createUserWithEmailAndPassword(email, password)
  }
  function logout() {
    return auth.signOut()
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
    })
    return unsubscribe
  }, [])

  return (
    <AuthContextProvider
      value={{ currentUser, login, signup, logout, signInWithProvider }}>
      {children}
    </AuthContextProvider>)
};
