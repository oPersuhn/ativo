import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View } from 'react-native';

export default function New() {
  return (
    <View style={styles.container}>
      <Text>New</Text>
      <StatusBar style="auto" />
      <TextInput placeholder='Valor do gasto'></TextInput>
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
