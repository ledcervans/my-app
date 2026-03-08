import { initializeApp, getApps } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAnalytics, isSupported } from "firebase/analytics"

const firebaseConfig = {
  apiKey: "AIzaSyAU-6nbsTEdYaLaM8l_0cClcTQj9iY56ZQ",
  authDomain: "my-app-dc361.firebaseapp.com",
  projectId: "my-app-dc361",
  storageBucket: "my-app-dc361.firebasestorage.app",
  messagingSenderId: "370926373293",
  appId: "1:370926373293:web:815b5ed42644a6809bf924",
  measurementId: "G-Y9WMJJKW70",
}

// Initialize Firebase only on client side
const getFirebaseApp = () => {
  if (typeof window === "undefined") return null
  if (getApps().length === 0) {
    return initializeApp(firebaseConfig)
  }
  return getApps()[0]
}

const getFirestoreDb = () => {
  const app = getFirebaseApp()
  if (!app) return null
  return getFirestore(app)
}

const getFirebaseAnalytics = async () => {
  const app = getFirebaseApp()
  if (!app) return null
  const supported = await isSupported()
  if (supported) {
    return getAnalytics(app)
  }
  return null
}

export { getFirestoreDb, getFirebaseAnalytics }
