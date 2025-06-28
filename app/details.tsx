import BackButton from '@/components/BackButton';
import AddToCartButton from '@/components/Details/AddToCartButton';
import QuantitySelector from '@/components/Details/Quantity';
import SelectIceComponent from '@/components/Details/SelectIce';
import SelectSizeComponent from '@/components/Details/SelectSize';
import SelectTypeComponent from '@/components/Details/SelectType';
import ShotComponent from '@/components/Details/Shot';
import ToCartButton from '@/components/ToCartButton';
import { useCartStore } from '@/services/store/CartStore';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

export default function CoffeeDetails() {
    const { name, url, price } = useLocalSearchParams();
    const [quantity, setQuantity] = useState(1);
    const [shot, setShot] = useState('Single');
    const [select, setSelect] = useState('cold');
    const [size, setSize] = useState('S');
    const [iceLevel, setIceLevel] = useState(1);
    const addItemToCart = useCartStore((state) => state.addItem);
    const cartItems = useCartStore((state) => state.items);

    const getPrice = () => {
        let basePrice = price ? parseFloat(price as string) : 0;
        if (size === 'M') {
            basePrice += 1; // Add $1 for medium size
        } else if (size === 'L') {
            basePrice += 2; // Add $2 for large size
        }
        if (shot === 'Double') {
            basePrice += 0.5; // Add $0.5 for double shot
        }
        if (select === 'hot') {
            basePrice += 0.5; // Add $0.5 for hot drinks
        }
        return (basePrice * quantity); // Calculate total price
    }
    return (
        <View style={{ flex: 1 }}>
            <View style={styles.TopContainer}>
                <BackButton
                    size={24}
                    color="black"
                />
                <Text style={{ color: 'black', fontSize: 20}}>
                    Details
                </Text>
                <ToCartButton
                    size={24}
                    color="black"
            
                />
            </View>
            <View style={{justifyContent: 'center', alignItems: 'center' }}>
            <Image
                source={{ uri: url as string }}
                style={{ width: 200, height: 200, borderRadius: 10, marginTop: '5%' }}
                resizeMode="contain">
            </Image>
            </View>
            <View style={styles.OptionsContainer}>
                <QuantitySelector
                    label={name as string}
                    value={quantity}
                    onChange={(value) => setQuantity(value)}
                    min={1}
                    max={99}
                />

                <ShotComponent
                    value={shot}
                    onChange={(value) => setShot(value)}
                />

                <SelectTypeComponent
                    value={select}
                    onChange={(val) => {
                        setSelect(val)
                        if (val === 'hot') {
                            setIceLevel(0); // Reset ice level for hot drinks
                        } else {
                            setIceLevel(1); // Default ice level for cold drinks
                        }
                    }}
                />

                <SelectSizeComponent
                    value={size}
                    onChange={(val) => setSize(val)}
                />

                <SelectIceComponent
                    value={select === 'hot' ? 0 : iceLevel}
                    onChange={(val) => {
                        if (select === 'hot') {
                            setIceLevel(0); // No ice for hot drinks
                        } else setIceLevel(val)}
                    }
                />

                <View style={{justifyContent: 'space-between', flexDirection: 'row', marginTop: '20%', marginHorizontal: '10%'}}>
                    <Text style={{
                        color: 'black',
                        fontSize: 18,
                        fontWeight: 'bold',
                    }}>  
                        Total Amount
                    </Text>

                    <Text style={{
                        color: 'black',
                        fontSize: 18,
                        fontWeight: 'bold',
                    }}>
                        ${getPrice()}
                    </Text>
                </View>
                <AddToCartButton
                    onPress={() => {
                        addItemToCart({
                            id: `${name}-${size}-${shot}-${select}-${iceLevel}`,
                            name: name as string,
                            url: url as string,
                            price: getPrice(),
                            quantity,
                            shot,
                            select,
                            size,
                            iceLevel
                        });
                        router.back();
                        router.push('/Cart');
                    }}
                />
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
    }
});