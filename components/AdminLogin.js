'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
export default function AdminLogin() {
  const router = useRouter(); const [email,setEmail]=useState(''); const [password,setPassword]=useState(''); const [error,setError]=useState('');
  async function submit(e){e.preventDefault();setError('');const r=await fetch('/api/admin/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email,password})});const d=await r.json();if(!r.ok)return setError(d.error||'Invalid credentials');router.push('/admin/dashboard');}
  return <main className="admin-login"><form onSubmit={submit}><div className="shield">◆</div><h1>Admin Portal</h1><p>Secure access to TopPay controls</p><label>Email Address<input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required /></label><label>Password<input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required /></label>{error&&<p className="form-error">{error}</p>}<button className="primary">Authenticate</button></form></main>;
}
