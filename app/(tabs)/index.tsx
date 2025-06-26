import { StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={{ flex: 1, padding: 16 }}>
      <View style={styles.titleContainer}>
        <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
          Welcome to React Native
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
