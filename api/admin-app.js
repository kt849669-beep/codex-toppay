// Retired API: the public demo has no account database or credential endpoints.
export default function handler(req, res) {
  res.statusCode = 410;
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Robots-Tag', 'noindex, nofollow');
  res.end(JSON.stringify({ error: 'Account API is disabled. Use the local demo controls.' }));
}
