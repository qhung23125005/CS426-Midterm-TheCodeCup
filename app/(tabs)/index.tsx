import CoffeeProduct from '@/components/Homescreen/CoffeeProduct';
import LoyaltyCard from '@/components/Homescreen/LoyaltyCard';
import { getCoffeeProduct } from '@/services/GetCoffeeProduct';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Colors } from '../../constants/Colors';

interface CoffeeProduct {
  url: string;
  name: string;
}

export default function HomeScreen() {
  const [coffeeList, setCoffeeList] = useState<CoffeeProduct[]>([]);

  const getName = () => {
    return 'Anonymous';
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getCoffeeProduct();
        const mappedData = data.map((item: { coffee_name: string; image_url: string }) => ({
          name: item.coffee_name,
          url: item.image_url,
        }));
        setCoffeeList(mappedData);
      } catch (err) {
        console.error('Failed to load coffee list:', err);
      }
    }

  fetchData();

  }, []);
  return (
    <View style={{ flex: 1, padding: '3%'}}>
      <View style={styles.TopContainer}>
        <View style={styles.welcomeContainer}>
          <Text style = {styles.welcomeText}> Good morning </Text>
          <Text style = {styles.userNameText}> {getName()} </Text>
        </View>
        <View style={ styles.IconContainer}>
          <Ionicons name="cart-outline" size={24} color="black" />
          <Ionicons name="person-outline" size={24} color="black" style={{ marginLeft: 20 }} />
        </View>
      </View>
      <LoyaltyCard status={2} />
      <View style={styles.productContainer}>
        <Text style={{ color: 'white', fontSize: 14, marginBottom: '5%', marginLeft: '2%' }}> 
          Choose your coffee
        </Text>
        <ScrollView showsVerticalScrollIndicator={true}>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
          {coffeeList.map((coffee, index) => (
            <CoffeeProduct key={index} url={coffee.url} name={coffee.name} />
          ))}
        </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  TopContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: '5%',
  },
  welcomeContainer: {
    alignItems: 'flex-start',
    flexDirection: 'column',
    marginLeft: '2%',
  },
  IconContainer: {
    marginRight: '2%',
    flexDirection: 'row',
  },
  welcomeText: {
    color: Colors.welcomeText.welcome,
    fontSize: 15,
  },
  userNameText: {
    color: Colors.welcomeText.userName,
    fontSize: 18,
  },
  productContainer: {
    flex: 1,
    backgroundColor: Colors.ThemeColor.darkBlue,
    borderRadius: 15,
    padding: 10,
    marginTop: '5%',
    alignItems: 'flex-start',
  }
});
