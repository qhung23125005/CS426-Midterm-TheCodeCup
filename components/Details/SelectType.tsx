import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

type DrinkType = 'hot' | 'cold';

export default function SelectTypeComponent({
  value,
  onChange,
}: {
  value: string | DrinkType;
  onChange: (val: string | DrinkType) => void;
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Select</Text>
      <View style={styles.options}>
        <Pressable onPress={() => onChange('hot')}>
          <Image
            source={require('@/assets/images/Hot.png')} // ✅ Your hot coffee icon
            style={[styles.icon, value === 'hot' ? styles.selected : styles.unselected]}
          />
        </Pressable>
        <Pressable onPress={() => onChange('cold')}>
          <Image
            source={require('@/assets/images/Cold.png')} // ✅ Your cold coffee icon
            style={[styles.icon, value === 'cold' ? styles.selected : styles.unselected]}
          />
        </Pressable>
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
    gap: 16,
  },
  icon: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
  },
  selected: {
    tintColor: '#0a0f2c',
  },
  unselected: {
    tintColor: '#ccc',
  },
});
