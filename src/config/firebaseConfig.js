// firebaseConfig.js
// Realizando as importações necessárias
import { initializeApp } from 'firebase/app'
import { initializeAuth, getReactNativePersistence, getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getStorage } from 'firebase/storage';


// Configurando as credenciais vindas do firebase
const firebaseConfig = {
    apiKey: "AIzaSyCxM3zjn16iZY5S3zUr5SBtP0ZS7PXaZsg",
    authDomain: "budgetweek-a8853.firebaseapp.com",
    projectId: "budgetweek-a8853",
    storageBucket: "budgetweek-a8853.appspot.com",
    messagingSenderId: "964748882769",
    appId: "1:964748882769:web:9d612f51027a6f161d1970"
};

// Inicializando o Firebase
const app = initializeApp(firebaseConfig);

// Inicializando o Firebase Auth (para autentificação) com AsyncStorage para persistência de dados
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
    auth: getAuth()
  });

// Obtendo o firestore (nosso banco de dados)
const database = getFirestore(app);

// Obtendo o storage do firebase (imagens/videos)
const storage = getStorage(app)

// Exportando as funções que vão ser usadas no app
export { auth, database, storage };

// Exportando o app como default (o código apresenta um erro se não fizer assim, não consegui resolver de outra forma)
export default app;