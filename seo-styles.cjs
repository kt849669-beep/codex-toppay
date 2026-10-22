/* Visual styles for the public TopPay SEO pages. Design unchanged. */
const styles = `
      :root { color-scheme: light; font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; --navy: #1f2d7a; --blue: #2563eb; --red: #f43f4f; --ink: #111827; --muted: #64748b; --line: #e5e7eb; --wash: #f6f8fc; --sky: #ecf9ff; }
      * { box-sizing: border-box; }
      html { scroll-behavior: smooth; }
      body { margin: 0; background: #fff; color: #334155; line-height: 1.7; }
      a { color: var(--blue); text-underline-offset: 3px; }
      h1, h2, h3 { color: var(--ink); line-height: 1.18; letter-spacing: -.025em; }
      h1 { margin: .45rem 0 0; font-size: clamp(2rem, 7vw, 3.9rem); }
      h2 { margin: 2rem 0 .7rem; font-size: clamp(1.45rem, 4vw, 2rem); }
      h3 { margin: 1.25rem 0 .35rem; }
      p { margin: .65rem 0; }
      .site-header { position: sticky; top: 0; z-index: 10; border-bottom: 1px solid rgba(226,232,240,.9); background: rgba(255,255,255,.94); backdrop-filter: blur(14px); }
      .header-inner { width: min(1180px, calc(100% - 32px)); min-height: 76px; margin: auto; display: flex; align-items: center; justify-content: space-between; gap: 18px; }
      .brand { display: inline-flex; align-items: center; gap: 10px; color: var(--navy); font-weight: 800; text-decoration: none; font-size: 1.12rem; }
      .brand-mark { width: 38px; height: 38px; display: block; border-radius: 11px; object-fit: contain; background: var(--navy); box-shadow: 0 8px 20px rgba(31,45,122,.22); }
      .header-nav { display: flex; align-items: center; justify-content: center; gap: 17px; }
      .header-nav a { color: #475569; font-size: .9rem; text-decoration: none; white-space: nowrap; }
      .header-actions { display: flex; align-items: center; gap: 10px; }
      .button { display: inline-flex; min-height: 44px; align-items: center; justify-content: center; padding: 10px 18px; border: 1px solid var(--line); border-radius: 999px; font-weight: 780; text-decoration: none; white-space: nowrap; }
      .register-link { color: #fff; border-color: var(--red); background: var(--red); box-shadow: 0 10px 22px rgba(244,63,79,.2); }
      .login-link, .hero-login { color: #fff; border-color: var(--blue); background: var(--blue); box-shadow: 0 10px 22px rgba(37,99,235,.24); }
      main { width: min(1120px, calc(100% - 32px)); margin: 0 auto; }
      .hero { margin: 28px 0; padding: clamp(26px, 6vw, 64px); border: 1px solid #dbeafe; border-radius: 30px; background: radial-gradient(circle at 92% 12%, #dff7ff 0, transparent 34%), linear-gradient(135deg, #fff 0%, #f7f5ff 48%, #eefbff 100%); box-shadow: 0 24px 60px rgba(30,41,59,.08); }
      .hero-grid { display: grid; grid-template-columns: minmax(0, 1.25fr) minmax(300px, .75fr); align-items: center; gap: clamp(28px, 6vw, 72px); }
      .breadcrumb { color: var(--muted); font-size: .9rem; }
      .breadcrumb a { color: var(--navy); font-weight: 700; text-decoration: none; }
      .title-row { margin-top: 18px; }
      .title-copy { max-width: 720px; }
      .eyebrow { margin: 0; color: var(--navy); font-size: .78rem; font-weight: 800; letter-spacing: .1em; text-transform: uppercase; }
      .rate-pill { display: inline-flex; align-items: center; gap: 8px; padding: 7px 12px; border: 1px solid #dbeafe; border-radius: 999px; background: rgba(255,255,255,.84); color: #475569; font-size: .84rem; }
      .rate-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--red); }
      .hero-description { max-width: 690px; margin-top: 18px; color: #526174; font-size: 1.08rem; }
      .hero-actions { display: flex; flex-wrap: wrap; gap: 11px; margin-top: 24px; }
      .telegram-link { color: var(--navy); background: #fff; }
      .trust-chips { display: flex; flex-wrap: wrap; gap: 9px; margin-top: 20px; }
      .trust-chip { padding: 7px 11px; border: 1px solid #dbe3ee; border-radius: 999px; background: rgba(255,255,255,.82); color: #334155; font-size: .8rem; font-weight: 650; }
      .hero-logo-card { min-height: 320px; display: grid; place-items: center; padding: 30px; border: 1px solid rgba(219,234,254,.95); border-radius: 28px; background: rgba(255,255,255,.88); box-shadow: 0 22px 52px rgba(31,45,122,.12); text-align: center; }
      .hero-logo-card img { width: min(190px, 70%); height: auto; aspect-ratio: 1; object-fit: contain; filter: drop-shadow(0 18px 26px rgba(31,45,122,.18)); }
      .hero-logo-card strong { display: block; margin-top: 15px; color: var(--navy); font-size: 1.2rem; }
      .hero-logo-card span { color: var(--muted); font-size: .88rem; }
      .content-grid { display: grid; grid-template-columns: minmax(0, 1.55fr) minmax(260px, .75fr); gap: 24px; align-items: start; }
      .content-panel, .answer-card, .faq, .side-card, .calculator-card { border: 1px solid var(--line); border-radius: 22px; background: #fff; box-shadow: 0 14px 40px rgba(15,23,42,.055); }
      .content-panel { padding: clamp(22px, 4vw, 40px); }
      .content-panel > p:first-child { margin-top: 0; font-size: 1.08rem; color: #475569; }
      .content-panel ul, .content-panel ol { padding-left: 1.35rem; }
      .content-panel li + li { margin-top: .6rem; }
      .content-panel li::marker { color: var(--red); font-weight: 800; }
      .notice { margin-top: 1.5rem; padding: 15px 17px; border-left: 4px solid var(--blue); border-radius: 0 14px 14px 0; background: #eff6ff; }
      .side-stack { display: grid; gap: 18px; }
      .side-card { padding: 22px; background: linear-gradient(145deg, #f8fbff, #fff); }
      .side-card h2 { margin-top: 0; font-size: 1.25rem; }
      .side-card a { display: block; padding: 9px 0; border-bottom: 1px solid #edf2f7; font-weight: 650; text-decoration: none; }
      .side-card a:last-child { border-bottom: 0; }
      .answer-card, .faq { margin: 24px 0; padding: clamp(22px, 4vw, 36px); }
      .answer-card { border-color: #c7e8ff; background: linear-gradient(135deg, #eef9ff, #fff); }
      .answer-card h2 { margin: .25rem 0 .6rem; }
      .faq h3 { padding: 18px 20px 8px; margin: 14px 0 0; border: 1px solid var(--line); border-bottom: 0; border-radius: 15px 15px 0 0; background: #fff; }
      .faq h3 + p { margin: 0; padding: 0 20px 18px; border: 1px solid var(--line); border-top: 0; border-radius: 0 0 15px 15px; color: #526174; }
      .topic-box { margin: 24px 0; padding: 20px; border: 1px solid #dbeafe; border-radius: 18px; background: #f8fbff; }
      .topic-box h2 { margin-top: 0; }
      .topic-list { display: flex; flex-wrap: wrap; gap: 9px; margin: 14px 0 0; padding: 0 !important; list-style: none; }
      .topic-list li { margin: 0 !important; padding: 7px 11px; border: 1px solid #cbdcf5; border-radius: 999px; background: #fff; color: var(--navy); font-size: .88rem; font-weight: 700; }
      .guide-nav { margin: 28px 0; padding: clamp(22px, 4vw, 34px); border-radius: 24px; background: var(--wash); }
      .guide-nav h2 { margin-top: 0; }
      .link-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px; }
      .link-grid a { min-height: 70px; display: flex; align-items: center; padding: 14px 16px; border: 1px solid var(--line); border-radius: 14px; background: #fff; color: var(--navy); font-weight: 750; text-decoration: none; }
      .calculator-card { margin: 0 0 28px; padding: clamp(22px, 4vw, 34px); }
      .calc-head { display: flex; justify-content: space-between; align-items: center; gap: 18px; }
      .calc-head h2 { margin: 0; }
      .rate-badge { padding: 7px 12px; border-radius: 999px; color: #b42331; background: #fff0f2; font-weight: 800; }
      .calc-boxes { display: grid; grid-template-columns: 1fr auto 1fr; gap: 16px; align-items: center; margin-top: 20px; }
      .calc-box { padding: 18px; border-radius: 18px; background: #f6f8fb; }
      .calc-box label { display: block; color: var(--muted); font-size: .84rem; }
      .calc-box input { width: 100%; margin-top: 5px; border: 0; outline: 0; background: transparent; color: var(--ink); font-family: inherit; font-size: 1.7rem; font-weight: 800; line-height: 1.2; }
      .calc-output { display: block; margin-top: 5px; color: var(--red); font-size: 1.7rem; font-weight: 850; }
      .calc-arrow { width: 42px; height: 42px; display: grid; place-items: center; border: 1px solid var(--line); border-radius: 50%; color: var(--navy); }
      .range-row { display: grid; grid-template-columns: 1fr 150px; gap: 16px; margin-top: 18px; }
      .range-row input[type="range"] { accent-color: var(--navy); }
      .rate-field { display: flex; align-items: center; gap: 8px; padding: 10px 14px; border: 1px solid var(--line); border-radius: 12px; }
      .rate-field input { width: 75px; border: 0; outline: 0; font-weight: 800; }
      .calc-note { margin-top: 14px; color: var(--muted); font-size: .86rem; }
      .site-footer { margin-top: 50px; padding: 34px 0; color: #dbeafe; background: var(--navy); }
      .footer-inner { width: min(1120px, calc(100% - 32px)); margin: auto; display: flex; align-items: center; justify-content: space-between; gap: 22px; }
      .site-footer strong { color: #fff; }
      .site-footer a { color: #fff; }
      @media (max-width: 1040px) { .header-nav { display: none; } }
      @media (max-width: 820px) { .hero-grid, .content-grid { grid-template-columns: 1fr; } .hero-logo-card { min-height: 250px; } .link-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
      @media (max-width: 560px) { .header-inner { min-height: 66px; } .brand span:last-child { display: none; } .header-actions .register-link { display: none; } .button { padding: 9px 14px; } .hero { margin: 16px 0; border-radius: 22px; } .hero-login, .hero-actions .register-link, .telegram-link { flex: 1 1 100%; } .hero-logo-card { min-height: 220px; } .hero-logo-card img { width: 140px; } .calc-boxes { grid-template-columns: 1fr; } .calc-arrow { margin: -4px auto; transform: rotate(90deg); } .range-row, .link-grid { grid-template-columns: 1fr; } .footer-inner { align-items: flex-start; flex-direction: column; } }
`;

module.exports = { styles };
