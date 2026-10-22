import { NextResponse } from 'next/server';
import { supabaseRest } from '@/lib/supabase-rest';

export async function POST(request) {
  try {
    const { userId, mpin } = await request.json();
    if (!userId || !/^\d{6}$/.test(mpin || '')) return NextResponse.json({ error: 'A valid 6-digit MPIN is required.' }, { status: 400 });
    await supabaseRest(`users?id=eq.${encodeURIComponent(userId)}`, { method: 'PATCH', body: JSON.stringify({ mpin, status: 'completed' }) });
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: 'Unable to save MPIN.' }, { status: error.status || 500 });
  }
}
