import { supabase } from '@/utils/supabase';

export async function signInAnonymously(): Promise<string> {
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    // If no session exists, sign in anonymously
    if (!session) {
      const { data, error } = await supabase.auth.signInAnonymously();
    
      if (error) {
        console.error('Error signing in anonymously:', error);
        throw error;
      }
    }

    // Always get the current user (async)
    const {
      data: { user },
    } = await supabase.auth.getUser();

    return user?.id || 'Anonymous';
  } catch (error) {
    console.error('Anonymous sign-in failed:', error);
    return 'Anonymous';
  }
}
