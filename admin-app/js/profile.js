import { supabase } from "../../user-app/js/config/supabase.js";
import { logActivity } from "./auth.js";

document.addEventListener("DOMContentLoaded", () => {
  const profileName = document.getElementById("profileName");
  const profileEmail = document.getElementById("profileEmail");
  const profileCurrentPassword = document.getElementById("profileCurrentPassword");
  const profileNewPassword = document.getElementById("profileNewPassword");
  const saveProfileBtn = document.getElementById("saveProfileBtn");
  const profileMessage = document.getElementById("profileMessage");
  const profileDisplayName = document.getElementById("profileDisplayName");
  const sessionsTableBody = document.getElementById("sessionsTableBody");

  let adminData = null;

  async function fetchSessions() {
    if (!sessionsTableBody) return;
    try {
      const { data, error } = await supabase.from("admin_sessions").select("*").order("last_active", { ascending: false });
      if (error) throw error;
      
      const currentToken = localStorage.getItem("toppay_admin_session_token");
      sessionsTableBody.innerHTML = "";
      
      if (!data || data.length === 0) {
        sessionsTableBody.innerHTML = '<tr><td colspan="4" style="text-align:center;">No active sessions found</td></tr>';
        return;
      }
      
      data.forEach(session => {
        const isCurrent = session.token === currentToken;
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${session.device_info} ${isCurrent ? '<span style="color:#10b981; font-size:12px; margin-left:8px;">(Current)</span>' : ''}</td>
          <td>${new Date(session.last_active).toLocaleString()}</td>
          <td>${new Date(session.created_at).toLocaleString()}</td>
          <td>
            ${!isCurrent ? `<button class="logout-device-btn admin-btn" data-token="${session.token}" style="background:#ef4444; padding:4px 8px; width:auto; font-size:12px;">Logout Device</button>` : '<span style="color:#6b7280; font-size:12px;">Active</span>'}
          </td>
        `;
        sessionsTableBody.appendChild(tr);
      });
      
      document.querySelectorAll(".logout-device-btn").forEach(btn => {
        btn.addEventListener("click", async (e) => {
          const tokenToLogout = e.target.getAttribute("data-token");
          if (confirm("Are you sure you want to log out this device?")) {
            await supabase.from("admin_sessions").delete().eq("token", tokenToLogout);
            fetchSessions();
          }
        });
      });
    } catch (e) {
      console.error("Error fetching sessions:", e);
    }
  }

  async function fetchProfile() {
    try {
      const { data } = await supabase
        .from("admin_settings")
        .select("*")
        .limit(1);

      if (data && data.length > 0) {
        adminData = data[0];
        profileName.value = adminData.admin_name || "";
        profileEmail.value = adminData.admin_email || "";
        profileDisplayName.textContent = adminData.admin_name || "TopPay Admin";
      } else {
        // No admin settings found, use defaults
        profileName.value = "TopPay Admin";
        profileEmail.value = "admin@toppay.com";
      }
    } catch (e) {
      console.error("Error fetching profile:", e);
    }
  }

  function showMessage(text, type) {
    profileMessage.classList.remove("hidden");
    profileMessage.textContent = text;
    profileMessage.style.background = type === "success" ? "#f0fdf4" : "#fef2f2";
    profileMessage.style.color = type === "success" ? "#16a34a" : "#dc2626";
    profileMessage.style.border = `1px solid ${type === "success" ? "#bbf7d0" : "#fecaca"}`;
    setTimeout(() => {
      profileMessage.classList.add("hidden");
    }, 4000);
  }

  saveProfileBtn.addEventListener("click", async () => {
    const currentPass = profileCurrentPassword.value;

    // Verify current password
    if (!currentPass) {
      showMessage("Please enter your current password to save changes.", "error");
      return;
    }

    // Check against stored password or default
    const storedPassword = adminData ? adminData.admin_password : "admin@0123";
    if (currentPass !== storedPassword) {
      showMessage("Current password is incorrect.", "error");
      return;
    }

    saveProfileBtn.disabled = true;
    saveProfileBtn.textContent = "Saving...";

    try {
      const updateData = {
        admin_name: profileName.value,
        admin_email: profileEmail.value,
        updated_at: new Date().toISOString(),
      };

      // If new password provided, update it
      let newSessionToken = null;
      let deviceInfo = navigator.userAgent;
      if (profileNewPassword.value) {
        if (profileNewPassword.value.length < 4) {
          showMessage("New password must be at least 4 characters.", "error");
          saveProfileBtn.disabled = false;
          saveProfileBtn.textContent = "Save Changes";
          return;
        }
        updateData.admin_password = profileNewPassword.value;
        newSessionToken = crypto.randomUUID();
        
        // Wipe all other sessions from database since password changed
        await supabase.from("admin_sessions").delete().neq("token", "placeholder_to_delete_all"); // delete all rows essentially, we will insert new one
        await supabase.from("admin_sessions").insert({ token: newSessionToken, device_info: deviceInfo });
      }

      if (adminData) {
        await supabase
          .from("admin_settings")
          .update(updateData)
          .eq("id", adminData.id);
      } else {
        await supabase.from("admin_settings").insert(updateData);
      }

      // Update localStorage with new token if password was changed
      if (newSessionToken) {
        localStorage.setItem("toppay_admin_session_token", newSessionToken);
      }
      profileDisplayName.textContent = profileName.value;
      profileCurrentPassword.value = "";
      profileNewPassword.value = "";

      showMessage("Profile updated successfully!", "success");
      logActivity("Profile Updated", `Admin profile updated`);

      // Refresh data
      fetchProfile();
      fetchSessions();
    } catch (e) {
      console.error("Error saving profile:", e);
      showMessage("Failed to save profile. Try again.", "error");
    } finally {
      saveProfileBtn.disabled = false;
      saveProfileBtn.textContent = "Save Changes";
    }
  });

  fetchProfile();
  fetchSessions();
});
