import React, { useContext, useEffect, useState } from 'react'
import { auth } from "../auth/Firebase"
import firebase from 'firebase/app'



type AuthProviderValues = {
  signInWithEmailAndPassword: (email: string, password: string) => void
  createUserWithEmailAndPassword: (email: string, password: string) => void
  signInWithGoogle?: () => void
  signInWithFacebook?: () => void
  signInWithGithub?: () => void
  signInWithTwitter?: () => void
  // signInAnonymously?: () => void
  logout: () => void
  user: firebase.User | null
}

type PossibleProviders = keyof Providers

type Providers = {
  googleProvider: firebase.auth.GoogleAuthProvider_Instance,
  facebookProvider: firebase.auth.FacebookAuthProvider_Instance,
  twitterProvider: firebase.auth.TwitterAuthProvider_Instance,
  githubProvider: firebase.auth.GithubAuthProvider_Instance,
}

const AuthProviders = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
  facebookProvider: new firebase.auth.FacebookAuthProvider(),
  twitterProvider: new firebase.auth.TwitterAuthProvider(),
  githubProvider: new firebase.auth.GithubAuthProvider()
  // appleAuthProvider: new firebase.auth.App
}


const AuthContext = React.createContext<any>(null)

export function useAuth() {
  return useContext(AuthContext)
}

export const AuthProvider: React.FunctionComponent = ({ children }) => {

  const [user, setUser] = useState<firebase.User | null>(null);

  const signInWithProvider = async (provider: PossibleProviders) => auth.signInWithPopup(AuthProviders[provider])

  // Create user method
  const createUserWithEmailAndPassword = (email: string, password: string) => auth.createUserWithEmailAndPassword(email, password)

  // Sign in Methods
  const signInWithEmailAndPassword = (email: string, password: string) => auth.signInWithEmailAndPassword(email, password)
  const signInWithGoogle = () => signInWithProvider('googleProvider')
  const signInWithFacebook = () => signInWithProvider('facebookProvider')
  const signInWithGithub = () => signInWithProvider('githubProvider')
  const signInWithTwitter = () => signInWithProvider('twitterProvider')

  // Sign out method
  const logout = () => auth.signOut()

  useEffect(() => {
    const unsubstribe = auth.onAuthStateChanged(user => {
      setUser(user)
    })
    return unsubstribe
  }, [])

  const value: AuthProviderValues = {
    user,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithGoogle,
    signInWithFacebook,
    logout,
  }

  return (
    <div>
      <AuthContext.Provider value={value}>
        {children}
      </AuthContext.Provider>
    </div>
  )
}
