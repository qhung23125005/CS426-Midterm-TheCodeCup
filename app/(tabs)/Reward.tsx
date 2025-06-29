import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Reward() {
  return (
    <View style={styles.container}>
        <View style={{ marginTop: '5%', alignItems: 'center' }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Reward</Text>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  description: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
});