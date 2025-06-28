import { useRouter } from 'expo-router';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

export default function OrderSuccessScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Image
        source={require('@/assets/images/OrderSuccess.png')} // Replace with your actual path
        style={styles.image}
        resizeMode="contain"
      />

      <Text style={styles.title}>Order Success</Text>
      <Text style={styles.subtitle}>
        Your order has been placed successfully.{"\n"}
        For more details, go to my orders.
      </Text>

      <Pressable
        style={styles.button}
        onPress={() => router.push('/MyOrders')} // Change path if needed
      >
        <Text style={styles.buttonText}>Track My Order</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: '10%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  image: {
    width: 180,
    height: 180,
    marginBottom: 40,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0a0f2c',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    color: '#a0a0a0',
    marginBottom: 40,
    lineHeight: 20,
  },
  button: {
    backgroundColor: '#2d445e',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 100,
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
});
