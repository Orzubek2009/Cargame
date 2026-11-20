/* Rush Lane: the game's rules. This is the only place scoring, money, prices and the police can be changed.
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
     prices: { prius: 9900, huracan: 750000 },             // car prices in dollars, by car id: cruiser prius malibu z350 ford rs5 x5 elantra e92 mustang camaro m4 gt4 urus roadster gt3rs huracan sesto mustangpd gt3pd roadsterpd laferrari tourbillon civic model3 m2 raptor trx m5 m3t snake gtr gt500 zonda
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
       catchUp: 0.25,      // a cop behind you goes faster by this many m/s for every metre it is behind (it never gets left behind)
       topKmh: 450,        // no police car goes faster than this, whatever its engine
       bustTime: 3.2,      // seconds boxed in before it is over
       catchSpeed: 22,     // km/h or less, while boxed in, counts as stopped
       vulnerable: 50,     // km/h: if you are slower than this, spun round or sliding with the police on you, they close in from every side
       boxDecel: 5,        // m/s2: how hard the box slows you once it has closed on you
       boxHold: 0.7,       // seconds of being shut in on every side before the box closes
       boxMass: 3,         // a police car holding you in the box is this many times harder to shove out of the way (1 = you can push through them)
       rejoin: true,       // true: a cop that is left behind, stuck or wrecked comes back on the road round you (false: you can outrun and lose them)
       ghost: false,       // false: the police are solid: they steer round the traffic and each other and brake for what is in the way, and when they do hit something it is a real crash. true: they pass through the traffic and each other (they still hit YOU and the barriers)
       avoidMargin: 0.8,   // (solid police) room they leave beside a car they pass, in metres on top of the two half-widths: more = fewer scrapes, slower through traffic
       corridorMargin: 0.5, // (solid police) the same for a car straight ahead that makes them brake
       bounce: 0,          // how bouncy a police car is when it hits you: 0 = it stays on you and pushes, 0.3 = it bounces off
       pitPower: 1,        // x the sideways push of a PIT (0.5 gentle, 2 brutal)
       pitSpin: 1,         // the shove that breaks your tail loose when a cop's nose hits your rear quarter (0 = nothing but the crash, 2 = it almost always spins you)
       chaserMin: 280,     // km/h top speed at which your car counts as fast: the chase is then mostly sport police cars (Mustang, GT3) with some super cars (the Lamborghini, the Roadster)
       spec: { hp: 3.5 },  // the police cars are tuned to the maximum with the garage's parts (spec.fit); hp = how much punishment they take (x a stock car); accel, top, brake, grip are extra multipliers
       livery: { base: 0xf1f4f6, band: 0x0b3b9c, ink: 0x0a2f86 },   // paint of the police versions of the road cars: white body, blue band, POLICE lettering
       // fleet: { sport: ['mustangpd', 'gt3pd'], super: ['sesto', 'roadsterpd'], maxSuper: 2, slow: [[1, 0, 0], [0.8, 0.2, 0]], fast: [[0, 0.9, 0.1]] }   which cars chase you: slow/fast = one row [patrol, sport, super] of weights per heat level, for a slow or a fast car of yours
       // heat: [ { extra: 0, skill: 1, pit: 0.45, box: 0.35, block: 0.3 }, ... ]   one row per level: extra cars on top of max, skill, and how many cops PIT (0 none, 0.75 two, 1 up to three), whether they squeeze from the sides (box, above 0) and whether one blocks ahead (block, above 0)
     },
     defaults: {},         // starting values for menu options: { traffic: { count: 30 }, weather: { mode: 'rain' } }   (cars on the road is 30 by default; it is changed in dev mode)
   };
*/
window.DD_GAME = {};
