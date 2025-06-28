import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

type CupSize = 'S' | 'M' | 'L';

const SIZE_MAP: Record<CupSize, number> = {
  S: 24,
  M: 32,
  L: 40,
};

export default function SelectSizeComponent({
  value,
  onChange,
}: {
  value: string | CupSize;
  onChange: (val: string | CupSize) => void;
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Size</Text>
      <View style={styles.options}>
        {(Object.keys(SIZE_MAP) as CupSize[]).map((size) => (
          <Pressable key={size} onPress={() => onChange(size)}>
            <Image
              source={require('@/assets/images/SizeCup.png')} // Replace with your actual path
              style={[
                styles.icon,
                {
                  width: SIZE_MAP[size],
                  height: SIZE_MAP[size],
                  tintColor: value === size ? '#0a0f2c' : '#ccc',
                },
              ]}
            />
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: '10%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: '10%',
  },
  label: {
    fontWeight: '600',
    fontSize: 16,
    marginTop: '2%',
    color: '#0a0f2c',
  },
  options: {
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
  },
  icon: {
    resizeMode: 'contain',
  },
});
