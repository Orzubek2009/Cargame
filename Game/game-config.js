/* Downtown Drift: the game's rules. This is the only place scoring, money, prices and the police can be changed.
   Nothing here is in the in-game menus, and a lobby host cannot change it either: every player scores with the files they load.
   Leave a line out and the game uses its built-in value (src/gameconfig.js has all of them). Delete everything and nothing breaks.

   Copy a line from the examples below, remove the "//" in front of it, change the number and upload this file next to index.html.

   window.DD_GAME = {
     score: {
       req: 90,            // km/h you must be over to start a run
       base: 50,           // points for a near miss at 100 km/h, combo x1 (closer and faster pays more)
       swipePts: 120,      // points for a sideswipe
       swipeGap: 3,        // seconds between two sideswipes, whichever car they are on
       swipeRearm: 14,     // metres you must get away from a car before it can be sideswiped again
       comboMax: 15,       // highest combo
       driftRate: 70,      // drift points per second
       oncomingK: 1.5,     // near-miss multiplier for a car coming the other way
       trailerK: 1.25,     // ...for a truck or trailer
       threadK: 2,         // ...for threading between two cars
       speedPow: 1.6,      // how fast the points grow with speed (higher: speed pays more)
     },
     money: {
       perPoint: 0.25,       // dollars for every point you score (a crash does not take them away)
       perPointPolice: 0.45, // dollars per point while the police are chasing you
       start: 0,             // dollars a new player starts with
       starter: 'prius',     // the free car everyone starts with
       priceScale: 1,        // every car's price x this (0.1 = a tenth of the price)
       partScale: 1,         // every upgrade part's price x this
     },
     prices: { prius: 9900, huracan: 750000 },             // car prices in dollars, by car id: cruiser prius malibu z350 ford rs5 x5 elantra e92 mustang camaro m4 gt4 urus roadster gt3rs huracan sesto laferrari tourbillon
     cars: {
       hide: [],                                           // car ids to take out of the garage, e.g. ['laferrari', 'sesto']
       tune: {},                                           // change one car: { prius: { power: 1.3, mass: 0.9 } }, same keys as an upgrade tier
     },
     upgrades: {},                                         // part tiers and their prices, same layout as in src/gameconfig.js
     police: {
       max: 4,             // police cars chasing you at heat 1
       maxCap: 12,         // the most there can ever be, whatever the heat table says
       startDelay: 8,      // seconds of driving before the first police car turns up
       heatEvery: 35,      // seconds of chase for each heat level
       heatMax: 6,         // the highest heat
       edge: 1.12,         // how much faster than you the cars can go (x your speed), and
       edgePerHeat: 0.06,  // how much more for each heat level above 1
       topKmh: 345,        // no police car goes faster than this
       chaserMin: 280,     // km/h top speed a car needs to be worth the Lamborghini police car's attention (slower cars get the Crown Vic and the SUV)
       bustTime: 3.2,      // seconds boxed in before it is over
       // heat: [ { extra: 0, skill: 1, pit: 0.35, box: 0.3, block: 0 }, ... ]   one row per level: extra cars on top of max, skill, and how often they PIT / box / block (0 to 1)
     },
     defaults: {},         // starting values for menu options: { traffic: { count: 40 }, weather: { mode: 'rain' } }
   };
*/
window.DD_GAME = {};
