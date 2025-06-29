import { supabase } from '@/utils/supabase'; // Adjust the import path as necessary

export async function getRedeemDrink() {
  try {
    const user_id = await supabase.auth.getUser().then(({ data }) => data.user?.id);
    const { data, error } = await supabase
      .from('RedeemCoffee')
      .select('*')
      .eq('user_id', user_id)
      .order('created_at', { ascending: false }); // Fetch redeem drink history for the user, ordered by date

    if (error) {
      console.error('Error fetching Redeem Drink:', error);
      throw error;
    }
    console.log('User ID:', user_id); // Log the user ID for debugging
    console.log('Redeem Drink Data:', data); // Log the fetched data for debugging

    const mappedData = data.map((item) => ({
      id: item.id || '', // Ensure id is not undefined
      coffee_id: item.coffee_id || null,
      points: item.point_cost || 0,
      valid_until: item.valid_until || null,
      name: '',
        url: '',
    }));

    // Get the coffee names and url from the CoffeeProduct table
    for (const item of mappedData) {
      const { data: coffeeData, error: coffeeError } = await supabase
        .from('Coffee')
        .select('coffee_name, image_url')
        .eq('id', item.coffee_id)
        .single(); // Fetch single coffee product by id
        if (coffeeError) {
            console.error('Error fetching Coffee Product:', coffeeError);
            throw coffeeError;
            }
        item.name = coffeeData?.coffee_name || 'Unknown Coffee';
        item.url = coffeeData?.image_url || ''; // Default image URL if not found
    }

    return mappedData; // Return the redeem drink history
  } catch (error) {
    console.error('Failed to get Redeem Drink:', error);
    throw error; // Re-throw the error for further handling
  }
}