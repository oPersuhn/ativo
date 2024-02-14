import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RootStackNavigationProp } from '../../routes/types';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { database } from '../../config/firebaseConfig';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export default function Report() {
  const navigation = useNavigation<RootStackNavigationProp>();
  const [filteredGastos, setFilteredGastos] = useState<any[]>([]);
  const [userUid, setUserUid] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null); // Estado para armazenar o tipo de gasto selecionado

  const handleFilterButtonClick = async () => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      if (user) {
        setUserUid(user.uid);
        fetchFilteredGastos(user.uid); // Carrega os gastos filtrados para o usuário logado
      } else {
        navigation.navigate('signin'); // Redireciona para a tela de login se não houver usuário logado
      }
    } catch (error) {
      console.error('Erro ao buscar gastos filtrados:', error);
    }
  };

  const fetchFilteredGastos = async (uid: string) => {
    try {
      const gastosCollection = collection(database, 'gastos');
      let q = query(
        gastosCollection,
        where('uid', '==', uid) // Filtra por UID do usuário logado
      );

      // Se um tipo de gasto foi selecionado, adiciona uma cláusula de filtragem para o tipo de gasto
      if (selectedType) {
        q = query(q, where('tipoDeGasto', '==', selectedType));
      }

      const querySnapshot = await getDocs(q);
      const filteredGastos = querySnapshot.docs.map((doc) => doc.data());
      setFilteredGastos(filteredGastos);
    } catch (error) {
      console.error('Erro ao buscar gastos filtrados:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Report</Text>
      {/* Botões para selecionar o tipo de gasto */}
      <Button title="Fixo" onPress={() => setSelectedType("Fixo")} />
      <Button title="Transporte" onPress={() => setSelectedType("Transporte")} />
      <Button title="Lazer" onPress={() => setSelectedType("Lazer")} />
      <Button title="Inesperado" onPress={() => setSelectedType("Inesperado")} />
      {/* Botão para remover o filtro */}
      <Button title="Limpar Filtro" onPress={() => setSelectedType(null)} />
      {/* Botão para aplicar o filtro */}
      <Button title="Filtrar" onPress={handleFilterButtonClick} />
      {/* Exibir os gastos filtrados */}
      {filteredGastos.map((gasto, index) => (
        <Text key={index}>{JSON.stringify(gasto)}</Text>
      ))}
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
});
