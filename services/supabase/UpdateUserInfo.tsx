import { supabase } from '@/utils/supabase';

export async function updateUserInfo(
    field: string,
    value: string
): Promise<void> {
    try {
        const user_id = await supabase.auth.getUser().then(({ data }) => data.user?.id);
        if (!user_id) {
            throw new Error('User not authenticated');
        }

        const update = {[field]: value
        };

        const { error } = await supabase
            .from('User')
            .update(update)
            .eq('uid', user_id);

        if (error) {
            throw error;
        }
    } catch (error) {
        console.error('Failed to update user information:', error);
        throw error; // Re-throw the error for further handling
    }
}
