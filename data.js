/* ============================================================
   GAME DATA
   Zones, hives, staff & developers.
   ============================================================ */

const ZONES = [
  {
    n: "00", key: "spawn", name: "Spawn", accent: "#7CB518",
    blurb: "Where every bee starts out.",
    image: "https://files.catbox.moe/njz9q5.png",
    features: [
      { label: "Bee Index" },
      { label: "Black Bear Quests", popup: "https://files.catbox.moe/p64jop.png" },
      { label: "Leaderboards", popup: "https://files.catbox.moe/vcs253.png" },
      { label: "Neon Machine", popup: "https://files.catbox.moe/w46heu.png" },
    ],
    hives: [],
    tags: [],
  },
  {
    n: "01", key: "field", name: "Field", accent: "#8FD14F",
    blurb: "First steps out of Spawn.",
    image: "https://files.catbox.moe/h8tswc.png",
    features: [],
    hives: [ { name: "Basic Hive", cost: "250 Pollen" }, { name: "Paradise Hive", cost: "500 Pollen" } ],
    tags: [],
  },
  {
    n: "02", key: "forest", name: "Forest", accent: "#2D6A4F",
    blurb: "Thicker trees, bigger hives.",
    image: "https://files.catbox.moe/ehuc4z.png",
    features: [ { label: "Upgrade Machine", popup: "https://files.catbox.moe/7wv16t.png" } ],
    hives: [ { name: "Forest Hive", cost: "2K Pollen" }, { name: "Mantus Hive", cost: "4K Pollen" } ],
    tags: [],
  },
  {
    n: "03", key: "magic", name: "Magic Forest", accent: "#9D4EDD",
    blurb: "Fruit, amulets and eggs get crafted here.",
    image: "https://files.catbox.moe/bs1u0w.png",
    features: [ { label: "The Blender — craft fruit & amulets", popup: "https://files.catbox.moe/ub3trq.png" } ],
    hives: [ { name: "Mushroom Hive", cost: "7K Pollen" }, { name: "Buzzy Hive", cost: "10K Pollen" } ],
    tags: [],
  },
  {
    n: "04", key: "snow", name: "Snow Land", accent: "#6FD3E8",
    blurb: "Bundle up — the Polar Bears are watching.",
    image: "https://files.catbox.moe/r48ww0.png",
    features: [ { label: "Polar Bear Quests", popup: "https://files.catbox.moe/2sbb3t.png" } ],
    hives: [ { name: "Ice Hive", cost: "15K Pollen" }, { name: "Snow Man Hive", cost: "30K Pollen" } ],
    tags: [],
  },
  {
    n: "05", key: "fire", name: "Fire Land", accent: "#E8402A",
    blurb: "Everything gets hotter from here — including the grind.",
    image: "https://files.catbox.moe/pj7af5.png",
    features: [],
    hives: [ { name: "Demon Hive", cost: "60K Pollen" }, { name: "Lava Hive", cost: "100K Pollen" } ],
    tags: [ { label: "Rebirth 1 / 2", type: "rebirth", popup: "https://files.catbox.moe/ybw6ow.png" } ],
  },
  {
    n: "06", key: "jungle", name: "Jungle", accent: "#1B7A3D",
    blurb: "Deep, dense, and colorful.",
    image: "https://files.catbox.moe/t3zof0.png",
    features: [
      { label: "Scientist Bear Quests", popup: "https://files.catbox.moe/wlofnk.png" },
      { label: "Rainbow Machine", popup: "https://files.catbox.moe/iu8g4i.png" },
    ],
    hives: [ { name: "Jungle Hive", cost: "200K Pollen" }, { name: "Magical Jungle Hive", cost: "350K Pollen" } ],
    tags: [],
  },
  {
    n: "07", key: "mines", name: "Mines", accent: "#B08968",
    blurb: "Dig deep for Pollen.",
    image: "https://files.catbox.moe/m9dbx5.png",
    features: [],
    hives: [ { name: "Crystal Hive", cost: "550K Pollen" }, { name: "Mine Hive", cost: "700K Pollen" } ],
    tags: [],
  },
  {
    n: "08", key: "caves", name: "Caves", accent: "#7A4EA8",
    blurb: "Something's hiding in the dark down here.",
    image: "https://files.catbox.moe/3a6ybe.png",
    features: [],
    hives: [ { name: "Cave Hive", cost: "2M Pollen" }, { name: "Magic Crystal Hive", cost: "3M Pollen" } ],
    tags: [ { label: "Secret Area", type: "secret", popup: "https://files.catbox.moe/ixn1rw.png" } ],
  },
  {
    n: "09", key: "beach", name: "Beach", accent: "#F4A94B",
    blurb: "Sun, sand, and a second shot at Rebirth.",
    image: "https://files.catbox.moe/mb1gve.png",
    features: [],
    hives: [ { name: "Beach Hive", cost: "5M Pollen" }, { name: "Sand Castle Hive", cost: "7M Pollen" } ],
    tags: [ { label: "Rebirth 2 / 2", type: "rebirth", popup: "https://files.catbox.moe/0bzxu5.png" } ],
  },
  {
    n: "10", key: "pacific", name: "Pacific Ocean", accent: "#2E86C1",
    blurb: "Out past the shoreline.",
    image: "https://files.catbox.moe/kjsayl.png",
    features: [ { label: "Aqua Bear Quests", popup: "https://files.catbox.moe/dxaxw4.png" } ],
    hives: [ { name: "Pacific Hive", cost: "15M Pollen" }, { name: "Dark Ocean Hive", cost: "30M Pollen" } ],
    tags: [],
  },
  {
    n: "11", key: "abyss", name: "The Abyss Ocean", accent: "#35D0E8",
    blurb: "As deep as it gets. For now.",
    image: "https://files.catbox.moe/jazfwc.png",
    features: [],
    hives: [ { name: "The Abyss Hive", cost: "60M Pollen" } ],
    tags: [ { label: "Final Zone", type: "final" } ],
  },
];

/* rank determines the glow color tier on the credits page */
const STAFF = [
  { user: "itshumbe",        role: "Owner",                       rank: 1, sub: "Creator / Founder Of 17Games!" },
  { user: "q_qty",           role: "CEO",                          rank: 2 },
  { user: "dark_gamer0yt",   role: "CTO",                          rank: 2 },
  { user: "OneTech",         role: "COO",                          rank: 2 },
  { user: "nikolajc2008",    role: "Head Of Staff",                rank: 3 },
  { user: "petere1711",      role: "Deputy Head Of Staff",         rank: 4 },
  { user: "nathan",          role: "Assistant Head Of Staff",      rank: 4, sub: "Creator Of The Website", displayName: "30000000000000" },
];

const DEVELOPERS = [
  { user: "itshumbe",        role: "Developer", sub: "Creator / Founder Of 17Games!" },
  { user: "dark_gamer0yt",   role: "Developer" },
  { user: "print_invictus",  role: "Developer" },
  { user: "q_qty",           role: "Developer" },
  { user: "wdnter",          role: "Developer" },
  { user: "stormy_vfx",      role: "Developer" },
];
