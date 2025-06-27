import LoyaltyCard from '@/components/Homescreen/LoyaltyCard';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import { Colors } from '../../constants/Colors';

export default function HomeScreen() {
  const getName = () => {
    return 'Anonymous';
  };

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
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 18, color: Colors.welcomeText.userName }}>
          Welcome to The Code Cup!
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  TopContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  welcomeContainer: {
    alignItems: 'center',
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
  }
});
