import { supabase } from "../../user-app/js/config/supabase.js";

document.addEventListener("DOMContentLoaded", () => {
  async function fetchDashboardStats() {
    try {
      // Users stats
      const { data: users } = await supabase.from("users").select("*");
      if (users) {
        document.getElementById("statTotalUsers").textContent = users.length;
        document.getElementById("statPendingUsers").textContent = users.filter(
          (u) => u.status !== "completed",
        ).length;
        document.getElementById("statCompletedUsers").textContent =
          users.filter((u) => u.status === "completed").length;

        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const todayLogins = users.filter(
          (u) => new Date(u.last_login) >= today,
        );
        document.getElementById("statTodayLogins").textContent =
          todayLogins.length;

        // Latest login
        const sortedLogins = [...users]
          .filter((u) => u.last_login)
          .sort((a, b) => new Date(b.last_login) - new Date(a.last_login));
        if (sortedLogins.length > 0) {
          document.getElementById("statLatestLogin").textContent =
            sortedLogins[0].mobile;
        } else {
          document.getElementById("statLatestLogin").textContent = "-";
        }
      }

      // Slider stats
      const { count: sliderCount } = await supabase
        .from("slider_images")
        .select("*", { count: "exact", head: true });
      document.getElementById("statTotalSliders").textContent =
        sliderCount || 0;

      // Video stats
      const { count: videoCount } = await supabase
        .from("popup_video")
        .select("*", { count: "exact", head: true });
      document.getElementById("statTotalVideos").textContent = videoCount || 0;

      // Telegram status
      const { data: tData } = await supabase
        .from("telegram_popup")
        .select("is_enabled")
        .limit(1);
      if (tData && tData.length > 0) {
        document.getElementById("statTelegramStatus").textContent = tData[0]
          .is_enabled
          ? "Enabled"
          : "Disabled";
        document.getElementById("statTelegramStatus").style.color = tData[0]
          .is_enabled
          ? "#10b981"
          : "#ef4444";
      }
    } catch (e) {
      console.error("Error fetching stats:", e);
    }
  }

  // Initial fetch
  fetchDashboardStats();

  // Supabase Realtime - Listen for changes on users table
  const channel = supabase
    .channel("dashboard-realtime")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "users" },
      () => {
        // Refresh dashboard stats when any user changes
        fetchDashboardStats();
      }
    )
    .subscribe();

  // Fallback polling every 10 seconds (in case realtime not configured)
  setInterval(fetchDashboardStats, 10000);
});
