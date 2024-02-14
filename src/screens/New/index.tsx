import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RootStackNavigationProp } from '../../routes/types';
import { collection, doc, setDoc, getDoc } from "firebase/firestore";
import { database } from '../../config/firebaseConfig';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import RNPickerSelect from 'react-native-picker-select';

export default function New() {
  const navigation = useNavigation<RootStackNavigationProp>();
  const [valorGasto, setValorGasto] = useState('');
  const [tipoDeGasto, setTipoDeGasto] = useState('');
  const [userUid, setUserUid] = useState<string | null>(null);

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserUid(user.uid); // Armazena o UID do usuário no estado
      } else {
        navigation.navigate("signin");
      }
    });

    return () => {
      unsubscribe();
    };
  }, [navigation]);

  const enviarParaBancoDeDados = async () => {
    try {
      const gastosCollection = collection(database, 'gastos');

      const novoGasto = {
        valor: parseFloat(valorGasto),
        tipoDeGasto: tipoDeGasto,
        timestamp: new Date(),
        uid: userUid, // Adiciona o UID do usuário aos dados do gasto
      };

      await setDoc(doc(gastosCollection), novoGasto);
      console.log('Valor enviado com sucesso para o banco de dados!');
    } catch (error) {
      console.error('Erro ao enviar valor para o banco de dados:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>New</Text>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, margin: 10, padding: 5 }}
        keyboardType="numeric"
        placeholder="Digite o valor"
        value={valorGasto}
        onChangeText={(text) => setValorGasto(text)}
      />
      <RNPickerSelect
        onValueChange={(value) => setTipoDeGasto(value)}
        items={[
          { label: 'Lazer', value: 'lazer'},
          { label: 'Investimentos', value: 'investimento'},
          { label: 'Transporte', value: 'transporte'},
          { label: 'Fixos', value: 'fixos'},
          { label: 'Inesperados', value: 'inesperados'},
        ]}
        style={{
          inputIOS: { color: 'black' },
          inputAndroid: { color: 'black' },
        }}
      />
      <Button title="Enviar para o Banco de Dados" onPress={enviarParaBancoDeDados} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'black'
  },
  itensSelect:{
    color: 'black'
  },
});
