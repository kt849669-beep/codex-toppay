import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin-auth';
import { supabaseRest } from '@/lib/supabase-rest';

const resources = {
  sliders: 'slider_images', banners: 'banners', notifications: 'notifications',
  video: 'popup_video', telegram: 'telegram_popup', settings: 'admin_settings',
};

function cleanBody(resource, body) {
  const allowed = {
    sliders: ['image_url','title','display_order','is_enabled'], banners: ['image_url','title','link','display_order','is_enabled'],
    notifications: ['title','message','type','is_read'], video: ['video_url','title','is_enabled'],
    telegram: ['telegram_link','title','description','image_url','is_enabled'], settings: ['admin_email','admin_name'],
  }[resource] || [];
  return Object.fromEntries(Object.entries(body || {}).filter(([key]) => allowed.includes(key)));
}

export async function POST(request) {
  if (!await requireAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { resource, id, values } = await request.json(); const table = resources[resource]; if (!table) return NextResponse.json({ error: 'Unsupported resource' }, { status: 400 });
  const payload = cleanBody(resource, values); if (!Object.keys(payload).length) return NextResponse.json({ error: 'No valid fields' }, { status: 400 });
  const data = id ? await supabaseRest(`${table}?id=eq.${encodeURIComponent(id)}`, { method: 'PATCH', body: JSON.stringify(payload) }) : await supabaseRest(table, { method: 'POST', body: JSON.stringify(payload) });
  await supabaseRest('activity_logs', { method: 'POST', body: JSON.stringify({ action: id ? `Updated ${resource}` : `Created ${resource}`, details: id || payload.title || '' }) }).catch(() => null);
  return NextResponse.json({ data });
}

export async function DELETE(request) {
  if (!await requireAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { resource, id } = await request.json(); const table = resources[resource]; if (!table || !id) return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  await supabaseRest(`${table}?id=eq.${encodeURIComponent(id)}`, { method: 'DELETE', prefer: 'return=minimal' });
  await supabaseRest('activity_logs', { method: 'POST', body: JSON.stringify({ action: `Deleted ${resource}`, details: id }) }).catch(() => null);
  return NextResponse.json({ ok: true });
}
