import 'server-only';
import { createClient } from '@supabase/supabase-js';

// Server-only. SUPABASE_URL / SUPABASE_ANON_KEY have no NEXT_PUBLIC_ prefix,
// so they are never bundled into browser code. The anon key is all we need:
// the leads table is protected by RLS and only reachable through submit_lead().
export function getSupabase() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY;
  if (!url || !key) throw new Error('Supabase environment variables are not configured');

  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
