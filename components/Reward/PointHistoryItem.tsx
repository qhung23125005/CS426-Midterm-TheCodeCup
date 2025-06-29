import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface PointHistoryItemProps {
  description: string;
  points: number;
  timestamp: string; // ISO format or Date string
}

const PointHistoryItem: React.FC<PointHistoryItemProps> = ({
  description,
  points,
  timestamp,
}) => {
  const date = new Date(timestamp);
  const formattedDate = `${date.getDate()} ${date.toLocaleString('default', {
    month: 'long',
  })} | ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.coffeeName}>{description}</Text>
        <Text style={styles.date}>{formattedDate}</Text>
      </View>
      <Text style={styles.points}>+ {points} Pts</Text>
    </View>
  );
};

export default PointHistoryItem;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: '#f1f5f9',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  coffeeName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0a0f2c',
  },
  date: {
    fontSize: 12,
    color: '#cbd5e1',
    marginTop: 2,
  },
  points: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
  },
});
