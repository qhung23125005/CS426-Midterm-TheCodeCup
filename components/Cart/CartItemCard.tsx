import { CartItem, useCartStore } from '@/services/supabase/CartStore';
import { Ionicons } from '@expo/vector-icons';
import { Dimensions, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';

type Props = {
  cartItem: CartItem;
};

const cardWidth = Dimensions.get('window').width * 0.3;

export default function CartItemCard({ cartItem }: Props) {
  const {
    id,
    name,
    quantity,
    price,
    url,
    shot = '',
    select = '',
    size = '',
    iceLevel = '',
  } = cartItem;

  const deleteItemFromCart = useCartStore((state) => state.removeItem);

  const getDetailDescription = () => {
    const details = [];
    if (shot) details.push(shot);
    if (select) details.push(select);
    if (size) details.push(size);
    if (iceLevel === 1) {
      details.push('Less Ice');
    } else if (iceLevel === 2) {
      details.push('Normal Ice');
    } else if (iceLevel === 3) {
      details.push('Full Ice');
    }
    return details.join(' | ');
  };

  const renderRightActions = () => (
    <View style={styles.deleteContainer}>
      <Pressable onPress={() => deleteItemFromCart(id)} style={styles.deleteButton}>
        <Ionicons name="trash-outline" size={24} color="#d21f3c" />
      </Pressable>
    </View>
  );

  return (
    <Swipeable renderRightActions={renderRightActions}>
      <View style={styles.container}>
        <Image source={{ uri: url }} style={styles.image} />
        <View style={styles.info}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.subOptions}>{getDetailDescription()}</Text>
          <Text style={styles.quantity}>x{quantity}</Text>
        </View>
        <Text style={styles.price}>${(price * quantity).toFixed(2)}</Text>
      </View>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#f7f8fa',
    borderRadius: 16,
    padding: '2%',
    alignItems: 'center',
    marginBottom: '2%',
  },
  image: {
    width: cardWidth,
    height: cardWidth,
    resizeMode: 'contain',
    marginRight: '2%',
  },
  info: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontWeight: '700',
    color: '#0a0f2c',
    fontSize: 14,
  },
  subOptions: {
    fontSize: 12,
    color: '#9a9a9a',
    marginVertical: 2,
  },
  quantity: {
    fontWeight: '600',
    fontSize: 13,
    color: '#2e2e2e',
  },
  price: {
    fontWeight: '700',
    fontSize: 16,
    color: '#0a0f2c',
  },
   deleteContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 70,
    marginLeft: -10,
    marginRight: 10,
  },
  deleteButton: {
    backgroundColor: '#ffecec',
    borderRadius: 16,
    padding: 12,
  },
});
