# Turning the ads on (Downtown Drift)

Everything is OFF and the game is unchanged until you finish step 6. You can do the steps over days; nothing breaks in between.

## What is in the zip
- `index.html` the game (one file)
- `ads-config.js` the only file you edit for ads
- `game-config.js` the only file you edit for the game's rules: scoring, money, car prices, upgrades and the police (see "Changing the rules" below)
- `ads.txt` AdSense's ownership file (edit the publisher id)
- `privacy.html` privacy page template (fill in the [brackets])
- `models/` the car models (keep the folder as it is)

## Steps
1. **Custom domain.** AdSense usually rejects `something.github.io` addresses, so buy a domain and point it at GitHub Pages (repo Settings > Pages > Custom domain). Upload everything in this zip to the repo root.
2. **Privacy page.** Open `privacy.html`, replace `[date]` and `[your contact email]`, and check the wording for your country. AdSense requires one.
3. **AdSense account.** Sign up at adsense.google.com with your domain. It gives you a verification snippet: paste it in `index.html` where the comment says `ADSENSE-VERIFY`. Wait for approval (days to weeks).
4. **Side ad unit.** In AdSense go to Ads > By ad unit > Display ads > Fixed size 160 x 600. Copy the publisher id (`ca-pub-...`) and the unit's `data-ad-slot` number (10 digits).
5. **ads.txt.** Put your publisher id digits into `ads.txt` and make sure `https://yourdomain.com/ads.txt` opens.
6. **ads-config.js.** Fill in `client` and `slot`. Leave `test: true`, open the site, and check the side boxes and that pressing Play shows a test full-screen ad. When you are happy and approved, set `test: false`.
7. **Full-screen ads (optional but it is what you asked for).** Apply for *H5 Games Ads* at adsense.google.com/start/h5-games-ads/. It is a separate approval. Until it comes through, set `breaks: false` or just leave it, since without approval Google serves nothing and the game carries on.
8. **Consent message.** In AdSense go to Privacy & messaging and set up the EEA/UK (and US states) consent message, so visitors in those places are asked before personalised ads. I have not tested this part; follow AdSense's own prompts.

## Rules to remember
- Never click your own ads, and do not ask friends to. It can get the account banned. Test mode exists so you do not need to.
- The length of a full-screen ad is Google's choice, so "30 seconds" is not guaranteed.
- Google's rules do not allow full-screen ads that interrupt continuous gameplay, so they only appear when the player opens the menu, presses Play or Resume, or gets back on the road after a crash. While one is up the car is frozen and nothing can hit it.
- I could not check the test flag on the side boxes against Google's docs, so treat every ad as live: do not click any of them.
- Side ads only show on screens at least 1344 px wide and 640 px tall. Phones never get them.

## Car models, licences and ads
The 3D cars are other people's work from Sketchfab, and each one says how you may use it (the credit is shown under the car in the garage).
- **CC BY 4.0** (Roush Mustang, Tesla Roadster, Toyota Prius, Chevrolet Malibu, Porsche GT3 RS, Hyundai Elantra N, Crown Vic police car): allowed on a site with ads, as long as the credit stays.
- **CC BY-NC-SA 4.0** (BMW M3, BMW M4, BMW X5, Urus, Bugatti Tourbillon, AMG GT4, LaFerrari, Nissan 350Z, Huracán Torofeo, 1967 Camaro, Audi RS5, Sesto Elemento police car): non-commercial only. A site that shows ads is commercial.
- **Sketchfab Standard licence** (Ford Police Interceptor Utility): free for commercial use, but Sketchfab's terms do not let you make the model available in a way that allows or invites people to download or extract it as a stand-alone asset, and `models/ford.glb.txt` is a separate file that anyone can download, so it may fall under that. I am not a lawyer and cannot tell you it is fine: check the licence on the model's Sketchfab page. To leave the Ford's model out, delete `models/ford.glb.txt`; the game then draws a built-in SUV in its place and everything else works.

So as soon as real ads are on (a publisher id in `ads-config.js` and `preview: false`), the game draws those cars with its own built-in models instead (the garage says so under the car). Nothing else changes. Set `ncModels: true` only if you have the authors' permission. With ads off, every real model is used.

Players can also turn on **Performance mode** (Settings > Graphics): every car is drawn with the simple built-in models and the big model files are never downloaded. The built-in models are also what you see if a model file cannot be loaded.

## Changing the rules (game-config.js)
Scoring, how much money a point pays, every car's price, the upgrade parts and the police chase are set in `game-config.js` and nowhere else: there are no menus for them in the game, and a lobby host cannot change them for other players either. Open the file, copy a line from the example in its first comment, remove the `//`, change the number and upload the file next to `index.html`. Whatever you leave out keeps its built-in value. A new driver starts with $0 and a Toyota Prius; every point pays $0.25 ($0.45 while the police are chasing you), crashes included. Car prices are roughly what the real cars cost today (about $9,900 for the Prius up to about $4.1 million for the Bugatti Tourbillon), so the top cars take a very long time to earn: use `money.priceScale` (every car) and `money.partScale` (every part) to make them cheaper or dearer in one line, or `money.perPoint` to change what a point pays.

The same file also holds: `cars.hide` (take cars out of the garage), `cars.tune` (change one car's power, mass, grip and so on), the score multipliers (`oncomingK`, `trailerK`, `threadK`, `speedPow`, the combo steps), the police heat table (`police.heat`: for each heat level how many extra cars, how skilled they are and how often they PIT, box and block; `police.heatEvery` seconds per level, `police.maxCap` most cars at once, `police.edge` how much faster than you they are, `police.topKmh`), and `defaults`, which sets the starting value of the in-game menu options (traffic count, weather, camera and so on) before the player changes them.

Dev mode (Settings > Developer, solo only) is separate: it makes every car and part free and unlocks the old tuning, world and road menus, but it earns no money, saves nothing to your garage and switches itself off in a lobby.

## Seeing the layout without an account
Set `preview: true` in `ads-config.js`. Grey 160 x 600 boxes appear down both sides on a wide screen and no Google code is loaded. Set it back to `false` before going live.
