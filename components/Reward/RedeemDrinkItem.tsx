import { addPointHistoryEvent } from '@/services/supabase/AddPointHistoryEvent';
import { getUserInformation } from '@/services/supabase/GetUserInformation';
import { removeRedeemDrink } from '@/services/supabase/RemoveRedeemDrink';
import React, { useEffect, useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

interface RewardItemProps {
id: string;
  name: string;
  imageUrl: string;
  validUntil: string;
  points: number;
  onRedeem?: () => void; // Optional callback for when the item is redeemed 
}

export default function RewardItem({ id, name, imageUrl, validUntil, points, onRedeem }: RewardItemProps) {
    const [userPoints, setUserPoints] = useState<number>(0);
    useEffect(() => {
        // Simulate fetching user points from an API or state management
        const fetchUserPoints = async () => {
            // Replace with actual API call
            const userData = await getUserInformation(); // For now, just use the passed points
            setUserPoints(userData.userPoint);
        };

        fetchUserPoints();
    }, []);

  return (
    <View style={styles.container}>
      <Image source={{ uri: imageUrl }} style={styles.image} resizeMode="contain" />

      <View style={styles.textContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.date}>Valid until {validUntil}</Text>
      </View>

      <Pressable
  style={styles.pointsBadge}
  onPress={async () => {
    if (userPoints < points) {
      alert('You do not have enough points to redeem this drink.');
      return;
    }

    try {
      await removeRedeemDrink(id);
      await addPointHistoryEvent('Exchange Redeem Coffee', -points);
      
      if (onRedeem) {
        console.log('Redeem successful');
        await onRedeem(); // <- IMPORTANT to await this
      }
    } catch (error) {
      console.error('Redeem failed:', error);
      alert('Something went wrong while redeeming.');
    }
  }}
>
  <Text style={styles.pointsText}>{points} pts</Text>
</Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 12,
    paddingHorizontal: 10,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  textContainer: {
    flex: 1,
    marginLeft: 14,
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0a0f2c',
  },
  date: {
    fontSize: 12,
    color: '#9ca3af',
    marginTop: 2,
  },
  pointsBadge: {
    backgroundColor: '#2f4858',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
  },
  pointsText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
});
