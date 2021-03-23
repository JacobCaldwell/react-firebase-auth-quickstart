import React, { useContext, useEffect, useState } from 'react'
import { auth } from "../auth/Firebase"
import firebase from 'firebase/app'



type AuthProviderValues = {
  login: (email: string, password: string) => void
  signup: (email: string, password: string) => void
  signInWithGoogle?: () => void
  signInWithFacebook?: () => void
  signInWithGithub?: () => void
  signInWithTwitter?: () => void
  // signInAnonymously?: () => void
  logout: () => void
  currentUser: firebase.User | null
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

  const [currentUser, setCurrentUser] = useState<firebase.User | null>(null)

  // Create user method
  function signup(email: string, password: string) {
    auth.createUserWithEmailAndPassword(email, password)
  }

  // Sign in Methods
  function login(email: string, password: string) {
    auth.signInWithEmailAndPassword(email, password)
  }

  // Sign out method
  function logout() {
    return auth.signOut()
  }

  useEffect(() => {
    const unsubstribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
    })
    return unsubstribe
  }, [])

  // const signInWithProvider = async (provider: PossibleProviders) => auth.signInWithPopup(AuthProviders[provider])
  // const signInWithGoogle = () => signInWithProvider('googleProvider')
  // const signInWithFacebook = () => signInWithProvider('facebookProvider')
  // const signInWithGithub = () => signInWithProvider('githubProvider')
  // const signInWithTwitter = () => signInWithProvider('twitterProvider')

  const value: AuthProviderValues = {
    currentUser,
    signup,
    login,
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
