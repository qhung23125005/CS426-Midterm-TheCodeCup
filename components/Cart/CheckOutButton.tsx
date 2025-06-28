import { useCartStore, } from '@/services/store/CartStore';
import { addOrderToDatabase } from '@/services/supabase/AddProduct';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';


const CheckoutButton = () => {
  const router = useRouter();
  const cartItems = useCartStore((state) => state.items);
  return (
    <Pressable style={styles.button} 
      onPress={() => {
        if (cartItems.length === 0) {
          alert('Your cart is empty. Please add items to your cart before checking out.');
          return;
        }
        cartItems.forEach((item) => {
          addOrderToDatabase(item).catch((error) => {
            console.error('Error adding order to database:', error);
          });
        });
        useCartStore.getState().clearCart(); // Clear the cart after checkout
        console.log('Checkout successful, cart cleared');
        router.navigate('/OrderSuccess');

     }}>
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
