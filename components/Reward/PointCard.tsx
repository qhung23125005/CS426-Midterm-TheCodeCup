import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

interface PointsCardProps {
  points: number;
  onRedeemPress?: () => void;
}

const PointsCard: React.FC<PointsCardProps> = ({ points, onRedeemPress }) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        <Text style={styles.label}>My Points:</Text>
        <Text style={styles.points}>{points}</Text>
      </View>
      <Pressable style={styles.button} onPress={onRedeemPress}>
        <Text style={styles.buttonText}>Redeem drinks</Text>
      </Pressable>
      <Image
        source={require('@/assets/images/PointCardDetail.png')} // Make sure the path is correct
        style={styles.decorImage}
        resizeMode="contain"
      />
    </View>
  );
};

export default PointsCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2c4555',
    borderRadius: 16,
    padding: '5%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    overflow: 'hidden',
    marginHorizontal: '5%',
    marginTop: '5%',
  },
  leftSection: {
    flexDirection: 'column',
    marginLeft: '5%',
  },
  label: {
    color: '#e2e8f0',
    fontSize: 14,
    marginBottom: 4,
  },
  points: {
    color: '#e2e8f0',
    fontSize: 28,
    fontWeight: '600',
  },
  button: {
    backgroundColor: '#3a556a',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    zIndex: 1,
    marginRight: '5%',
  },
  buttonText: {
    color: '#cbd5e1',
    fontSize: 12,
    fontWeight: '500',
  },
  decorImage: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 50,
    height: 50,
    opacity: 0.3,
  },
});
