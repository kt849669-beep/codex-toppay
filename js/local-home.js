document.addEventListener("DOMContentLoaded", () => {
  if (!sessionStorage.getItem("codex_toppay_local")) {
    window.location.replace("./index.html");
    return;
  }

  const slider = document.getElementById("sliderContainer");
  const dots = document.getElementById("sliderDots");
  const promo = document.createElement("div");
  promo.className = "slide image-promo active";
  promo.setAttribute("role", "img");
  promo.setAttribute("aria-label", "New game section on the platform");
  promo.style.backgroundImage = "url('./public/hero-slots.jpeg')";
  slider.insertBefore(promo, dots);

  const dot = document.createElement("div");
  dot.className = "dot active";
  dots.appendChild(dot);

  if (window.lucide) window.lucide.createIcons();
});
