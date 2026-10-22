// user-app/js/config/supabase.js
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.39.3/+esm";

const SUPABASE_URL = "https://kxsgjfvtfmbruddeolbt.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable__asg5eO_X6CrsIp9DXO2bQ_H0Gr5c-j";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
