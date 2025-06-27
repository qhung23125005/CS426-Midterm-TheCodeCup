import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';

export default function CoffeeDetails() {
    const { name } = useLocalSearchParams();
    return (
        <View style={{ flex: 1, padding: '3%' }}>
        <Text style={{ fontSize: 24, color: 'black' }}>Coffee Details</Text>
        <Text style={{ fontSize: 18, color: 'gray', marginTop: 10 }}>
            Coffee Name: {name}
        </Text>
        {/* Additional details can be added here */}
        </View>
    );
}