import { supabase } from "../../user-app/js/config/supabase.js";
import { logActivity } from "./auth.js";

document.addEventListener("DOMContentLoaded", () => {
  const toggleVideo = document.getElementById("settingToggleVideo");
  const toggleTelegram = document.getElementById("settingToggleTelegram");

  let videoId = null;
  let telegramId = null;

  async function fetchSettings() {
    const { data: vData } = await supabase
      .from("popup_video")
      .select("*")
      .limit(1);
    if (vData && vData.length > 0) {
      videoId = vData[0].id;
      toggleVideo.checked = vData[0].is_enabled;
    }

    const { data: tData } = await supabase
      .from("telegram_popup")
      .select("*")
      .limit(1);
    if (tData && tData.length > 0) {
      telegramId = tData[0].id;
      toggleTelegram.checked = tData[0].is_enabled;
    }
  }

  toggleVideo.addEventListener("change", async (e) => {
    if (videoId) {
      await supabase
        .from("popup_video")
        .update({ is_enabled: e.target.checked })
        .eq("id", videoId);
      logActivity(
        "Settings Updated",
        `Video popup ${e.target.checked ? "enabled" : "disabled"}`,
      );
    }
  });

  toggleTelegram.addEventListener("change", async (e) => {
    if (telegramId) {
      await supabase
        .from("telegram_popup")
        .update({ is_enabled: e.target.checked })
        .eq("id", telegramId);
      logActivity(
        "Settings Updated",
        `Telegram popup ${e.target.checked ? "enabled" : "disabled"}`,
      );
    }
  });

  fetchSettings();
});
