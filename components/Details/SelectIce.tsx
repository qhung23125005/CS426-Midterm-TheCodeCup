import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

type IceLevel = 0 | 1 | 2 | 3;

export default function SelectIceComponent({
  value,
  onChange,
}: {
  value: number | IceLevel;
  onChange: (val: number | IceLevel) => void;
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Ice</Text>
      <View style={styles.options}>
        {[1, 2, 3].map((level) => (
          <Pressable key={level} onPress={() => onChange(level as IceLevel)} style={styles.stack}>
            {Array.from({ length: level }).map((_, i) => (
              <Image
                key={i}
                source={require('@/assets/images/IceBlock.png')}
                style={[
                  styles.ice,
                  {
                    tintColor: value === level ? '#0a0f2c' : '#ccc',
                    margin: 1,
                  },
                ]}
              />
            ))}
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
    alignItems: 'center',
    gap: 12,
  },
  stack: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 22, // enough to wrap 2 cubes
    height: 22,
  },
  ice: {
    width: 10,
    height: 10,
    resizeMode: 'contain',
  },
});