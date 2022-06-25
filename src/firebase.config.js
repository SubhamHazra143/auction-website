import { initializeApp } from 'firebase/app'

import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: 'auctionwebsite-e4cc7.firebaseapp.com',
  projectId: 'auctionwebsite-e4cc7',
  storageBucket: 'auctionwebsite-e4cc7.appspot.com',
  messagingSenderId: '814867942779',
  appId: '1:814867942779:web:213ad9bc54b985b5d201de',
}

// Initialize Firebase

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)
export default app
