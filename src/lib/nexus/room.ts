export type OverlayId =
  | "clock"
  | "library"
  | "arcade"
  | "weather"
  | "files"
  | "plan"
  | "ide"
  | "sim"
  | "biz";

export type ObjectId = OverlayId | "coffee" | "plant" | "lamp" | "phone";

export type DockTab = "chat" | "lab" | "govern";

/** Furniture → the dock room that makes the tap make sense. */
export const OBJECT_TAB: Partial<Record<ObjectId, DockTab>> = {
  sim: "govern",
  ide: "lab",
  files: "govern",
  coffee: "chat",
  plant: "chat",
};

export const OBJECT_HINT: Record<ObjectId, string> = {
  clock: "Wall clock. World time and a stopwatch.",
  library: "Shelf is live. Open a book, or ask the net from here.",
  arcade: "Arcade hall. RIX forges cabinets. Tap a machine. SHIP needs AUTH.",
  weather: "Window looks outside. Live weather — no waiting on chat.",
  files: "Security center. Last hash, lab checks, halt. Repair is LAB. You still hold COMMIT.",
  plan: "Horizon board. THINK / AUTH / COMMIT plus the live map. T4–T5 are capped.",
  ide: "Engineer's monitor. Edit, TEST, RUN. This office, not a cloud IDE.",
  sim: "Plant board. LOW AT / BUY. Short inbound parks a HOLD. AUTO AUTH. COMMIT needs a signed rule or you.",
  biz: "Shop desk. Your Cash App / PayPal / Venmo. We don't take money.",
  coffee: "Sip taken. Gold +1. Break authorized.",
  plant: "Fern is fine. The plant board is the center table — STOCK, rules, HOLD.",
  lamp: "Lights: on, night, ops phosphor.",
  phone: "Shop rails. Drop a handle, then publish into the lab.",
};

export type Book = {
  id: string;
  title: string;
  spine: "bg-gold" | "bg-ok" | "bg-danger" | "bg-cream" | "bg-wall-deep";
  pages: string[];
  ask?: string;
};

export const LIBRARY: Book[] = [
  {
    id: "map",
    title: "Floor Map",
    spine: "bg-cream",
    pages: [
      "Tier 1 is live: clock, weather, books, lamp, mug, search, board, IDE, files, stopwatch.",
      "Rooms: FLOOR, PLAY (arcade), SHOW (entertainment: tapes / YouTube / chess / jukebox / Steam), DESK (exchange), STACK (library), LAB (compute), PROOF (security), CORE (SESA kernel). Files CRT opens the gate hall.",
      "Tier 2–3 run here as paper/local: builds in the lab, plant watches, shop rails, audit hash, arcade cabinets, crew handoffs. AUTO may AUTH. COMMIT needs a signed cap or you.",
      "Ask reception 'what can it do' or 'list all functions' for the honest catalog.",
    ],
    ask: "What can this office actually execute right now?",
  },
  {
    id: "sesa",
    title: "SESA Spec",
    spine: "bg-ok",
    pages: [
      "Sovereign Epistemic System Architecture. Offline, deterministic, fail-closed.",
      "VSA: D=10,000 bipolar ±1. Bind is Hadamard. Unbind is the same multiply. Cosine = dot/D.",
      "SMT / AC-3: cohesion ≥ 0.95, known symbols, lock open. Unknown keys are pruned. No silent dispatch.",
      "Ring is in-process and replayable. Merkle is local SHA/FNV. Governor is you. Not mmap, not Godot, not a chain.",
      "Lifecycle: ENCODE → BIND → SMT → GOVERN COMMIT → CHECKPOINT. SNAP undoes the last verified frame.",
    ],
    ask: "take me to nexus core",
  },
  {
    id: "weather",
    title: "Sky Almanac",
    spine: "bg-ok",
    pages: [
      "The window is wired to Open-Meteo. Tap it for live temperature, wind, and sky code.",
      "Reception can still chase a city if you ask: how's the weather in the Bahamas.",
    ],
    ask: "How's the weather in the Bahamas right now?",
  },
  {
    id: "build",
    title: "Build Notes",
    spine: "bg-danger",
    pages: [
      "A long-horizon build locks a plan with owners and tests, then engineering writes the lab IDE.",
      "Ask for Floorcast (local video grid), a landing page, or a calculator. The floor does not wait to be told twice. It is not YouTube.",
    ],
    ask: "Build a video grid demo in the lab IDE with a home feed, a player, and a search bar. Finish the tests.",
  },
  {
    id: "kernel",
    title: "Kernel",
    spine: "bg-danger",
    pages: [
      "VERIFIED on this floor: command desk, crew roles, THINK → AUTH → COMMIT, lab files, TEST, paper trade, plant watches, hashed audit, arcade forge, local tapes.",
      "COMING — not pretended: live sandbox deploy, production rollback, multi-model router, secret manager, plugin marketplace, unsupervised company loop.",
      "MODEL ≠ AUTHORITY. Verification is a check, not a claim. You hold the key.",
    ],
  },
  {
    id: "ware",
    title: "Ware Constant",
    spine: "bg-wall-deep",
    pages: [
      "W ≈ 0.08 is research phenomenology (CFT / IQG notes), not this runtime.",
      "Do not treat paper repos as live twins. This office absorbs the loop, not the physics claims.",
    ],
  },
  {
    id: "double",
    title: "Digital Double",
    spine: "bg-cream",
    pages: [
      "Workforce is typed roles and a queue. Assign, then complete. No autonomy claim.",
      "Reception routes. Manager plans. Engineer writes. QA checks. You authorize the commit.",
    ],
  },
  {
    id: "net",
    title: "Open Network",
    spine: "bg-ok",
    pages: [
      "Agents that build may search the public web. Weather, news, and current facts go through search_web.",
      "Type a question in the dock, or send one from this shelf.",
    ],
  },
];

