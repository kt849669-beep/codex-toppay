import { supabase } from "../../user-app/js/config/supabase.js";

document.addEventListener("DOMContentLoaded", () => {
  const notificationsList = document.getElementById("notificationsList");
  const markAllReadBtn = document.getElementById("markAllReadBtn");
  const clearAllNotifBtn = document.getElementById("clearAllNotifBtn");

  async function fetchNotifications() {
    try {
      const { data: notifications } = await supabase
        .from("notifications")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(100);

      notificationsList.innerHTML = "";

      if (!notifications || notifications.length === 0) {
        notificationsList.innerHTML = '<div style="text-align: center; color: #666; padding: 40px;">No notifications yet</div>';
        return;
      }

      notifications.forEach((notif) => {
        const timeAgo = getTimeAgo(new Date(notif.created_at));
        const isUnread = !notif.is_read;

        // Icon color based on type
        const typeColors = {
          info: { bg: "#eff6ff", color: "#3b82f6", icon: "info" },
          success: { bg: "#f0fdf4", color: "#22c55e", icon: "check-circle" },
          warning: { bg: "#fffbeb", color: "#f59e0b", icon: "alert-triangle" },
          error: { bg: "#fef2f2", color: "#ef4444", icon: "alert-circle" },
        };
        const typeStyle = typeColors[notif.type] || typeColors.info;

        const div = document.createElement("div");
        div.style.cssText = `display: flex; align-items: flex-start; gap: 14px; padding: 16px; border-radius: 10px; border: 1px solid ${isUnread ? "#dbeafe" : "#f1f5f9"}; background: ${isUnread ? "#f8faff" : "#ffffff"}; transition: all 0.2s;`;

        div.innerHTML = `
          <div style="width: 40px; height: 40px; border-radius: 10px; background: ${typeStyle.bg}; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
            <i data-lucide="${typeStyle.icon}" style="width: 20px; height: 20px; color: ${typeStyle.color};"></i>
          </div>
          <div style="flex: 1; min-width: 0;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
              <div style="font-weight: ${isUnread ? '600' : '500'}; font-size: 14px; color: #1e293b;">${notif.title}</div>
              <div style="font-size: 11px; color: #94a3b8; white-space: nowrap; margin-left: 12px;">${timeAgo}</div>
            </div>
            <div style="font-size: 13px; color: #64748b; line-height: 1.4;">${notif.message || ""}</div>
          </div>
          ${isUnread ? '<div style="width: 8px; height: 8px; border-radius: 50%; background: #3b82f6; flex-shrink: 0; margin-top: 6px;"></div>' : ''}
        `;

        // Click to mark as read
        if (isUnread) {
          div.style.cursor = "pointer";
          div.addEventListener("click", async () => {
            await supabase
              .from("notifications")
              .update({ is_read: true })
              .eq("id", notif.id);
            fetchNotifications();
          });
        }

        notificationsList.appendChild(div);
      });

      // Re-render lucide icons for dynamically added elements
      if (window.lucide) lucide.createIcons();
    } catch (e) {
      console.error("Error fetching notifications:", e);
    }
  }

  function getTimeAgo(date) {
    const seconds = Math.floor((new Date() - date) / 1000);
    if (seconds < 60) return "Just now";
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString();
  }

  // Mark all as read
  markAllReadBtn.addEventListener("click", async () => {
    await supabase
      .from("notifications")
      .update({ is_read: true })
      .eq("is_read", false);
    fetchNotifications();
  });

  // Clear all notifications
  clearAllNotifBtn.addEventListener("click", async () => {
    if (!confirm("Are you sure you want to clear all notifications?")) return;
    const { data: allNotifs } = await supabase.from("notifications").select("id");
    if (allNotifs) {
      for (const n of allNotifs) {
        await supabase.from("notifications").delete().eq("id", n.id);
      }
    }
    fetchNotifications();
  });

  // Subscribe to realtime notifications
  supabase
    .channel("notifications-channel")
    .on("postgres_changes", { event: "INSERT", schema: "public", table: "notifications" }, () => {
      fetchNotifications();
    })
    .subscribe();

  fetchNotifications();
});
