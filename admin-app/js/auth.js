// auth.js
import { supabase } from "../../user-app/js/config/supabase.js";

document.addEventListener("DOMContentLoaded", async () => {
  const sessionToken = localStorage.getItem("toppay_admin_session_token");
  if (!sessionToken) {
    window.location.href = "/admin";
    return;
  }

  // Verify token asynchronously
  try {
    const { data, error } = await supabase.from("admin_sessions").select("token").eq("token", sessionToken).limit(1);
    
    if (error) {
      console.error("Auth token verification error (table missing or RLS):", error);
      // Don't logout if the table is just missing to avoid infinite login loops
    } else if (!data || data.length === 0) {
      // Token not found in active sessions
      localStorage.removeItem("toppay_admin_session_token");
      window.location.href = "/admin";
      return;
    } else {
      // Update last_active
      await supabase.from("admin_sessions").update({ last_active: new Date().toISOString() }).eq("token", sessionToken);
    }
  } catch (e) {
    console.error("Auth token verification failed:", e);
  }

  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", async () => {
      await supabase.from("admin_sessions").delete().eq("token", sessionToken);
      localStorage.removeItem("toppay_admin_session_token");
      window.location.href = "/admin";
    });
  }
});

export async function logActivity(action, details) {
  try {
    await supabase.from("activity_logs").insert({
      action,
      details,
    });
  } catch (e) {
    console.error("Failed to log activity:", e);
  }
}
