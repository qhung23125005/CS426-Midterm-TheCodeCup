import { Pressable, StyleSheet, Text, View } from 'react-native';

type ShotOption = 'Single' | 'Double';

export default function ShotComponent({
  value,
  onChange,
}: {
  value: string | ShotOption;
  onChange: (value: string | ShotOption) => void;
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Shot</Text>
      <View style={styles.buttons}>
        {(['Single', 'Double'] as ShotOption[]).map((option) => (
          <Pressable
            key={option}
            onPress={() => onChange(option)}
            style={[
              styles.button,
              value === option && styles.selectedButton,
            ]}
          >
            <Text style={[styles.buttonText, value === option && styles.selectedText]}>
              {option}
            </Text>
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
    color: '#0a0f2c', // navy-like
  },
  buttons: {
    flexDirection: 'row',
    gap: 10,
  },
  button: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 6,
    backgroundColor: 'white',
  },
  selectedButton: {
    borderColor: '#0a0f2c',
    backgroundColor: '#eef0f4',
  },
  buttonText: {
    fontSize: 14,
    color: '#0a0f2c',
  },
  selectedText: {
    fontWeight: '600',
  },
});
