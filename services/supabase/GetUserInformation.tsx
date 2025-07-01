import { UserInfoState } from '@/services/store/UserInfoStore'; // Import the UserInfoState type
import { supabase } from '@/utils/supabase';


export async function getUserInformation() {
  try {
    const user_id = await supabase.auth.getUser().then(({ data }) => data.user?.id);
    const email = await supabase.auth.getUser().then(({ data }) => data.user?.email);
    const { data, error } = await supabase
      .from('User')
      .select('*')
        .eq('uid', user_id)
        .single(); // Use single() to get a single user object
    if (error) {
      console.error('Error fetching user information:', error);
      throw error;
    }
    const mappedData: UserInfoState = {
      username: data.username || 'Guest',
      email: email || null,
      address: data.address || null,
      phone_number: data.phone_number || null,
      loyalty: data.loyalty || 0,
      points: data.points || 0,
    };
      // Ensure all fields are present in the UserInfoState type>
    return mappedData; // Return the user object
  } catch (error) {
    console.error('Failed to get user information:', error);
    throw error; // Re-throw the error for further handling
  }
}