import { supabase } from '@/utils/supabase';

export async function removeRedeemDrink(redeem_id: string) {
    try {
        const { data, error } = await supabase
        .from('RedeemCoffee')
        .delete()
        .eq('id', redeem_id)
    
        if (error) {
        console.error('Error removing redeem drink:', error);
        throw error;
        }
    
        return data; // Return the removed redeem drink object
    } catch (error) {
        console.error('Failed to remove redeem drink:', error);
        throw error; // Re-throw the error for further handling
    }
}