const SKY: Record<number, string> = {
  0: "Clear",
  1: "Mainly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Fog",
  48: "Rime fog",
  51: "Light drizzle",
  61: "Rain",
  63: "Rain",
  65: "Heavy rain",
  71: "Snow",
  80: "Showers",
  95: "Thunder",
};

export function skyLabel(code: number) {
  if (SKY[code]) return SKY[code];
  if (code >= 51 && code < 68) return "Rain";
  if (code >= 71 && code < 78) return "Snow";
  if (code >= 80 && code < 83) return "Showers";
  if (code >= 95) return "Thunder";
  return "Sky " + code;
}

export type WeatherSnap = {
  place: string;
  country: string;
  temp: number;
  wind: number;
  code: number;
  label: string;
  time: string;
};

export async function fetchWeather(place: string): Promise<WeatherSnap> {
  const q = place.trim() || "Nassau";
  const geoRes = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(q)}&count=1`,
  );
  if (!geoRes.ok) throw new Error("Geocoding failed");
  const geo = (await geoRes.json()) as {
    results?: { name: string; country: string; latitude: number; longitude: number }[];
  };
  const hit = geo.results?.[0];
  if (!hit) throw new Error(`No place named ${q}`);
  const wxRes = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${hit.latitude}&longitude=${hit.longitude}&current=temperature_2m,weather_code,wind_speed_10m`,
  );
  if (!wxRes.ok) throw new Error("Forecast failed");
  const wx = (await wxRes.json()) as {
    current?: { temperature_2m: number; weather_code: number; wind_speed_10m: number; time: string };
  };
  const cur = wx.current;
  if (!cur) throw new Error("No current weather");
  return {
    place: hit.name,
    country: hit.country,
    temp: cur.temperature_2m,
    wind: cur.wind_speed_10m,
    code: cur.weather_code,
    label: skyLabel(cur.weather_code),
    time: cur.time,
  };
}

export const WORLD_CLOCKS = [
  { id: "nassau", label: "Nassau", tz: "America/Nassau" },
  { id: "utc", label: "UTC", tz: "UTC" },
  { id: "tokyo", label: "Tokyo", tz: "Asia/Tokyo" },
  { id: "london", label: "London", tz: "Europe/London" },
] as const;
