import { GetOrder } from '@/services/supabase/GetOrder';
import { getUserInformation } from '@/services/supabase/GetUserInformation';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

type Order = {
  order_id: string;
  created_at: string;
  coffee_name: string;
  price: number;
};

export default function MyOrderScreen() {
  const [activeTab, setActiveTab] = useState<'ongoing' | 'history'>('ongoing');
  const [orders, setOrders] = useState<Order[]>([]);
  const [address, setAddress] = useState<string>('');

  const fetchOrders = async (status: 'ongoing' | 'history') => {
    try {
      const userInfo = await getUserInformation();
      setAddress(userInfo.address || '');

      const ordersData = await GetOrder(status);
      setOrders(ordersData);
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  useEffect(() => {
    fetchOrders(activeTab);
  }, [activeTab]);

  const renderOrder = ({ item }: { item: Order }) => {
  const date = new Date(item.created_at);
  const formattedDate = `${date.getDate()} ${date.toLocaleString('default', {
    month: 'long',
  })} | ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

  return (
    <View style={[styles.orderCard, activeTab === 'history' && { opacity: 0.4 }]}>
      <Text style={styles.date}>{formattedDate}</Text>
      <Text style={styles.price}>${item.price.toFixed(2)}</Text>
      <View style={styles.row}>
        <Ionicons name="cafe-outline" size={16} color="#0a0f2c" style={styles.icon} />
        <Text style={styles.itemText}>{item.coffee_name}</Text>
      </View>
      <View style={styles.row}>
        <Ionicons name="location-outline" size={16} color="#0a0f2c" style={styles.icon} />
        <Text style={styles.itemText}>{address}</Text>
      </View>
    </View>
  );
};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Order</Text>
      <View style={styles.tabContainer}>
        <Pressable onPress={() => setActiveTab('ongoing')}>
          <Text
            style={[
              styles.tabText,
              activeTab === 'ongoing' ? styles.activeTab : styles.inactiveTab,
            ]}
          >
            On going
          </Text>
        </Pressable>
        <Pressable onPress={() => setActiveTab('history')}>
          <Text
            style={[
              styles.tabText,
              activeTab === 'history' ? styles.activeTab : styles.inactiveTab,
            ]}
          >
            History
          </Text>
        </Pressable>
      </View>

      <FlatList
        data={orders}
        renderItem={renderOrder}
        keyExtractor={(item) => item.order_id}
        contentContainerStyle={{ paddingBottom: 40 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: '5%',
    backgroundColor: 'white',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20,
    color: '#0a0f2c',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  tabText: {
    fontSize: 14,
    marginHorizontal: 20,
  },
  activeTab: {
    fontWeight: '700',
    color: '#0a0f2c',
    textDecorationLine: 'underline',
  },
  inactiveTab: {
    color: '#c0c0c0',
    opacity: 0.5,
  },
  orderCard: {
    borderBottomWidth: 0.5,
    borderBottomColor: '#e5e5e5',
    paddingVertical: 16,
  },
  date: {
    fontSize: 12,
    color: '#9ca3af',
    marginBottom: 4,
  },
  price: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0a0f2c',
    position: 'absolute',
    right: 0,
    top: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  icon: {
    marginRight: 8,
  },
  itemText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#0a0f2c',
    flex: 1,
    flexWrap: 'wrap',
  },
});
