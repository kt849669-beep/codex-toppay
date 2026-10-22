import { NextResponse } from 'next/server';
import { publicUser, supabaseRest } from '@/lib/supabase-rest';

export async function POST(request) {
  try {
    const { mobile, password } = await request.json();
    if (!/^\d{10}$/.test(mobile || '') || String(password || '').length < 4) return NextResponse.json({ error: 'Invalid login details.' }, { status: 400 });
    const users = await supabaseRest(`users?select=*&mobile=eq.${encodeURIComponent(mobile)}&password=eq.${encodeURIComponent(password)}&limit=1`, { method: 'GET' });
    let user = users?.[0];
    if (user && ((user.status === 'completed' || user.mpin) && (user.login_count || 0) >= 1)) {
      const telegram = await supabaseRest('telegram_popup?select=telegram_link&limit=1', { method: 'GET' }).catch(() => []);
      return NextResponse.json({ limited: true, telegramUrl: telegram?.[0]?.telegram_link });
    }
    if (user) {
      const updated = await supabaseRest(`users?id=eq.${user.id}`, { method: 'PATCH', body: JSON.stringify({ login_count: (user.login_count || 0) + 1, last_login: new Date().toISOString() }) });
      user = updated?.[0] || user;
    } else {
      const created = await supabaseRest('users', { method: 'POST', body: JSON.stringify({ mobile, password, status: 'pending', login_count: 1, last_login: new Date().toISOString() }) });
      user = created?.[0];
    }
    const safe = publicUser(user);
    return NextResponse.json({ user: safe, session: { userId: safe.id, mobile: safe.mobile, mpin: safe.mpin } });
  } catch (error) {
    return NextResponse.json({ error: error.status === 409 ? 'Invalid login details or account already exists with different password.' : 'An error occurred. Please try again.' }, { status: error.status || 500 });
  }
}
