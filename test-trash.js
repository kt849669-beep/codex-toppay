import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function test() {
  const { data, error } = await supabase.from("trash").insert({
    original_table: "users",
    record_data: { id: "123", mobile: "1234567890" }
  });
  console.log("Result:", data, "Error:", error);
}
test();
