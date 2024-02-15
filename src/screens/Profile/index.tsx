import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RootStackNavigationProp } from '../../routes/types';
import { AntDesign } from '@expo/vector-icons'; 
import React, { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { database } from '../../config/firebaseConfig';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export default function Profile() {
  const navigation = useNavigation<RootStackNavigationProp>();
  const [salario, setSalario] = useState('');
  const [userData, setUserData] = useState<any | null>(null);

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userDoc = await getDoc(doc(database, 'users', user.uid));
          const userData = userDoc.data();
          setUserData(userData);
        } catch (error) {
          console.error('Erro ao obter dados do usuário:', error);
        }
      } else {
        navigation.navigate("signin");
      }
    });

    return () => {
      unsubscribe(); // Limpar o listener quando o componente for desmontado
    };
  }, [navigation]);

  const handleSaveSalario = async () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      // Caso o usuário não esteja autenticado, exiba uma mensagem de erro.
      Alert.alert('Erro', 'Usuário não autenticado.');
      return;
    }

    try {
      // Atualizando o valor do salário no Firestore.
      const userDocRef = doc(database, 'users', user.uid);
      await setDoc(userDocRef, { salario: parseFloat(salario) }, { merge: true });
      Alert.alert('Sucesso', 'Salário salvo com sucesso.');
    } catch (error) {
      console.error('Erro ao salvar o salário:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao salvar o salário.');
    }
  };

  if (!userData) {
    // Aguarde enquanto verifica o estado de autenticação e carrega os dados do usuário.
    return null;
  }

  return (
    <View style={styles.container}>
      <Text>Profile</Text>
      <StatusBar style="auto" />
        
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("new")}>
          <AntDesign name="plus" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("report")}>
          <Text>Report</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("config")}>
          <Text>Configurações</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.profilePhotoContainer}>
        <TextInput
          style={styles.input}
          placeholder="Informe seu salário"
          keyboardType="numeric"
          value={salario}
          onChangeText={text => setSalario(text)}
        />
        <TouchableOpacity style={styles.saveButton} onPress={handleSaveSalario}>
          <Text style={styles.saveButtonText}>Salvar</Text>
        </TouchableOpacity>
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
  profilePhotoContainer : {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    width: '80%',
    borderRadius: 5,
  },
  saveButton: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
  },
  saveButtonText: {
    color: 'white',
    textAlign: 'center',
  },
});
