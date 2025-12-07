// workers/instagram-feed.js
// Cloudflare Worker: Multi-account Instagram feed merger
// Fetches feeds from multiple Instagram accounts (artists + shop) and outputs a merged JSON array
// Each entry: {src, alt, href, type: 'artist'|'shop'}
//
// Required secrets (set in Wrangler):
//   IG_ACCOUNTS: JSON string: [{userId, accessToken, type, artistPage, instagramPage, handle}]
//
// Example IG_ACCOUNTS:
// [
//   {"userId":"123","accessToken":"...","type":"artist","artistPage":"https://yoursite.com/artists/artist1.html","instagramPage":"https://instagram.com/artist1","handle":"@artist1"},
//   {"userId":"456","accessToken":"...","type":"shop","instagramPage":"https://instagram.com/americanskinart","handle":"@americanskinart"}
// ]

export default {
  async fetch(request, env) {
    // Feed check is disabled. Always return an empty array.
    return new Response(JSON.stringify([]), { headers: { 'content-type': 'application/json', 'cache-control': 'public, max-age=300' } });
  }
};
