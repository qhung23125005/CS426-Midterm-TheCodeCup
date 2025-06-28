import { CartItem } from '@/services/store/CartStore';
import { supabase } from '@/utils/supabase';

/*
Order:
user_id: uuid of the user
price
coffee_name
quantity
*/

export async function addOrderToDatabase(item: CartItem, point: number): Promise<void> {
  try {
    const user_id = await supabase.auth.getUser().then(({ data }) => data.user?.id);
    const { data, error } = await supabase
      .from('Order')
      .insert({
        user_id: user_id,
        price: item.price,
        coffee_name: item.name,
        quantity: item.quantity,
      });

    if (error) {
      console.error('Error adding item to cart:', error);
      throw error;
    }

    // Add point to PointHistory
    console.log('Item added to cart successfully:', data);
  } catch (error) {
    console.error('Failed to add item to cart:', error);
  }
}