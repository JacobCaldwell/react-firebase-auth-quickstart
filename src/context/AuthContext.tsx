import React, { createContext, useContext, useEffect, useState } from 'react'
import { auth, signInWithProvider } from "auth/Firebase"
import firebase from 'firebase/app'

type ContextValueType = {
  currentUser: typeof auth.currentUser
  login: typeof auth.signInWithEmailAndPassword
  signup: typeof auth.createUserWithEmailAndPassword
  logout: typeof auth.signOut
  signInWithProvider: typeof signInWithProvider
  isAuthenticated: boolean
  isLoading: boolean
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
  const [currentUser, setCurrentUser] = useState<firebase.User | null>(() => {
    return JSON.parse(localStorage.getItem('userAuth') || '{}')
  })
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  function login(email: string, password: string) {
    return auth.signInWithEmailAndPassword(email, password)
  }
  function signup(email: string, password: string) {
    return auth.createUserWithEmailAndPassword(email, password)
  }
  function logout() {
    localStorage.removeItem('userAuth')
    return auth.signOut()
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      user && localStorage.setItem('userAuth', JSON.stringify(user))
      setCurrentUser(user)
      setIsLoading(false)
    })
    return unsubscribe
  }, [])

  return (
    <AuthContextProvider
      value={{
        currentUser,
        login,
        signup,
        logout,
        signInWithProvider,
        isAuthenticated,
        isLoading
      }}>
      {children}
    </AuthContextProvider>)
};
