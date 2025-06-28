import { Pressable, StyleSheet, Text } from 'react-native';

type Props = {
  onPress: () => void;
};

export default function AddToCartButton({ onPress }: Props) {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.text}>Add to cart</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#2d4550', // Deep blue/green
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 999, // Fully rounded
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  text: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});