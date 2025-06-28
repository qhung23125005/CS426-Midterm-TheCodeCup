import { Pressable, StyleSheet, Text, View } from 'react-native';

type Props = {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
};

export default function QuantitySelector({
  label,
  value,
  onChange,
  min = 1,
  max = 99,
}: Props) {
  const handleDecrease = () => {
    if (value > min) onChange(value - 1);
  };

  const handleIncrease = () => {
    if (value < max) onChange(value + 1);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.controls}>
        <Pressable onPress={handleDecrease} style={styles.button}>
          <Text style={styles.symbol}>−</Text>
        </Pressable>
        <Text style={styles.value}>{value}</Text>
        <Pressable onPress={handleIncrease} style={styles.button}>
          <Text style={styles.symbol}>＋</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: '5%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: '10%',
  },
  label: {
    fontWeight: '600',
    fontSize: 16,
    marginTop: '2%',
    color: '#0a0f2c', // navy-like
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: 'white',
    gap: 12,
  },
  button: {
    paddingHorizontal: 6,
  },
  symbol: {
    fontSize: 18,
    color: '#0a0f2c',
    fontWeight: '500',
  },
  value: {
    fontSize: 16,
    fontWeight: '500',
    color: '#0a0f2c',
  },
});
