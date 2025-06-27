import { supabase } from '@/utils/supabase';

export async function getCoffeeProduct() {
  try {
    const { data, error } = await supabase
      .from('Coffee')
      .select('coffee_name, image_url')

    if (error) {
      throw error;
    }
    console.log('Coffee product fetched successfully:', data);
    return data; 
  } catch (error) {
    console.error('Error fetching coffee product:', error);
    throw error; // Re-throw the error for further handling
  }
}