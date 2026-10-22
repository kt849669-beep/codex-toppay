import { supabase } from "../../user-app/js/config/supabase.js";

document.addEventListener("DOMContentLoaded", () => {
  const logsTableBody = document.getElementById("logsTableBody");
  async function fetchLogs() {
    try {
      const { data: logs } = await supabase
        .from("activity_logs")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(50);
      logsTableBody.innerHTML = "";
      if (!logs || logs.length === 0) {
        logsTableBody.innerHTML =
          '<tr><td colspan="3" style="text-align:center;">No activity logs found</td></tr>';
        return;
      }
      logs.forEach((log) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
                  <td>${new Date(log.created_at).toLocaleString()}</td>
                  <td style="font-weight: 600;">${log.action}</td>
                  <td style="color: #666;">${log.details || "-"}</td>
              `;
        logsTableBody.appendChild(tr);
      });
    } catch (e) {
      console.error(e);
    }
  }

  document
    .getElementById("refreshLogsBtn")
    .addEventListener("click", fetchLogs);
  fetchLogs();
});
