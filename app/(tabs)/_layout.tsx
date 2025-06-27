import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          borderRadius: 20,
          height: '8%',
          paddingBottom: 10,
          backgroundColor: 'white', // Use the dark blue color from Colors
          marginHorizontal: '5%',
          marginBottom: '5%',
        },
        tabBarIconStyle: {
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1, // makes icon take full height of the tab bar item
        },
        tabBarIcon: ({ color, size, focused }) => {
          let iconName = 'home-outline';

          if (route.name === 'index') iconName = 'home-outline';
          else if (route.name === 'MyOrders') iconName = 'reader-outline';
          else if (route.name === 'history') iconName = 'calendar-outline';

          return <Ionicons name={iconName} size={size} color={'black'} style={{ opacity: focused ? 1 : 0.3 }} />;
        },
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'black',
      })}
    >
      <Tabs.Screen name="index" options={{ title: 'Home' }} />
      <Tabs.Screen name="MyOrders" options={{ title: 'MyOrdersScreen' }} />
      <Tabs.Screen name="history" options={{ title: 'History' }} />
    </Tabs>
  );
}
