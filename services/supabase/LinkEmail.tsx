import { supabase } from '@/utils/supabase';

export const linkEmail = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.updateUser({ email: email, password: password });
    if (error) {
      throw error;
    }
    console.log('Email linked successfully:', data);
    return data;
  } catch (error) {
    console.error('Error linking email:', error);
    throw error;
  }
}