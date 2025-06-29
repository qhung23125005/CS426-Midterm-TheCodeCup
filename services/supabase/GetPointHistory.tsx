import { supabase } from '@/utils/supabase';

export async function getPointHistory() {
  try {
    const user_id = await supabase.auth.getUser().then(({ data }) => data.user?.id);
    const { data, error } = await supabase
      .from('PointHistory')
      .select('*')
        .eq('user_id', user_id)
        .order('created_at', { ascending: false }); // Fetch point history for the user, ordered by date
    if (error) {
      console.error('Error fetching Point History:', error);
      throw error;
    }
    const mappedData = data.map((item) => ({
      uid: user_id || null, // Ensure user_id is not undefined
      description: item.name || null,
      points: item.point || 0,
      date: item.created_at || null,
    }));
    return mappedData; // Return the user object
  } catch (error) {
    console.error('Failed to get Point History:', error);
    throw error; // Re-throw the error for further handling
  }
}