import BackButton from '@/components/BackButton';
import CartItemCard from '@/components/Cart/CartItemCard';
import CheckoutButton from '@/components/Cart/CheckOutButton';
import { useCartStore } from '@/services/store/CartStore';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function CoffeeDetails() {
    const cartItems = useCartStore((state) => state.items);

    return (
        <View style={{ flex: 1 }}>
            <BackButton
                size={24}
                color="black"
                style = {{marginLeft: '5%', marginTop: '5%'}}
            />
            <View style = {{justifyContent: 'flex-start', marginLeft: '5%'}}>
                <Text style={{ color: 'black', fontSize: 20, marginTop: '5%',fontWeight: 600}}>  
                    My Cart
                </Text>
            </View>
             <ScrollView style={styles.OptionsContainer}>
                {cartItems.map((item, index) => (
                    <Pressable key={index}>
                        <CartItemCard cartItem={item} />
                    </Pressable>
                ))}
            </ScrollView>
            <View style={styles.bottomContainer}>
                <View style={styles.totalPriceContainer}>
                    <Text style={{ fontSize: 15, color : 'rgba(24, 51, 22, 0.4)' }}>
                        Total Price:
                    </Text>
                    <Text style={{ fontSize: 30, fontWeight: 'bold', marginRight: '5%' }}>
                        ${cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}
                    </Text>
                </View>
                <CheckoutButton />
            </View>
            
        </View>
    );
}

const styles = StyleSheet.create({
    TopContainer: {
        marginHorizontal: '5%',
        marginTop: '5%',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
    },
    OptionsContainer: {
        flex: 1, 
        backgroundColor: 'white', 
        marginTop: '5%',
        marginHorizontal: '2%',
    },
    totalPriceContainer: {
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    bottomContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: '5%',
        paddingVertical: '2%',
        marginBottom: '5%'
    }
});