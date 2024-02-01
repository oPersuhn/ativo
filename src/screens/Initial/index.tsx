import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RootStackNavigationProp } from '../../routes/types';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';

export default function Initial() {
  const navigation = useNavigation<RootStackNavigationProp>();

  return (
    // AQUI TEMOS O LINEAR GRADIENT, ONDE ELE FAZ O EFEITO DEGRADE NAS PAGINAS 
    <LinearGradient
      colors={['#696969', '#F8F8FF']}
      style={styles.container}
    >
      <View style={styles.gradientContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("signup")}>
          <Text style={styles.buttonText}>Cadastro</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("signin")}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gradientContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  button: {
    flex: 1,
    height: 40,
    marginHorizontal: 10,
    backgroundColor: '#808080',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#000000',
  },
});
