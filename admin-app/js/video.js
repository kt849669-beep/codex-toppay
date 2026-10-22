import { supabase } from "../../user-app/js/config/supabase.js";
import { logActivity } from "./auth.js";

document.addEventListener("DOMContentLoaded", () => {
  const toggleVideo = document.getElementById("toggleVideo");
  const videoFileInput = document.getElementById("videoFileInput");
  const uploadVideoBtn = document.getElementById("uploadVideoBtn");
  const videoUploadProgress = document.getElementById("videoUploadProgress");
  const currentVideoLink = document.getElementById("currentVideoLink");

  let videoId = null;

  async function fetchSettings() {
    const { data: vData } = await supabase.from("popup_video").select("*");
    if (vData && vData.length > 0) {
      videoId = vData[0].id;
      toggleVideo.checked = vData[0].is_enabled;
      if (vData[0].video_url) {
        currentVideoLink.href = vData[0].video_url;
        currentVideoLink.textContent = vData[0].video_url;
      }
    }
  }

  toggleVideo.addEventListener("change", async (e) => {
    if (videoId)
      await supabase
        .from("popup_video")
        .update({ is_enabled: e.target.checked })
        .eq("id", videoId);
  });

  uploadVideoBtn.addEventListener("click", async () => {
    const file = videoFileInput.files[0];
    if (!file) {
      alert("Please select a video file first.");
      return;
    }

    videoUploadProgress.classList.remove("hidden");
    uploadVideoBtn.disabled = true;

    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("popup_video")
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: publicUrlData } = supabase.storage
        .from("popup_video")
        .getPublicUrl(fileName);

      const publicUrl = publicUrlData.publicUrl;

      if (videoId) {
        await supabase
          .from("popup_video")
          .update({ video_url: publicUrl })
          .eq("id", videoId);
      } else {
        const { data } = await supabase
          .from("popup_video")
          .insert({
            video_url: publicUrl,
            title: "Uploaded Video",
            is_enabled: true,
          })
          .select();
        if (data && data.length > 0) videoId = data[0].id;
      }

      currentVideoLink.href = publicUrl;
      currentVideoLink.textContent = publicUrl;
      videoFileInput.value = "";
      logActivity("Video Uploaded", `Uploaded new video popup`);
      alert("Video uploaded successfully!");
    } catch (err) {
      console.error("Upload error:", err);
      alert("Failed to upload video: " + err.message);
    } finally {
      videoUploadProgress.classList.add("hidden");
      uploadVideoBtn.disabled = false;
    }
  });

  fetchSettings();
});
