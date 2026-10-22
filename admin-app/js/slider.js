import { supabase } from "../../user-app/js/config/supabase.js";
import { logActivity } from "./auth.js";

document.addEventListener("DOMContentLoaded", () => {
  const slidesGrid = document.getElementById("slidesGrid");
  const addSlideBtn = document.getElementById("addSlideBtn");
  const newSlideFile = document.getElementById("newSlideFile");
  const slideUploadProgress = document.getElementById("slideUploadProgress");

  async function fetchSlides() {
    const { data: slides } = await supabase
      .from("slider_images")
      .select("*")
      .order("display_order", { ascending: true });

    slidesGrid.innerHTML = "";
    if (slides) {
      slides.forEach((slide) => {
        const div = document.createElement("div");
        div.className = "slide-item";
        div.innerHTML = `
                    <img src="${slide.image_url}" alt="${slide.title}">
                    <button class="delete-slide admin-btn" data-id="${slide.id}" style="width:100%; background:#ef4444; margin-top:10px;">Delete</button>
                `;
        slidesGrid.appendChild(div);
      });

      document.querySelectorAll(".delete-slide").forEach((btn) => {
        btn.addEventListener("click", async (e) => {
          const button = e.currentTarget;
          
          if (button.textContent === "Delete") {
            button.textContent = "Click to Confirm";
            button.style.background = "#b91c1c"; // Darker red
            
            // Reset after 3 seconds if not clicked again
            setTimeout(() => {
              if (button) {
                button.textContent = "Delete";
                button.style.background = "#ef4444";
              }
            }, 3000);
            return;
          }

          const id = button.getAttribute("data-id");
          if (!id) {
            alert("Error: Slide ID not found.");
            return;
          }
          
          button.textContent = "Deleting...";
          button.disabled = true;
          
          const { error } = await supabase.from("slider_images").delete().eq("id", id);
          if (error) {
            alert("Failed to delete slide: " + error.message);
            console.error(error);
            button.textContent = "Delete";
            button.disabled = false;
            return;
          }
          fetchSlides();
          logActivity("Slide Deleted", `Deleted slide ID: ${id}`);
        });
      });
    }
  }

  addSlideBtn.addEventListener("click", async () => {
    const file = newSlideFile.files[0];
    if (!file) {
      alert("Please select an image file first.");
      return;
    }

    slideUploadProgress.classList.remove("hidden");
    addSlideBtn.disabled = true;

    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("slider_images")
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: publicUrlData } = supabase.storage
        .from("slider_images")
        .getPublicUrl(fileName);

      const publicUrl = publicUrlData.publicUrl;

      await supabase.from("slider_images").insert({
        image_url: publicUrl,
        title: "Uploaded Slide",
        display_order: 99,
        is_enabled: true,
      });
      newSlideFile.value = "";
      fetchSlides();
      logActivity("Slide Uploaded", `Uploaded new slide image`);
      alert("Slide uploaded successfully!");
    } catch (err) {
      console.error("Upload error:", err);
      alert("Failed to upload slide: " + err.message);
    } finally {
      slideUploadProgress.classList.add("hidden");
      addSlideBtn.disabled = false;
    }
  });

  fetchSlides();
});
