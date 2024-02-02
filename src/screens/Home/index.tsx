import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RootStackNavigationProp } from '../../routes/types';
import { AntDesign } from '@expo/vector-icons'; 
import React from 'react';

export default function Home() {
  const navigation = useNavigation<RootStackNavigationProp>();

  /* 
  const auth = getAuth()
  const uid = auth.currentUser.uid

  const collectionUsers = collection(database, 'users')
  const docUser = getDoc(collectionUser, uid)
  const dataUser = docUser.data()
  const username = dataUser.username
  */
  const username = ''

  return (
    <View style={styles.container}>
      <Text>Home</Text>
      <Text>Olá, {username}</Text>
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
