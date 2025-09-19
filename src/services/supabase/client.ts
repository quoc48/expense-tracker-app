import { createClient } from '@supabase/supabase-js';
import { Database } from './types';

// Fallback to hardcoded values for React Native since @env might not work in iOS
const supabaseUrl = 'https://ewxplrndtazcxnhiiwfl.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV3eHBscm5kdGF6Y3huaGlpd2ZsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQyMTEyMDcsImV4cCI6MjA2OTc4NzIwN30.TMcG4ZLAe93GL2txBuh-D_wXvfqRMe1oY_7fF8tF2zc';

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