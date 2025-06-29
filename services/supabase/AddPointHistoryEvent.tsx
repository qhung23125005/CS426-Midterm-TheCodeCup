import { supabase } from '@/utils/supabase';

export async function addPointHistoryEvent(name: string, point: number) {
  try {
    const user_id = await supabase.auth.getUser().then(({ data }) => data.user?.id);
    if (!user_id) {
      throw new Error('User not authenticated');
    }
    // Create a new point history event
    const { data, error } = await supabase
        .from('PointHistory')
        .insert([
            {
            user_id: user_id,
            name: name, // Replace with actual event name or description
            point: point, // Replace with actual points to be added
            },
        ])
        .single(); // Use single() to return a single object
    if (error) {
      console.error('Error adding point history event:', error);
      throw error;
    }

    return data; // Return the newly created point history event
  } catch (error) {
    console.error('Failed to add point history event:', error);
    throw error; // Re-throw the error for further handling
  }
}