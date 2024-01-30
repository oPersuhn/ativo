import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RootStackNavigationProp } from '../../routes/types';
import React from 'react';

export default function Report() {
  const navigation = useNavigation<RootStackNavigationProp>();

  return (
    <View style={styles.container}>
      <Text>Report</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
