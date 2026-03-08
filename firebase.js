import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAnalytics } from "firebase/analytics"

const firebaseConfig = {
  apiKey: "AIzaSyAU-6nbsTEdYaLaM8l_0cClcTQj9iY56ZQ",
  authDomain: "my-app-dc361.firebaseapp.com",
  projectId: "my-app-dc361",
  storageBucket: "my-app-dc361.firebasestorage.app",
  messagingSenderId: "370926373293",
  appId: "1:370926373293:web:815b5ed42644a6809bf924",
  measurementId: "G-Y9WMJJKW70",
}

let app
let db
let analytics

if (typeof window !== "undefined") {
  app = initializeApp(firebaseConfig)
  db = getFirestore(app)
  analytics = getAnalytics(app)
}

export { db, analytics }

