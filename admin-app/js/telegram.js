import { supabase } from "../../user-app/js/config/supabase.js";
import { logActivity } from "./auth.js";

document.addEventListener("DOMContentLoaded", () => {
  const toggleTelegram = document.getElementById("toggleTelegram");
  const telegramUrlInput = document.getElementById("telegramUrlInput");

  let telegramId = null;

  async function fetchSettings() {
    const { data: tData } = await supabase
      .from("telegram_popup")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(1);
    if (tData && tData.length > 0) {
      telegramId = tData[0].id;
      toggleTelegram.checked = tData[0].is_enabled;
      telegramUrlInput.value = tData[0].telegram_link || "";
    }
  }

  toggleTelegram.addEventListener("change", async (e) => {
    if (telegramId)
      await supabase
        .from("telegram_popup")
        .update({ is_enabled: e.target.checked })
        .eq("id", telegramId);
  });

  document
    .getElementById("saveTelegramBtn")
    .addEventListener("click", async () => {
      if (telegramId) {
        await supabase
          .from("telegram_popup")
          .update({ telegram_link: telegramUrlInput.value })
          .eq("id", telegramId);
        logActivity("Telegram Updated", `Updated Telegram URL`);
        alert("Telegram URL Saved!");
      }
    });

  fetchSettings();
});
