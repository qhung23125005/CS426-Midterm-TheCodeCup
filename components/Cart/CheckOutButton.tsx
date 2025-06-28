import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

const CheckoutButton = () => {
  const router = useRouter();

  return (
    <Pressable style={styles.button} onPress={() => router.push('/checkout')}>
      <Ionicons name="cart-outline" size={20} color="#fff" style={{ marginRight: 8 }} />
      <Text style={styles.text}>Checkout</Text>
    </Pressable>
  );
};

export default CheckoutButton;

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    backgroundColor: '#2f4858', // dark navy blue
    paddingHorizontal: '10%',
    paddingVertical: '5%',
    borderRadius: 100,
    alignItems: 'center',
    alignSelf: 'center',
  },
  text: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
