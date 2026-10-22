'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const router = useRouter();
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [limited, setLimited] = useState(null);

  async function submit(event) {
    event.preventDefault();
    setError('');
    if (!/^\d{10}$/.test(mobile)) return setError('Please enter a valid 10-digit mobile number.');
    if (password.length < 4) return setError('Password is too short.');
    setLoading(true);
    try {
      const response = await fetch('/api/auth/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ mobile, password }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Login failed');
      if (data.limited) return setLimited(data.telegramUrl || 'https://app-web.toppay-web.com');
      sessionStorage.setItem('toppay_session', JSON.stringify(data.session));
      router.push('/home');
    } catch (cause) {
      setError(cause.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <form className="login-form" onSubmit={submit}>
        <label className="field"><span aria-hidden="true">☎</span><input type="tel" inputMode="numeric" value={mobile} onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))} placeholder="Enter Your Phone Number" required /></label>
        <label className="field"><span aria-hidden="true">🔒</span><input type="text" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter Password" required /></label>
        <div className="forgot"><a href="https://app-web.toppay-web.com/forgetPassword">Forget Password</a></div>
        {error && <p className="form-error" role="alert">{error}</p>}
        <button className="primary login-button" disabled={loading}>{loading ? 'Please wait...' : 'LOG IN'}</button>
        <p className="register" style={{ fontSize: '13px', color: '#888888', marginTop: '16px' }}>New user <a href="https://app.toppay-web.com/regist?code=1eashowpbshz" target="_blank" rel="noopener noreferrer" style={{ color: '#888888', textDecoration: 'underline' }}>Register</a></p>
      </form>
      {limited && <div className="modal"><div className="dialog"><h2>Update Request Already Received</h2><p>Please wait some time. You can use another link:</p><a className="secondary" href={limited}>{limited}</a></div></div>}
    </>
  );
}
