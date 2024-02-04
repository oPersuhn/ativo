import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RootStackNavigationProp } from '../../routes/types';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { database } from '../../config/firebaseConfig';
import { collection, setDoc, doc } from 'firebase/firestore';
// ... (importações)

export default function SignUp() {
  const navigation = useNavigation<RootStackNavigationProp>();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const enviarUserParaDatabase = async () => {
    if (password !== confirmPassword) {
      setError("As senhas informadas são diferentes");
      return;
    }

    const auth = getAuth();

    try{
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const userUid = userCredential.user.uid;
      
      const userCollection = collection(database, 'users');
      
      const dadosUser = {username: username, email: email };
      await setDoc(doc(userCollection, userUid), dadosUser);
      console.log('Usuário e dados salvos com sucesso no banco de dados!');
      navigation.navigate('main');
    } catch (error: any) {
      setError(error.message);
    }
      
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry={true}
        value={confirmPassword}
        onChangeText={(text) => setConfirmPassword(text)}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
      <TouchableOpacity style={styles.button} onPress={enviarUserParaDatabase}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: 'green',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});
