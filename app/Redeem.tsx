import BackButton from '@/components/BackButton';
import RedeemDrinkItem from '@/components/Reward/RedeemDrinkItem';
import { getRedeemDrink } from '@/services/supabase/GetRedeemDrink';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';


interface RedeemDrink {
  coffee_id: string;
  name: string;
  url: string;
  valid_until: string;
  points: number;
  id: string;
}

export default function Redeem() {
  const [redeemDrinks, setRedeemDrinks] = useState<RedeemDrink[]>([]);
  const fetchRedeemDrinks = async () => {
    try {
      const drinks = await getRedeemDrink();
      setRedeemDrinks(drinks);
      console.log('Redeem Drinks:', drinks);
    } catch (error) {
      console.error('Error fetching redeem drinks:', error);
    }
  }
  useEffect(() => {
      fetchRedeemDrinks();
  }, []);
  return (
    <View style={styles.container}>
      <BackButton />
        
      <View style={styles.topContainer}>
        <Text style={styles.title}>Redeem</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={{ marginHorizontal: '5%' }}>
        {redeemDrinks.map((drink) => (
          <RedeemDrinkItem
            key={drink.id}
            id={drink.id}
            name={drink.name}
            imageUrl={drink.url}
            validUntil={drink.valid_until}
            points={drink.points}
            onRedeem={fetchRedeemDrinks}
          />
        ))}
      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    marginTop: '5%'
  },
  topContainer: {
    marginHorizontal: '5%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
    color: '#333',
  },
})