import { createClient } from '@supabase/supabase-js';

// Configuración de Supabase - Cliente directo
const supabaseUrl = 'https://xtzwrzlwodswvuyoufgt.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh0endyemx3b2Rzd3Z1eW91Zmd0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA4OTM2MzIsImV4cCI6MjA3NjQ2OTYzMn0.VCMC9Y7qt6xAqc2kqm9l1zZbqDeNCPycxtc_argv6s8';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
