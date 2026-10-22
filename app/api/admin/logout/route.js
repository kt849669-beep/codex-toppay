import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { supabaseRest } from '@/lib/supabase-rest';
export async function POST(){const jar=await cookies();const token=jar.get('toppay_admin_session')?.value;if(token)await supabaseRest(`admin_sessions?token=eq.${encodeURIComponent(token)}`,{method:'DELETE',prefer:'return=minimal'}).catch(()=>null);const response=NextResponse.json({ok:true});response.cookies.set('toppay_admin_session','',{path:'/',maxAge:0});return response;}
