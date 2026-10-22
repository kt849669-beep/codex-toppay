const baseUrl = process.env.SUPABASE_URL || 'https://kxsgjfvtfmbruddeolbt.supabase.co';
const anonKey = process.env.SUPABASE_ANON_KEY || 'sb_publishable__asg5eO_X6CrsIp9DXO2bQ_H0Gr5c-j';

export async function supabaseRest(path, options = {}) {
  const response = await fetch(`${baseUrl}/rest/v1/${path}`, {
    ...options,
    cache: 'no-store',
    headers: {
      apikey: anonKey,
      Authorization: `Bearer ${anonKey}`,
      'Content-Type': 'application/json',
      Prefer: options.prefer || 'return=representation',
      ...options.headers,
    },
  });

  const text = await response.text();
  const data = text ? JSON.parse(text) : null;
  if (!response.ok) {
    const error = new Error(data?.message || data?.details || 'Database request failed');
    error.status = response.status;
    throw error;
  }
  return data;
}

export function publicUser(user) {
  if (!user) return null;
  return {
    id: user.id,
    mobile: user.mobile,
    mpin: user.mpin || null,
    status: user.status,
    loginCount: user.login_count || 0,
    createdAt: user.created_at,
  };
}
