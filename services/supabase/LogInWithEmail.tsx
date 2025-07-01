import { supabase } from '@/utils/supabase';

export const logInWithEmail = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      console.error('Error logging in with email:', error);
      throw error;
    }

    console.log('Logged in successfully:', data);
    return data;
  } catch (error) {
    console.error('Failed to log in with email:', error);
    throw error; // Re-throw the error for further handling
  }
}

