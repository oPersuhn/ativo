import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RootStackNavigationProp } from '../../routes/types';
import { collection, doc, setDoc, getDoc } from "firebase/firestore";
import { database } from '../../config/firebaseConfig';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Radio } from "native-base";
import { NativeBaseProvider } from 'native-base';

export default function New() {
  const navigation = useNavigation<RootStackNavigationProp>();
  const [valorGasto, setValorGasto] = useState('');
  const [userUid, setUserUid] = useState<string | null>(null);
  const [service, setService] = useState('');
  const [error, setError] = useState('');

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
      // Verifica se o valor do gasto e o tipo de gasto foram inseridos
      if (valorGasto === '' || service === '') {
        setError('Por favor, preencha todos os campos.');
        return;
      }

      const gastosCollection = collection(database, 'gastos');

      const novoGasto = {
        valor: parseFloat(valorGasto),
        tipoDeGasto: service,
        timestamp: new Date(),
        uid: userUid, // Adiciona o UID do usuário aos dados do gasto
      };

      await setDoc(doc(gastosCollection), novoGasto);
      console.log('Valor enviado com sucesso para o banco de dados!');
      
      // Limpa os campos após o envio bem-sucedido
      setValorGasto('');
      setService('');
      setError('');
    } catch (error) {
      console.error('Erro ao enviar valor para o banco de dados:', error);
    }
  };

  return (
    <NativeBaseProvider>
      <View style={styles.container}>
        <Text>Valor do gasto</Text>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1, margin: 10, padding: 5 }}
          keyboardType="numeric"
          placeholder="Digite o valor"
          value={valorGasto}
          onChangeText={(text) => setValorGasto(text)}
        />
        <Text>Tipo de gasto</Text>
        <Radio.Group 
          name="myRadioGroup" 
          accessibilityLabel="Escolha o tipo do gasto" 
          value={service} 
          onChange={(value) => setService(value)}
        >
          <Radio value="Fixo">Fixo</Radio>
          <Radio value="Transporte">Transporte</Radio>
          <Radio value="Lazer">Lazer</Radio>
          <Radio value="Inesperado">Inesperado</Radio>
        </Radio.Group>
        <Text style={{ color: 'red' }}>{error}</Text>
        <Button title="Enviar para o Banco de Dados" onPress={enviarParaBancoDeDados} />
      </View>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'black'
  }
});
