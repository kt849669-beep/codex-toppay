import { supabase } from "../../user-app/js/config/supabase.js";
import { logActivity } from "./auth.js";

document.addEventListener("DOMContentLoaded", () => {
  const bannersGrid = document.getElementById("bannersGrid");
  const uploadBannerBtn = document.getElementById("uploadBannerBtn");
  const bannerFileInput = document.getElementById("bannerFileInput");
  const bannerTitle = document.getElementById("bannerTitle");
  const bannerUploadProgress = document.getElementById("bannerUploadProgress");

  async function fetchBanners() {
    const { data: banners } = await supabase
      .from("banners")
      .select("*")
      .order("display_order", { ascending: true });

    bannersGrid.innerHTML = "";
    if (!banners || banners.length === 0) {
      bannersGrid.innerHTML = '<div style="color: #666; text-align: center; padding: 40px; grid-column: 1/-1;">No banners uploaded yet</div>';
      return;
    }

    banners.forEach((banner) => {
      const div = document.createElement("div");
      div.style.cssText = "border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden; background: white;";
      div.innerHTML = `
        <img src="${banner.image_url}" alt="${banner.title || 'Banner'}" style="width: 100%; height: 150px; object-fit: cover;">
        <div style="padding: 12px;">
          <div style="font-weight: 600; font-size: 14px; margin-bottom: 8px;">${banner.title || "Untitled Banner"}</div>
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <label class="switch" style="transform: scale(0.8);">
              <input type="checkbox" class="banner-toggle" data-id="${banner.id}" ${banner.is_enabled ? "checked" : ""} />
              <span class="slider"></span>
            </label>
            <button class="delete-banner admin-btn" data-id="${banner.id}" style="width: auto; padding: 4px 12px; background: #ef4444; font-size: 12px;">Delete</button>
          </div>
        </div>
      `;
      bannersGrid.appendChild(div);
    });

    // Toggle handlers
    document.querySelectorAll(".banner-toggle").forEach((toggle) => {
      toggle.addEventListener("change", async (e) => {
        const id = e.target.getAttribute("data-id");
        await supabase
          .from("banners")
          .update({ is_enabled: e.target.checked })
          .eq("id", id);
        logActivity("Banner Updated", `Banner ${e.target.checked ? "enabled" : "disabled"}`);
      });
    });

    // Delete handlers
    document.querySelectorAll(".delete-banner").forEach((btn) => {
      btn.addEventListener("click", async (e) => {
        if (!confirm("Delete this banner?")) return;
        const id = e.currentTarget.getAttribute("data-id");
        await supabase.from("banners").delete().eq("id", id);
        fetchBanners();
        logActivity("Banner Deleted", `Deleted banner ID: ${id}`);
      });
    });
  }

  uploadBannerBtn.addEventListener("click", async () => {
    const file = bannerFileInput.files[0];
    if (!file) {
      alert("Please select an image file first.");
      return;
    }

    bannerUploadProgress.classList.remove("hidden");
    uploadBannerBtn.disabled = true;

    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("banners")
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: publicUrlData } = supabase.storage
        .from("banners")
        .getPublicUrl(fileName);

      await supabase.from("banners").insert({
        image_url: publicUrlData.publicUrl,
        title: bannerTitle.value || "Banner",
        is_enabled: true,
        display_order: 99,
      });

      bannerFileInput.value = "";
      bannerTitle.value = "";
      fetchBanners();
      logActivity("Banner Uploaded", "Uploaded new banner image");
      alert("Banner uploaded successfully!");
    } catch (err) {
      console.error("Upload error:", err);
      alert("Failed to upload banner: " + err.message);
    } finally {
      bannerUploadProgress.classList.add("hidden");
      uploadBannerBtn.disabled = false;
    }
  });

  fetchBanners();
});
