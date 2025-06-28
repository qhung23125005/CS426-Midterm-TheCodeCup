import { supabase } from '@/utils/supabase';

export async function updateUserInfo(
    field: 'Full name' | 'Phone number' | 'Email' | 'Address',
    value: string
): Promise<void> {
    try {
        const user_id = await supabase.auth.getUser().then(({ data }) => data.user?.id);
        if (!user_id) {
            throw new Error('User not authenticated');
        }

        const updates: Record<string, any> = {};
        switch (field) {
            case 'Full name':
                updates.username = value;
                break;
            case 'Phone number':
                updates.phone_number = value;
                break;
            case 'Email':
                updates.email = value;
                break;
            case 'Address':
                updates.address = value;
                break;
            default:
                throw new Error('Invalid field');
        }

        const { error } = await supabase
            .from('User')
            .update(updates)
            .eq('uid', user_id);

        if (error) {
            throw error;
        }
    } catch (error) {
        console.error('Failed to update user information:', error);
        throw error; // Re-throw the error for further handling
    }
}
