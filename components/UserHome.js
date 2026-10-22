'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

// Default promo banners shown when the admin has not uploaded slides.
const defaultSlides = [
  { image_url: '', title: 'A must read for newbies', subtitle: 'How to make more profits', cta: 'Click to read' },
];

function normalizeState(data) {
  return {
    slides: Array.isArray(data?.slides) ? data.slides : [],
    video: data?.video || null,
    telegram: data?.telegram || null,
  };
}

export default function UserHome() {
  const router = useRouter();
  const [session, setSession] = useState(null);
  const [state, setState] = useState({ slides: [], video: null, telegram: null });
  const [slide, setSlide] = useState(0);
  const [stage, setStage] = useState('loading');
  const [digits, setDigits] = useState(['', '', '', '', '', '']);
  const inputs = useRef([]);

  // ---- Workflow (unchanged): session guard -> load state -> mandatory MPIN ----
  useEffect(() => {
    const saved = sessionStorage.getItem('toppay_session');
    if (!saved) { router.replace('/'); return; }
    const parsed = JSON.parse(saved); setSession(parsed);
    fetch('/api/state')
      .then((r) => r.json())
      .then((data) => setState(normalizeState(data)))
      .catch(() => setState(normalizeState(null)))
      .finally(() => setTimeout(() => setStage('mpin'), 2000));
  }, [router]);

  const slides = state.slides?.length ? state.slides : defaultSlides;
  useEffect(() => {
    if (slides.length < 2) return;
    const timer = setInterval(() => setSlide((i) => (i + 1) % slides.length), 3000);
    return () => clearInterval(timer);
  }, [slides.length]);

  function logout() { sessionStorage.removeItem('toppay_session'); router.replace('/'); }
  function advance() {
    if (state.video?.video_url) setStage('video');
    else if (state.telegram?.telegram_link) setStage('telegram');
    else logout();
  }
  async function saveMpin(value) {
    const response = await fetch('/api/auth/mpin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: session.userId, mpin: value }),
    });
    if (!response.ok) { setDigits(['', '', '', '', '', '']); inputs.current[0]?.focus(); return; }
    setStage('success'); setTimeout(advance, 2000);
  }
  function changeDigit(index, value) {
    const digit = value.replace(/\D/g, '').slice(-1);
    const next = [...digits]; next[index] = digit; setDigits(next);
    if (digit && index < 5) inputs.current[index + 1]?.focus();
    const mpin = next.join(''); if (mpin.length === 6) saveMpin(mpin);
  }

  if (!session) return <main className="center-screen">Loading…</main>;

  const current = slides[slide] || defaultSlides[0];
  const stats = [
    { label: 'Balance', value: '0.00' },
    { label: 'Today Received', value: '0.00' },
    { label: 'Top up Bonus', value: '0.00' },
    { label: 'Team Commission', value: '0.00' },
  ];

  return (
    <main className="phone-shell">
      <header className="app-header"><strong>TopPay</strong><span className="header-chat" aria-hidden="true">◎</span></header>

      <section className="dashboard-content">
        {/* Promo banner / slider — admin slides drive it, else default promo */}
        <div className="promo-slider">
          {current.image_url
            ? <div className="promo-card promo-image" style={{ backgroundImage: `url(${current.image_url})` }} />
            : (
              <div className="promo-card">
                <div className="promo-text">
                  <h3>{current.title || 'A must read for newbies'}</h3>
                  <p>{current.subtitle || 'How to make more profits'}</p>
                  <span className="promo-cta">{current.cta || 'Click to read'}</span>
                </div>
                <div className="promo-emoji" aria-hidden="true">📗</div>
              </div>
            )}
          {slides.length > 1 && (
            <div className="dots">{slides.map((_, i) => <i key={i} className={i === slide ? 'active' : ''} />)}</div>
          )}
        </div>

        {/* USDT ratio */}
        <div className="ratio-card">
          <div className="ratio-left">
            <small>USDT Ratio</small>
            <strong>1 USDT ≈ 109.14 INR</strong>
            <span>Bonus ratio: 2%</span>
          </div>
          <div className="ratio-divider" />
          <div className="ratio-right">
            <small>INR Bonus Ratio</small>
            <b>4%</b>
          </div>
        </div>

        {/* Top up */}
        <button type="button" className="topup"><span className="topup-badge">🪙 First</span>Top up</button>

        {/* Stat grid */}
        <div className="stat-grid">
          {stats.map((s) => (
            <div key={s.label} className="stat-cell">
              <div className="stat-text"><small>{s.label}</small><strong>{s.value}</strong></div>
              <span className="chev" aria-hidden="true">›</span>
            </div>
          ))}
        </div>

        {/* Tutorial */}
        <section className="tutorial">
          <h2>Tutorial</h2>
          <div className="tutorial-row">
            <span className="warn" aria-hidden="true">⚠️</span>
            <p>List of scammers released (Please block if you encounter this)</p>
          </div>
        </section>
      </section>

      {/* Bottom navigation */}
      <nav className="bottom-nav">
        <b className="active"><span aria-hidden="true">⌂</span><small>Home</small></b>
        <b><span aria-hidden="true">⇅</span><small>Deposit</small></b>
        <b><span aria-hidden="true">▤</span><small>UPI</small></b>
        <b><span aria-hidden="true">👥</span><small>Team</small></b>
        <b><span aria-hidden="true">☺</span><small>Me</small></b>
      </nav>

      {/* Floating support button */}
      <button type="button" className="fab-chat" aria-label="Support">💬</button>

      {/* ---- Popups (workflow unchanged) ---- */}
      {stage === 'mpin' && (
        <div className="modal">
          <div className="dialog mpin-dialog">
            <div className="mpin-badge" aria-hidden="true">🔒</div>
            <h2>Set MPIN</h2>
            <p>Enter a secure 6-digit MPIN</p>
            <div className="mpin">
              {digits.map((value, i) => (
                <input key={i} ref={(node) => { inputs.current[i] = node; }} value={value}
                  onChange={(e) => changeDigit(i, e.target.value)} inputMode="numeric" maxLength={1} />
              ))}
            </div>
            <button type="button" className="text-button" onClick={logout}>Cancel</button>
          </div>
        </div>
      )}
      {stage === 'success' && (
        <div className="modal">
          <div className="dialog"><div className="success-mark">✓</div><h2>Success</h2>
            <p>Your account successfully updated, please wait some time.</p></div>
        </div>
      )}
      {stage === 'video' && (
        <div className="modal dark">
          <div className="dialog video">
            <video src={state.video.video_url} autoPlay muted playsInline controls />
            <button type="button" className="primary" onClick={() => state.telegram?.telegram_link ? setStage('telegram') : logout()}>Complete</button>
          </div>
        </div>
      )}
      {stage === 'telegram' && (
        <div className="modal">
          <div className="dialog"><div className="telegram-mark">➤</div>
            <h2>{state.telegram.title || 'Join our Telegram'}</h2>
            <p>{state.telegram.description}</p>
            <a className="primary link-button" href={state.telegram.telegram_link} target="_blank" rel="noreferrer">Join Channel</a>
            <button type="button" className="text-button" onClick={logout}>Close</button>
          </div>
        </div>
      )}
    </main>
  );
}
