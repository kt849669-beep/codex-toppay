document.addEventListener("DOMContentLoaded", () => {
  const sessionKey = "codex_toppay_local";
  const savedSession = sessionStorage.getItem(sessionKey);
  const clearSession = () => {
    sessionStorage.removeItem(sessionKey);
    sessionStorage.removeItem("mpin_pending");
  };
  const logout = () => {
    clearSession();
    window.location.replace("/");
  };
  if (!savedSession || performance.getEntriesByType("navigation")[0]?.type === "reload") {
    logout();
    return;
  }

  window.history.replaceState(null, "", "/");
  window.addEventListener("pagehide", clearSession);
  window.addEventListener("pageshow", (event) => {
    if (event.persisted) logout();
  });

  // Preserve the existing automatic sign-out.
  setTimeout(logout, 10000);

  const slider = document.getElementById("sliderContainer");
  const floatBtn = document.getElementById("floatingSupport");
  const panels = {
    home: document.getElementById("homeSection"),
    me: document.getElementById("profileSection"),
    deposit: document.getElementById("depositSection")
  };
  try {
    const user = JSON.parse(savedSession);
    document.getElementById("profileUserId").textContent = user.id || user.mobile || "—";
  } catch {}

  document.getElementById("logoutBtn").addEventListener("click", logout);
  const navItems = document.querySelectorAll(".bottom-nav .nav-item");
  navItems.forEach((item) => {
    item.addEventListener("click", (event) => {
      event.preventDefault();
      const selected = item.dataset.screen;
      const page = panels[selected] ? selected : "home";
      Object.entries(panels).forEach(([name, panel]) => { panel.hidden = name !== page; });
      floatBtn.hidden = page === "deposit";
      navItems.forEach((nav) => {
        const active = nav === item;
        nav.classList.toggle("active", active);
        if (active) nav.setAttribute("aria-current", "page");
        else nav.removeAttribute("aria-current");
      });
      window.scrollTo({ top: 0, behavior: "instant" });
    });
  });

  let bannerOverlayElement = null;

  function renderSettings() {
    let settings = null;
    try {
      const s = localStorage.getItem("toppay.admin-app.settings.v1");
      if (s) settings = JSON.parse(s);
    } catch(e) {}

    // Render Slider
    if (settings && settings.slides && settings.slides.length > 0) {
      slider.dataset.defaultSlide = "false";
      slider.innerHTML = '';
      const newDots = document.createElement("div");
      newDots.id = "sliderDots";
      newDots.className = "slider-dots";
      slider.appendChild(newDots);
      
      settings.slides.forEach((slide, idx) => {
        const el = document.createElement("div");
        el.className = "slide image-promo" + (idx === 0 ? " active" : "");
        el.style.backgroundImage = `url('${slide.src}')`;
        slider.insertBefore(el, newDots);
        
        const dot = document.createElement("div");
        dot.className = "dot" + (idx === 0 ? " active" : "");
        newDots.appendChild(dot);
      });
    } else {
      slider.dataset.defaultSlide = "true";
      slider.innerHTML = '';
      const newDots = document.createElement("div");
      newDots.id = "sliderDots";
      newDots.className = "slider-dots";
      slider.appendChild(newDots);
      
      const promo = document.createElement("div");
      promo.className = "slide image-promo active";
      promo.setAttribute("role", "img");
      promo.style.backgroundImage = "url('/hero-slots.jpeg')";
      slider.insertBefore(promo, newDots);
      const dot = document.createElement("div");
      dot.className = "dot active";
      newDots.appendChild(dot);
    }

    // Handle Popups
    if (settings) {
      const overlay = document.getElementById("overlay");
      
      // Telegram popup
      const tel = document.getElementById("telegramPopup");
      const btn = document.getElementById("telegramJoinBtn");
      if (tel && btn) {
        if (settings.telegram && settings.telegram.enabled) {
          btn.href = settings.telegram.url || '#';
          overlay.classList.remove("hidden");
          tel.classList.remove("hidden");
          document.getElementById("telegramCloseBtn").onclick = () => {
            tel.classList.add("hidden");
            if(Array.from(overlay.children).every(c => c.classList.contains("hidden"))) overlay.classList.add("hidden");
          };
        } else {
          tel.classList.add("hidden");
          if(Array.from(overlay.children).every(c => c.classList.contains("hidden"))) overlay.classList.add("hidden");
        }
      }

      // Banner popup
      if (bannerOverlayElement) {
        bannerOverlayElement.remove();
        bannerOverlayElement = null;
      }
      
      if (settings.banner && settings.banner.enabled && settings.banner.src) {
        bannerOverlayElement = document.createElement("div");
        bannerOverlayElement.style = "position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.8);z-index:9999;display:flex;align-items:center;justify-content:center;padding:20px;";
        bannerOverlayElement.innerHTML = `<div style="position:relative;max-width:400px;width:100%;"><span onclick="this.parentElement.parentElement.remove()" style="position:absolute;top:-15px;right:-15px;background:#fff;color:#000;width:30px;height:30px;border-radius:50%;text-align:center;line-height:30px;cursor:pointer;font-weight:bold;z-index:10000;box-shadow:0 2px 4px rgba(0,0,0,0.2);">X</span><img src="${settings.banner.src}" style="width:100%;border-radius:12px;display:block;"/></div>`;
        document.body.appendChild(bannerOverlayElement);
      }
    }
  }

  // Initial render
  renderSettings();

  // Real-time sync across tabs
  window.addEventListener('storage', (e) => {
    if (e.key === 'toppay.admin-app.settings.v1') {
      renderSettings();
    }
  });

  if (window.lucide) window.lucide.createIcons();
});
