document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  const mobile = document.getElementById("mobile");
  const password = document.getElementById("password");
  const error = document.getElementById("errorMessage");
  const overlay = document.getElementById("mpinOverlay");
  const digitBoxes = [...document.querySelectorAll(".mpin-digit")];
  let mpin = "";

  mobile.addEventListener("input", () => {
    mobile.value = mobile.value.replace(/\D/g, "");
  });

  form.addEventListener("submit", (event) => {
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
    overlay.classList.add("open");
    overlay.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  });

  document.querySelectorAll("[data-key]").forEach((button) => {
    button.addEventListener("click", () => {
      if (mpin.length >= 6) return;
      mpin += button.dataset.key;
      renderMpin();

      if (mpin.length === 6) {
        sessionStorage.setItem("codex_toppay_local", JSON.stringify({ mobile: mobile.value }));
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

  document.querySelector('[data-action="clear"]').addEventListener("click", () => {
    mpin = "";
    renderMpin();
  });

  document.getElementById("mpinCancel").addEventListener("click", closeMpin);

  function closeMpin() {
    mpin = "";
    renderMpin();
    overlay.classList.remove("open");
    overlay.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

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
