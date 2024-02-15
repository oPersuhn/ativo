import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RootStackNavigationProp } from '../../routes/types';
import { collection, query, where, getDocs, getDoc, doc } from 'firebase/firestore';
import { database } from '../../config/firebaseConfig'; // Importe a instância do Firestore
import { getAuth } from 'firebase/auth';

export default function Report() {
  const navigation = useNavigation<RootStackNavigationProp>();
  const [filteredGastos, setFilteredGastos] = useState<any[]>([]);
  const [userUid, setUserUid] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [salario, setSalario] = useState<number>(0);
  const [totalGastos, setTotalGastos] = useState<number>(0);
  const [percentGastosFixos, setPercentGastosFixos] = useState<number>(0);
  const [percentLazer, setPercentLazer] = useState<number>(0);
  const [percentInesperado, setPercentInesperado] = useState<number>(0);

  const fetchFilteredGastos = async (uid: string) => {
    try {
      const db = database; // Obtenha a instância do Firestore
      const gastosCollection = collection(db, 'gastos'); // Obtenha a coleção 'gastos'
      let q = query(
        gastosCollection,
        where('uid', '==', uid)
      );

      if (selectedType) {
        q = query(q, where('tipoDeGasto', '==', selectedType));
      }

      const querySnapshot = await getDocs(q);
      const filteredGastos = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        // Formatando o timestamp para 'dd/mm/aaaa'
        data.timestamp = new Date(data.timestamp.seconds * 1000).toLocaleDateString('pt-BR');
        return data;
      });
      setFilteredGastos(filteredGastos);

      // Calcular o total de gastos
      const total = filteredGastos.reduce((acc, gasto) => acc + gasto.valor, 0);
      setTotalGastos(total);

      // Calcular as porcentagens de gastos em relação ao salário
      const gastosFixos = filteredGastos.filter(gasto => gasto.tipoDeGasto === 'Fixo').reduce((acc, gasto) => acc + gasto.valor, 0);
      const lazer = filteredGastos.filter(gasto => gasto.tipoDeGasto === 'Lazer').reduce((acc, gasto) => acc + gasto.valor, 0);
      const inesperado = filteredGastos.filter(gasto => gasto.tipoDeGasto === 'Inesperado').reduce((acc, gasto) => acc + gasto.valor, 0);

      setPercentGastosFixos((gastosFixos / salario) * 100);
      setPercentLazer((lazer / salario) * 100);
      setPercentInesperado((inesperado / salario) * 100);
    } catch (error) {
      console.error('Erro ao buscar gastos filtrados:', error);
    }
  };

  useEffect(() => {
    const fetchSalario = async () => {
      try {
        const auth = getAuth();
        const user = auth.currentUser;
        if (user) {
          // Obter o salário do usuário do Firestore
          // Substitua 'users' e 'salaryField' pelo caminho correto no seu Firestore
          const userDocRef = await getDoc(doc(database, 'users', user.uid));
          const userData = userDocRef.data();
          if (userData && userData.salario) {
            setSalario(userData.salario);
          }
        }
      } catch (error) {
        console.error('Erro ao buscar salário do usuário:', error);
      }
    };

    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      setUserUid(user.uid);
      fetchFilteredGastos(user.uid);
      fetchSalario();
    } else {
      navigation.navigate('signin');
    }
  }, [selectedType]);

  const handleFilterButtonClick = () => {
    // Re-filtrar os gastos quando o botão de filtro for pressionado
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      fetchFilteredGastos(user.uid);
    }
  };

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.item}>
      <Text>Tipo de Gasto: {item.tipoDeGasto}</Text>
      <Text>Data do Gasto: {item.timestamp}</Text>
      <Text>Valor: {item.valor}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text>Relatório de Gastos</Text>
      <Button title="Fixo" onPress={() => setSelectedType("Fixo")} />
      <Button title="Transporte" onPress={() => setSelectedType("Transporte")} />
      <Button title="Lazer" onPress={() => setSelectedType("Lazer")} />
      <Button title="Inesperado" onPress={() => setSelectedType("Inesperado")} />
      <Button title="Limpar Filtro" onPress={() => setSelectedType(null)} />
      <Button title="Filtrar" onPress={handleFilterButtonClick} />
      <FlatList
        data={filteredGastos}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
      <Text>Total Gasto: R$ {totalGastos.toFixed(2)}</Text>
      <Text>Porcentagem de Gastos Fixos: {percentGastosFixos.toFixed(2)}%</Text>
      <Text>Porcentagem de Gastos com Lazer: {percentLazer.toFixed(2)}%</Text>
      <Text>Porcentagem de Gastos Inesperados: {percentInesperado.toFixed(2)}%</Text>
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
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
});
