import { supabase } from '@/utils/supabase';

export async function getUserInformation() {
  try {
    const user_id = await supabase.auth.getUser().then(({ data }) => data.user?.id);
    const { data, error } = await supabase
      .from('User')
      .select('*')
        .eq('uid', user_id)
        .single(); // Use single() to get a single user object
    if (error) {
      console.error('Error fetching user information:', error);
      throw error;
    }
    const mappedData =  {
        userName: data.username || null,
        phone_number: data.phone_number || null,
        email: data.email || null,
        loyaltyPoints: data.loyalty,
        address: data.address || null,
    } ;

    return mappedData; // Return the user object
  } catch (error) {
    console.error('Failed to get user information:', error);
    throw error; // Re-throw the error for further handling
  }
}