import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RootStackNavigationProp } from '../../routes/types';
import { AntDesign } from '@expo/vector-icons'; 
import { getDoc, doc } from 'firebase/firestore'
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { database } from '../../config/firebaseConfig';

export default function Home() {
  const navigation = useNavigation<RootStackNavigationProp>();
  const [userData, setUserData] = useState<any | null>(null);

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // User logged in already or has just logged in.
        const userDoc = await getDoc(doc(database, 'users', user.uid));
        const userData = userDoc.data();
        setUserData(userData);
      } else {
        // User not logged in or has just logged out.
        navigation.navigate("signin");
      }
    });

    return () => {
      unsubscribe(); // Limpar o listener quando o componente for desmontado
    };
  }, [navigation]);

  if (!userData) {
    // Aguarde enquanto verifica o estado de autenticação e carrega os dados do usuário.
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text>Home</Text>
        <Text>Olá, {userData.username}</Text>
      </View>
      
      <StatusBar style="auto" />
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("new")}>
            <AntDesign name="plus" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
  },
  textContainer: {
    marginTop: 30,
    marginLeft: 15
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    width: 60,
    backgroundColor: '#3498db', // Cor do botão
    borderRadius: 30, // Tornando o botão redondo
    elevation: 3, // Sombra no Android
    shadowColor: '#000', // Cor da sombra
    shadowOffset: { width: 0, height: 2 }, // Deslocamento da sombra
    shadowOpacity: 0.3, // Opacidade da sombra
    shadowRadius: 2, // Raio da sombra
  },
});
