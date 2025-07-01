import LoyaltyCard from '@/components/LoyaltyCard';
import PointsCard from '@/components/Reward/PointCard';
import PointHistoryItem from '@/components/Reward/PointHistoryItem';
import { UserInfoState, useUserInfoStore } from '@/services/store/UserInfoStore'; // Import the UserInfoState type
import { getPointHistory } from '@/services/supabase/GetPointHistory'; // Import the function to fetch point history
import { getUserInformation } from '@/services/supabase/GetUserInformation';
import { useIsFocused } from '@react-navigation/native';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

interface PointHistory {
    description: string;
    points: number;
    date: string; // ISO format or Date string
}

export default function Reward() {
    const isFocused = useIsFocused(); // Hook to check if the screen is focused
    const userInfo = useUserInfoStore((state: UserInfoState) => state); // Access user information from the store
    const [pointHistory, setPointHistory] = useState<PointHistory[]>([]);
    useEffect(() => {
        // Fetch user information when the component mounts
        const fetchUserInfo = async () => {
            try {
                const userInfo = await getUserInformation();
                // Update Zustand store with user information
                useUserInfoStore.setState(userInfo);

                const pointHistoryData = await getPointHistory(); // Assuming you have a function to fetch point history
                setPointHistory(pointHistoryData);

            } catch (error) {
                console.error('Error fetching user information:', error);
            }
        };
        fetchUserInfo();
    }
    , [isFocused]);
    return (
        <View style={styles.container}>
            <View style={{ marginTop: '5%', alignItems: 'center' }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Reward</Text>
            </View>
            <LoyaltyCard status={userInfo?.loyalty || 0} />
            <PointsCard
                points={userInfo?.points || 0}
                onRedeemPress={() => {
                    // Handle redeem action here
                    router.push('/Redeem'); // Assuming you have a navigation setup
                }}
            />
            <View style={styles.historyContainer}>
                <Text style = {{fontSize: 18, fontWeight: 600}}>History Reward</Text>
                <ScrollView showsVerticalScrollIndicator={true} style={{ marginTop: '5%', marginHorizontal: '5%' }}>
                    {pointHistory.map((item, index) => (
                        <PointHistoryItem
                            key={index}
                            description={item.description}
                            points={item.points}
                            timestamp={item.date}
                        />
                    ))}
                </ScrollView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  description: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  historyContainer: {
    marginTop: '5%',
    flex: 1,
    marginBottom: '25%',
    marginHorizontal: '5%',
  }
});