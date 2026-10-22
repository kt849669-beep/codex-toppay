import { NextResponse } from 'next/server';
import { supabaseRest } from '@/lib/supabase-rest';

export async function GET() {
  const [slides, video, telegram] = await Promise.all([
    supabaseRest('slider_images?select=*&is_enabled=eq.true&order=display_order.asc', { method: 'GET' }).catch(() => []),
    supabaseRest('popup_video?select=*&is_enabled=eq.true&limit=1', { method: 'GET' }).catch(() => []),
    supabaseRest('telegram_popup?select=*&is_enabled=eq.true&order=created_at.desc&limit=1', { method: 'GET' }).catch(() => []),
  ]);
  return NextResponse.json({ slides, video: video?.[0] || null, telegram: telegram?.[0] || null });
}
