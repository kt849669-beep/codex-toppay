import LoginForm from '@/components/LoginForm';

const site = 'https://top-payy.online';

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${site}/#website`,
      url: `${site}/`,
      name: 'TopPay',
      alternateName: ['Toppay', 'Top pay'],
      description: 'TopPay account login and mobile-friendly web application.',
    },
    {
      '@type': 'Organization',
      '@id': `${site}/#organization`,
      name: 'TopPay',
      url: `${site}/`,
      logo: { '@type': 'ImageObject', url: `${site}/toppay-logo.svg`, width: 512, height: 512 },
      contactPoint: { '@type': 'ContactPoint', contactType: 'Customer Support', url: `${site}/toppay-support.html` },
    },
    {
      '@type': 'WebPage',
      '@id': `${site}/#webpage`,
      url: `${site}/`,
      name: 'TopPay Login',
      description: 'Sign in to TopPay to access the account dashboard and available payment tools.',
      isPartOf: { '@id': `${site}/#website` },
      about: { '@id': `${site}/#organization` },
      mainEntity: { '@id': `${site}/#webapp` },
    },
    {
      '@type': 'WebApplication',
      '@id': `${site}/#webapp`,
      name: 'TopPay',
      alternateName: ['Toppay', 'Top pay'],
      url: `${site}/`,
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'Web',
      description: 'TopPay is a mobile-friendly web application for account access and the payment tools available to signed-in users.',
    },
    {
      '@type': 'FAQPage',
      '@id': `${site}/#faq`,
      url: `${site}/`,
      mainEntity: [
        { '@type': 'Question', name: 'What is the correct TopPay login URL?', acceptedAnswer: { '@type': 'Answer', text: `The official TopPay login is at ${site}/. Check the full address before entering account details.` } },
        { '@type': 'Question', name: 'Is TopPay real or fake?', acceptedAnswer: { '@type': 'Answer', text: 'TopPay is a real, working web application. To stay safe, only use the official top-payy.online address and never share your password, OTP or MPIN with anyone.' } },
        { '@type': 'Question', name: 'Can I use the TopPay app on mobile?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. The TopPay web app is mobile-friendly and opens in any current phone browser without installing an unverified APK file.' } },
        { '@type': 'Question', name: 'How do I recover my TopPay password?', acceptedAnswer: { '@type': 'Answer', text: 'Open the TopPay login and use the Forget Password link shown with the form. Never share a password, OTP or MPIN.' } },
        { '@type': 'Question', name: 'How do I reach TopPay customer support?', acceptedAnswer: { '@type': 'Answer', text: 'Open the TopPay customer support page for login, deposit status and USDT transaction guidance. Keep your password, OTP and MPIN out of any support message.' } },
      ],
    },
  ],
};

export default function LoginPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <main className="login-container">
        <h1 className="login-header">Login</h1>
        <LoginForm />
      </main>

      <section className="login-seo-content" aria-labelledby="toppay-access-title">
        <span className="seo-kicker">TopPay account access</span>
        <h2 id="toppay-access-title">What is TopPay?</h2>
        <p className="seo-summary">
          <strong>TopPay</strong>—also searched as “Toppay” or “Top pay”—is a mobile-friendly web
          application for account access and the payment tools available to signed-in users. Existing
          users can use the login form above; new visitors can review the guides below before continuing.
        </p>

        <h2>How do I access the TopPay login?</h2>
        <p>
          Open <strong>https://top-payy.online/</strong>, confirm the complete address and enter the phone
          number and password linked to your own account. The visible form is the direct TopPay login. If
          access fails, use the Forget Password option shown with the form instead of an unknown recovery link.
        </p>
        <ol className="seo-steps">
          <li>Confirm the address bar shows <strong>top-payy.online</strong>.</li>
          <li>Enter your registered phone number and password.</li>
          <li>Select LOG IN and follow only the instructions shown in your account.</li>
        </ol>

        <div className="seo-card-grid">
          <article className="seo-card">
            <h2>Is TopPay real or fake?</h2>
            <p>
              TopPay is a real, working web application. To stay safe, use only the official
              <strong> top-payy.online</strong> address and never share your password, OTP or MPIN. Avoid any
              site or message claiming to be TopPay on a different domain.
            </p>
            <a href="/about-toppay.html">Read about the official TopPay</a>
          </article>
          <article className="seo-card">
            <h2>Can I use the TopPay app on mobile?</h2>
            <p>
              Yes. The TopPay web app works in a current mobile browser. This official website does not
              provide a direct APK file, so avoid TopPay APK downloads from unverified messages or websites.
            </p>
            <a href="/toppay-apk.html">Read the TopPay app and APK guide</a>
          </article>
        </div>

        <aside className="seo-takeaway" aria-label="Important TopPay account reminder">
          <strong>Important:</strong> never share your TopPay password, OTP, MPIN or recovery code. Account
          features, limits and transaction instructions can change, so confirm the current information after signing in.
        </aside>

        <section className="seo-faq" aria-labelledby="toppay-faq-title">
          <h2 id="toppay-faq-title">TopPay login questions</h2>
          <h3>What is the correct TopPay login URL?</h3>
          <p>The official login is available at <strong>https://top-payy.online/</strong>. Check the full address before entering account details.</p>
          <h3>Is TopPay real or fake?</h3>
          <p>TopPay is a real web application. Confirm you are on the official top-payy.online address, and never share a password, OTP or MPIN with anyone.</p>
          <h3>How do I recover my TopPay password?</h3>
          <p>Use the Forget Password link shown with the login form, then follow the recovery instructions opened from that link.</p>
          <h3>Should I install a TopPay APK from another website?</h3>
          <p>Do not install an APK only because it uses the TopPay name. Verify its publisher and source before installing any application file.</p>
          <h3>How do I reach TopPay customer support?</h3>
          <p>Open the <a href="/toppay-support.html">TopPay customer support</a> page for login, deposit-status and USDT guidance. Keep your password, OTP and MPIN out of any support message.</p>
        </section>

        <nav className="seo-links" aria-label="TopPay help pages">
          <a href="/toppay-guide.html">TopPay guides</a>
          <a href="/toppay-usdt.html">TopPay USDT</a>
          <a href="/toppay-support.html">TopPay support</a>
          <a href="/toppay-password-help.html">Password help</a>
        </nav>
      </section>
    </>
  );
}
