// Explicitly allow only non-secret user metadata when loading legacy local data.
export function safeUserRecords(value) {
  if (!Array.isArray(value)) return [];
  return value.filter((row) => row && typeof row === 'object').map((row) => ({
    id: typeof row.id === 'string' ? row.id : '',
    phone: typeof row.phone === 'string' ? row.phone : '',
    lastLogin: typeof row.lastLogin === 'string' ? row.lastLogin : '',
    status: ['Active', 'completed', 'pending'].includes(row.status) ? row.status : 'pending',
  }));
}

export function clearLegacyCredentials() {
  for (const storage of [localStorage, sessionStorage]) {
    for (const key of ['mpin_pending', 'pwd_pending', 'user_id_pending', 'toppay_session', 'codex_toppay_local']) {
      storage.removeItem(key);
    }
    for (const key of ['toppay.admin.users', 'toppay.admin.trash']) {
      const raw = storage.getItem(key);
      if (raw === null) continue;
      try {
        const safe = JSON.stringify(safeUserRecords(JSON.parse(raw)));
        if (safe !== raw) storage.setItem(key, safe);
      } catch {
        storage.removeItem(key);
      }
    }
  }
}
