// firebase.js
import { initializeApp } from 'firebase/app'
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
    apiKey: "AIzaSyCxM3zjn16iZY5S3zUr5SBtP0ZS7PXaZsg",
    authDomain: "budgetweek-a8853.firebaseapp.com",
    projectId: "budgetweek-a8853",
    storageBucket: "budgetweek-a8853.appspot.com",
    messagingSenderId: "964748882769",
    appId: "1:964748882769:web:9d612f51027a6f161d1970"
};

// Inicialize o Firebase
const app = initializeApp(firebaseConfig);

// Inicialize o Firebase Auth com AsyncStorage para persistência
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
  });

export default { app, auth };