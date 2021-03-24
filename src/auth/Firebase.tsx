import firebase from 'firebase/app'
import 'firebase/auth'

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
} as Parameters<typeof firebase.initializeApp>[0]

const app = firebase.initializeApp(config)
export const auth = app.auth()

const AuthProviders = {
  google: new firebase.auth.GoogleAuthProvider(),
  facebook: new firebase.auth.FacebookAuthProvider(),
  twitter: new firebase.auth.TwitterAuthProvider(),
  github: new firebase.auth.GithubAuthProvider()
}

type Provider = {
  google: firebase.auth.GoogleAuthProvider_Instance,
  facebook: firebase.auth.FacebookAuthProvider_Instance,
  twitter: firebase.auth.TwitterAuthProvider_Instance,
  github: firebase.auth.GithubAuthProvider_Instance
}

type Providers = keyof Provider

export function signInWithProvider(provider: Providers) {
  return auth.signInWithPopup(AuthProviders[provider])
}

export default app