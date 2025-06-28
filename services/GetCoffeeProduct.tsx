import { supabase } from '@/utils/supabase';

export async function getCoffeeProduct() {
  try {
    const { data, error } = await supabase
      .from('Coffee')
      .select('coffee_name, image_url, price')

    if (error) {
      throw error;
    }
    const mappedData = data.map((item: { coffee_name: string; image_url: string , price: number}) => ({
      name: item.coffee_name,
      url: item.image_url,
      price: item.price, // Assuming you want to include price as well
    }));
    return mappedData; 
  } catch (error) {
    console.error('Error fetching coffee product:', error);
    throw error; // Re-throw the error for further handling
  }
}