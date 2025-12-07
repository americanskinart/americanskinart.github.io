# Instagram Feed Automation — Artist Setup Guide

To enable the automated Instagram feed for each artist, you will need to collect the following from each artist:

## What You Need From Each Artist

1. **Instagram Business/Creator Account**
   - The artist must have a Business or Creator Instagram account.
   - The account must be linked to a Facebook Page (required by Instagram Graph API).

2. **Instagram User ID**
   - This is a numeric ID for the artist's Instagram account (not the @username).
   - You can get this via the Facebook Graph API Explorer or by using online tools after authentication.

3. **Instagram Graph API Access Token**
   - The artist must authorize your app to access their Instagram media.
   - The token must have the `instagram_basic` and `pages_show_list` permissions.
   - Tokens can be generated via the Facebook Developer portal (requires app setup and artist login/consent).

4. **Artist Page URL on Your Site**
   - The URL to the artist's profile page (e.g., `https://yoursite.com/artists/artist1.html`).

5. **Instagram Profile URL**
   - The direct link to their Instagram (e.g., `https://instagram.com/artist1`).

6. **Instagram Handle**
   - The @username (e.g., `@artist1`).

---

## Example JSON Entry (for Cloudflare Worker)

```
{
  "userId": "INSTAGRAM_USER_ID",
  "accessToken": "ACCESS_TOKEN",
  "type": "artist",
  "artistPage": "https://yoursite.com/artists/artist1.html",
  "instagramPage": "https://instagram.com/artist1",
  "handle": "@artist1"
}
```

---

## How to Add a New Artist

1. Collect the above information from the artist.
2. Add a new object to the `IG_ACCOUNTS` JSON array in your Cloudflare Worker secrets.
3. Redeploy the Worker if needed.

---

## Notes
- You can leave the Worker logic in place but keep the feed check disabled until you have all the required tokens and IDs.
- Once you have the info, re-enable the feed logic in `workers/instagram-feed.js`.
- If you need help generating tokens or setting up the Facebook App, see the official [Instagram Graph API documentation](https://developers.facebook.com/docs/instagram-api/getting-started/).
