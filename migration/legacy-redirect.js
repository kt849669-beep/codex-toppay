// Activate only after https://top-payy.online/ is verified on GoDaddy.
// This worker serves no application assets; it keeps old links working.
export default {
  fetch(request) {
    const old = new URL(request.url);
    const destination = new URL('https://top-payy.online');
    destination.pathname = old.pathname;
    destination.search = old.search;
    return Response.redirect(destination.toString(), 301);
  },
};
