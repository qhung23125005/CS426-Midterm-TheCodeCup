import { router } from 'expo-router';
import { Dimensions, Image, Pressable, StyleSheet, Text } from 'react-native';

interface CoffeeProduct {
    url: string;
    name: string;
}

const { width } = Dimensions.get('window');
const itemWidth = width * 0.3; // 40% of the screen width

export default function CoffeeProduct({url, name}: CoffeeProduct) {

    return (
        <Pressable
            onPress ={() => router.push({pathname: '/details', params: { name: name }})} 
            style={styles.container}>
            <Image source={{uri: url} } style={styles.image} resizeMode='contain' />
            <Text style={styles.productName}>{name}</Text>
            
        </Pressable>
    );

}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderRadius: 15,
        marginHorizontal: '5%',
        padding: 10,
        marginBottom: '10%',
        width: '40%'
    },
    productName: {
        color: 'black',
        marginTop: '2%',
        fontSize: 12,
        marginBottom: 10,
    },
    image: {
        width: itemWidth,
        height: undefined, // Maintain aspect ratio
        aspectRatio: 1, // Adjust this value based on your image's aspect ratio
        borderRadius: 10,
    },
});