import React from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native'; // Use fast image for better performance
import { Colors } from '../../constants/Colors';

// Props of LoyaltyCard component
interface LoyaltyCardProps {
    status: number; // Integer from 0 to 8
}
const MAX_CUPS = 8; // Maximum number of cups

export default function LoyaltyCard({ status }: LoyaltyCardProps) {
    const cups = Array.from({ length: MAX_CUPS }, (_, i) => i < status);

    return (
        <View style={styles.container}>
            <View style={styles.topContainer}>
                <Text style={{ color: 'white', fontSize: 14, marginLeft: '5%' }}>
                    Loyalty Card
                </Text>
                <Text style={{ color: 'white', fontSize: 14, marginRight: '5%' }}>
                    {status}/{MAX_CUPS}
                </Text>
            </View>
            { /* Render the cup image based on the status */}
            <View style={styles.StatusCupContainer}>
               {cups.map((filled, index) => (
                <ImageBackground
                    key={index}
                    source={ require('@/assets/images/StatusCup.png') }
                    style={[styles.cup, {opacity: filled ? 1 : 0.25}]} // Adjust opacity based on filled status
                    resizeMode="contain"
                />
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    marginTop: '5%',
    backgroundColor: Colors.ThemeColor.darkBlue, // Use the dark blue color from Colors
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  topContainer: {
    paddingTop: '2%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  StatusCupContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white', 
    margin: '5%',
    paddingHorizontal: '5%',
    paddingVertical: '2%',
    borderRadius: 10,
  },
   cup: {
    width: 30,
    height: 30,
    marginHorizontal: '1%',
  },
});