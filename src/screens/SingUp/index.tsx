import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RootStackNavigationProp } from '../../routes/types';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { LinearGradient } from 'expo-linear-gradient';

export default function Cadastro() {
  const navigation = useNavigation<RootStackNavigationProp>();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  // Constante de criar novo usuario
  const newUser = () => {
    if (password !== confirmPassword) {
      setError("Senhas não coincidem!!");
      return;
    }

    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        navigation.navigate('main');
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <LinearGradient
      colors={['#696969', '#F8F8FF']}
      style={styles.container}
    >
    <View style={styles.container}>
      <View style={styles.containerlogo}>
        <Image
          source={require("../../../assets/logo.png")}
          style={styles.imagelogo}
        />
        <TouchableOpacity onPress={() => navigation.navigate('initial')} style={styles.touchable}>
          <Image
            source={require("../../../assets/flecha.png")}
            style={styles.imageflecha}
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>Cadastro</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome completo"
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
        placeholder="Senha"
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirme a senha"
        secureTextEntry={true}
        value={confirmPassword}
        onChangeText={(text) => setConfirmPassword(text)}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
      <TouchableOpacity style={styles.button} onPress={newUser}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
    <StatusBar style="auto" />
    </LinearGradient>
  );
}

// Constante dos estilos
const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: "center",
  },
  title: {
    fontSize: 30,
    marginBottom: 16,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'black',
    backgroundColor: "#808080",
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 10,
    color: "#000000"
  },
  button: {
    backgroundColor: 'gray',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 100,
  },
  buttonText: {
    color: '#000',
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  containerlogo: {
    alignItems: 'center',
    marginTop: -80,
    marginBottom: 30
  },
  imagelogo: {
    width: 95,
    height: 135,
    resizeMode: 'cover',
  },
  imageflecha: {
    width: 50,
    height: 50,
    resizeMode: 'cover',
  },
  touchable: {
    position: 'absolute',
    top: -40, // Ajuste esse valor conforme necessário para posicionar verticalmente
    left: -160, // Ajuste esse valor conforme necessário para posicionar horizontalmente
  },
});
