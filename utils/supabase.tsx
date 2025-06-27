import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import { Platform } from 'react-native';
import 'react-native-url-polyfill/auto';

const supabaseUrl = 'https://bwswzuguddiunzmryztd.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ3c3d6dWd1ZGRpdW56bXJ5enRkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA5MjE4MzIsImV4cCI6MjA2NjQ5NzgzMn0.CM8oDUL8T-hOkpJ_1RUMvDYQHWtkxxFJdGKUb-cuKQE';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: Platform.OS === 'web' ? undefined : AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
