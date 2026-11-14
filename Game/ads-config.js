/* Downtown Drift: ad settings. Everything stays OFF until "client" below holds your AdSense publisher id.
   This is the only file you edit to turn ads on; the game itself needs no changes.

   client         your AdSense publisher id, like 'ca-pub-1234567890123456'
                  (AdSense > Account > Settings > Account information)
   slot           the id of ONE fixed-size 160 x 600 display ad unit, like '1234567890'
                  (AdSense > Ads > By ad unit > Display ads > Fixed size 160 x 600 > the number in data-ad-slot)
   slotLeft / slotRight   optional: a separate unit for each side (each falls back to "slot")
   rails          true = ads down both sides of the game on wide screens (1344 px wide and up, in the menu and in-game).
                  Phones, tablets and small windows never get them, so the game keeps its full size there.
   breaks         true = full-screen ad breaks (Google's Ad Placement API). Needs the separate "H5 Games Ads" approval.
                  They only appear at moments the player causes (opening the menu, pressing Play or Resume, getting back on
                  the road after a crash), never in the middle of driving, because Google's rules forbid that.
                  The car is frozen and nothing can hit it while one is on screen.
   breakEveryMin  fewest minutes between two full-screen ads (the first press of Play can show one straight away).
                  Google decides whether one is actually shown and how long it is.
   test           KEEP true until your site is approved and live. Test mode shows test ads only, so you never earn from
                  (or get flagged for) your own views. NEVER click your own ads.
   preview        true = draw grey 160 x 600 boxes in the side rails so you can see the layout without any account.
                  No Google code is loaded in preview mode. Set it back to false before you go live.
   privacyUrl     the page linked from the main menu ("Privacy and ads")
   ncModels       false (the default) = once real ads are live (a publisher id is set and preview is off), the cars whose 3D models are
                  licensed for non-commercial use only (CC BY-NC-SA) are drawn with the game's own built-in models instead, so the site
                  stays inside those licences. true = keep using them. Only set this if you have the authors' permission. See ADS-SETUP.md. */
window.DD_ADS = {
  client: '',
  slot: '',
  slotLeft: '',
  slotRight: '',
  rails: true,
  breaks: true,
  breakEveryMin: 4,
  test: true,
  preview: false,
  privacyUrl: 'privacy.html',
  ncModels: false
};
