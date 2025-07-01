import CoffeeProduct from '@/components/Homescreen/CoffeeProduct';
import LoyaltyCard from '@/components/LoyaltyCard';
import ToCartButton from '@/components/ToCartButton';
import ToProfileButton from '@/components/ToProfileButton';
import { UserInfoState, useUserInfoStore } from '@/services/store/UserInfoStore'; // Import the UserInfoState type
import { signInAnonymously } from '@/services/supabase/Auth'; // Import the signInAnonymously function
import { getCoffeeProduct } from '@/services/supabase/GetCoffeeProduct';
import { getUserInformation } from '@/services/supabase/GetUserInformation';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Colors } from '../../constants/Colors';

interface CoffeeProduct {
  url: string;
  name: string;
  price: number;
}

export default function HomeScreen() {
  const [coffeeList, setCoffeeList] = useState<CoffeeProduct[]>([]);
  const [canOrder, setCanOrder] = useState<boolean>(false); // State to track if the user can order
  const userInfo = useUserInfoStore((state: UserInfoState) => state); // Get user info from Zustand store

  const handleSignIn = async () => {
    try {
      await signInAnonymously();
    
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  const updateDataInfo = async () => {
    try {
      const data = await getUserInformation();
      // update Zustand store with user information
      useUserInfoStore.setState(data);
      // can only order if phone number and address and name exists
      setCanOrder(!!userInfo.phone_number && !!userInfo.address && !!userInfo.username);
    } catch (error) {
      console.error('Error fetching user information:', error);
    }
  }
  console.log('userInfo', userInfo); // Log user information to check if it is being fetched correctly
  useEffect(() => {
    handleSignIn(); // Sign in anonymously when the screen is focused
    updateDataInfo(); // Update user information when the screen is focused
    getCoffeeProduct().then(setCoffeeList).catch(console.error);
  }, []);
  return (
    <View style={{ flex: 1}}>
      <View style={styles.TopContainer}>
        <View style={styles.welcomeContainer}>
          <Text style = {styles.welcomeText}> Good morning </Text>
          <Text style = {styles.userNameText}> {userInfo.username} </Text>
        </View>
        <View style={ styles.IconContainer}>
          <ToCartButton size={24} color="black" style = {{marginRight: '10%'}} />
          <ToProfileButton size = {24} color = "black"  />
        </View>
      </View>
      <LoyaltyCard status={userInfo.loyalty || 0} />
      <View style={styles.productContainer}>
        <Text style={{ color: 'white', fontSize: 14, marginBottom: '5%', marginLeft: '2%' }}> 
          Choose your coffee
        </Text>
        <ScrollView showsVerticalScrollIndicator={true} style = {{marginBottom:'12%'}}>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
          {coffeeList.map((coffee, index) => (
            <CoffeeProduct key={index} url={coffee.url} name={coffee.name} price = {coffee.price} canOrder = {canOrder} />
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
