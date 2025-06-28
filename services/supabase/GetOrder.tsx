import { supabase } from '@/utils/supabase';

export async function GetOrder(status: 'ongoing' | 'history' = 'ongoing') {
  try {
    const user_id = await supabase.auth.getUser().then(({ data }) => data.user?.id);
    const { data, error } = await supabase
        .from('Order')
        .select('*')
        .eq('user_id', user_id) // You may need to modify getUserInformation to return uid
        .eq('status', status) // Filter by order status
        .order('created_at', { ascending: false });
    if (error) {
      console.error('Error fetching order:', error);
      throw error;
    }
    
    return data; // Return the user object
  } catch (error) {
    console.error('Failed to get order:', error);
    throw error; // Re-throw the error for further handling
  }
}