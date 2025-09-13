import { createClient } from '@supabase/supabase-js';
import { Database } from './types';

// Environment variables for both React Native and Web
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || process.env.SUPABASE_URL || '';
// Use service_role for development since anon key has permission issues
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.REACT_APP_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase environment variables');
  console.log('Looking for:', {
    url: 'REACT_APP_SUPABASE_URL or SUPABASE_URL',
    key: 'SUPABASE_SERVICE_ROLE_KEY or SUPABASE_ANON_KEY'
  });
  throw new Error('Missing required Supabase environment variables');
} else {
  console.log('✅ Supabase environment variables found');
  console.log('🔑 Using service_role key for development');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

// Enhanced test connection function with detailed debugging
export const testConnection = async () => {
  try {
    console.log('🔄 Testing Supabase connection...');
    console.log('URL:', supabaseUrl);
    console.log('Key (first 20 chars):', supabaseKey?.substring(0, 20) + '...');

    // Test with expense count to verify actual database access
    const { count, error } = await supabase
      .from('expenses')
      .select('*', { count: 'exact', head: true });

    if (error) {
      console.error('❌ Supabase connection failed:', error);
      throw error;
    }

    console.log(`✅ Supabase connection successful! Found ${count} expense records`);
    return { success: true, count };
  } catch (error) {
    console.error('❌ Supabase connection failed:', error);
    return { success: false, error };
  }
};