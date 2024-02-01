import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RootStackNavigationProp } from '../../routes/types';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { LinearGradient } from 'expo-linear-gradient';
// ... (importações)

export default function SignIn() {
  const navigation = useNavigation<RootStackNavigationProp>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorLogin, setErrorLogin] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const Login = () => {
    setLoading(true);
    const auth = getAuth();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        navigation.navigate("main");
      })
      .catch((error) => {
        setErrorLogin(error.message);
      })
      .finally(() => {
        setLoading(false);
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
      <Text style={styles.title}>Entrar</Text>
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
      {errorLogin && <Text style={styles.errorText}>{errorLogin}</Text>}
      <TouchableOpacity style={styles.button} onPress={Login} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? 'Entrando...' : 'Entrar'}</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
    </View>
    <StatusBar style="auto" />
    </LinearGradient>
    
  );
}

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
    marginTop: 40,
    marginBottom: 25,
  },
  input: {
    width: 300,
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
    marginBottom: 100
  },
  imagelogo: {
    width: 95,
    height: 140,
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
    left: -60, // Ajuste esse valor conforme necessário para posicionar horizontalmente
  },
});
