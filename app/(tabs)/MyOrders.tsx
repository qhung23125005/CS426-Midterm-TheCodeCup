import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function MyOrdersScreen() {
  return (
    <View style={{ flex: 1, padding: '3%' }}>
      <View style={styles.TopContainer}>
        <Text style={styles.welcomeText}>My Orders</Text>
      </View>
      <View style={styles.productContainer}>
        <Text style={{ color: 'white', fontSize: 14, marginBottom: '5%', marginLeft: '2%' }}>
          Your past orders will be displayed here.
        </Text>
        {/* Future implementation for displaying orders */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  TopContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 24,
    color: 'black',
  },
  productContainer: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    padding: 20,
  },
});