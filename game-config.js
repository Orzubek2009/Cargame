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
     prices: { prius: 9900, huracan: 750000 },             // car prices: the full list is live at the bottom of this file, change the numbers there
     handling: { brakeStab: 1, spinProtection: 1 },         // brake stability and spin-out protection (and two more): live at the bottom of this file
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
window.DD_GAME = {
  /* Car prices in US dollars, one line per car (cheapest first). Change a number, save, and upload this file next to index.html: that is all.
     To make every car cheaper or dearer at once use money.priceScale instead (see above). The three police versions at the bottom are not linked to
     their road cars: if you change a road car's price, change its police version too. Delete a line and the car goes back to its built-in price. */
  prices: {
    cruiser:     8900,     // Ford Crown Victoria Police Interceptor 2011 (ex-police)
    prius:       9900,     // Toyota Prius 2012
    malibu:      12900,    // Chevrolet Malibu 2.0T Premier 2016
    z350:        13900,    // Nissan 350Z 2003
    ford:        19900,    // Ford Police Interceptor Utility 2020 (ex-police)
    rs5:         27900,    // Audi RS5 2011
    x5:          33900,    // BMW X5 xDrive30d 2019
    elantra:     35000,    // Hyundai Elantra N 2025
    e92:         38500,    // BMW M3 (E92) 2010
    civic:       44800,    // Honda Civic Type R (FL5) 2024
    raptor:      49500,    // Ford F-150 Raptor SuperCab 2017
    model3:      56000,    // Tesla Model 3 Performance 2021
    camaro:      58500,    // Chevrolet Camaro SS 350 1967
    m2:          62200,    // BMW M2 (G87) 2023
    mustang:     71300,    // Roush Stage 3 Mustang 2019: the $48,335 Mustang GT plus the $22,925 Stage 3 package
    trx:         71700,    // Ram 1500 TRX 2021
    m4:          84200,    // BMW M4 Competition 2025
    m5:          103000,   // BMW M5 Competition (F90) 2021
    m3t:         119000,   // BMW M3 Touring (G81) 2023
    snake:       160000,   // Shelby Super Snake (S650) 2024: from $159,995
    urus:        172000,   // Lamborghini Urus 2019
    gtr:         178000,   // Nissan GT-R Nismo (R35) 2017
    gt3rs:       188550,   // Porsche 911 GT3 RS (991.2) 2018: $187,500 plus $1,050 delivery
    gt4:         189000,   // Mercedes-AMG GT4 2018 (customer racing car, about 189,000 euros new)
    gt500:       198000,   // Shelby GT500 1967 (collector price, a good driver)
    roadster:    200000,   // Tesla Roadster 2020 (announced base price)
    huracan:     750000,   // Mansory Huracán Torofeo 2015
    sesto:       2700000,  // Lamborghini Sesto Elemento
    zonda:       2900000,  // Pagani Zonda Revolución 2013
    laferrari:   3800000,  // Ferrari LaFerrari 2014
    tourbillon:  4100000,  // Bugatti Tourbillon 2026
    // the three police Interceptors (every part maxed)
    mustangpd:   142600,   // Mustang Pursuit: the Roush Mustang as a police car, every part maxed (about twice the road car)
    gt3pd:       377100,   // 911 GT3 RS Interceptor: the GT3 RS as a police car, every part maxed (about twice the road car)
    roadsterpd:  410000,   // Roadster Interceptor: the Tesla Roadster as a police car, every part maxed
  },

  /* Handling aids for every car: the starting values of Settings > Aids (a player who moves a slider there keeps their own number). Change a number, save, upload this file.
       brakeStab        brake stability: how firmly the brake pulls a sliding car straight.            0 = off, 1 = standard, 3 = very firm
       spinProtection   spin-out protection: how early a slide is caught before it becomes a spin.     0 = wildest, 1 = standard, 2 = very safe
       absSlip          how much a braking wheel may slip before ABS lets go of the brake (0.12 = 12 %). Lower stops sooner, higher locks up more first
       counterSteer     strength of the steering assist's automatic counter-steer.                      0 = none, 1 = standard, 1.5 = strong
     For one car only: cars: { tune: { m4: { brakeStab: 1.5, spinProtection: 0.5 } } } multiplies these two for that car. */
  handling: {
    brakeStab: 1,
    spinProtection: 1,
    absSlip: 0.12,
    counterSteer: 1,
  },
};
