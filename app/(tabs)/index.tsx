import CoffeeProduct from '@/components/Homescreen/CoffeeProduct';
import LoyaltyCard from '@/components/Homescreen/LoyaltyCard';
import ToCartButton from '@/components/ToCartButton';
import ToProfileButton from '@/components/ToProfileButton';
import { signInAnonymously } from '@/services/supabase/Auth'; // Import the signInAnonymously function
import { getCoffeeProduct } from '@/services/supabase/GetCoffeeProduct';
import { getUserInformation } from '@/services/supabase/GetUserInformation';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Colors } from '../../constants/Colors';
interface CoffeeProduct {
  url: string;
  name: string;
  price: number;
}

export default function HomeScreen() {
  const [coffeeList, setCoffeeList] = useState<CoffeeProduct[]>([]);
  const [userName, setUserName] = useState<string | null>("Guest");
  const [loyaltyStatus, setLoyaltyStatus] = useState<number>(0); // Assuming loyalty status is a number

    const init = async () => {
      const data1 = await signInAnonymously(); // ✅ get user ID
      
      const userInfo = await getUserInformation(); // ✅ get user information
      setUserName(userInfo.userName || "Guest"); // Set user name or default to "Guest"
      setLoyaltyStatus(userInfo.loyaltyPoints || 0); // Set loyalty points or default to 0
      
      const data2 = await getCoffeeProduct();
      setCoffeeList(data2);
    };
    init();
  return (
    <View style={{ flex: 1}}>
      <View style={styles.TopContainer}>
        <View style={styles.welcomeContainer}>
          <Text style = {styles.welcomeText}> Good morning </Text>
          <Text style = {styles.userNameText}> {userName} </Text>
        </View>
        <View style={ styles.IconContainer}>
          <ToCartButton size={24} color="black" style = {{marginRight: '10%'}} />
          <ToProfileButton size = {24} color = "black"  />
        </View>
      </View>
      <LoyaltyCard status={loyaltyStatus} />
      <View style={styles.productContainer}>
        <Text style={{ color: 'white', fontSize: 14, marginBottom: '5%', marginLeft: '2%' }}> 
          Choose your coffee
        </Text>
        <ScrollView showsVerticalScrollIndicator={true} style = {{marginBottom:'12%'}}>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
          {coffeeList.map((coffee, index) => (
            <CoffeeProduct key={index} url={coffee.url} name={coffee.name} price = {coffee.price} />
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
    alignItems: 'center',
    justifyContent: 'space-between',
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
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    padding: 10,
    marginTop: '5%',
    alignItems: 'flex-start',
  }
});
