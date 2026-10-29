/** Tiny apps the lab can actually run in the office iframe. Nothing ships until COMMIT. */
export type LabAppId = "counter" | "list" | "clock" | "stock";

export const LAB_APPS: Record<LabAppId, { chip: string; blurb: string; files: Record<string, string> }> = {
  counter: {
    chip: "COUNTER",
    blurb: "Add and subtract",
    files: {
      "index.html": `<!doctype html>
<html>
<head><meta charset="utf-8"><link rel="stylesheet" href="styles.css"></head>
<body>
  <p class="kicker">NEXUS LAB</p>
  <h1 id="n">0</h1>
  <button id="add" type="button">ADD</button>
  <button id="sub" type="button">SUB</button>
  <script src="main.js"></script>
</body>
</html>`,
      "styles.css": `body{margin:0;background:#111110;color:#e6e1d6;font-family:ui-monospace,monospace;padding:24px}
h1{font-size:64px;margin:8px 0}
button{background:#e6e1d6;color:#111110;border:0;padding:12px 18px;margin-right:8px;font-weight:700}
.kicker{letter-spacing:.2em;font-size:12px;color:#8a8580}`,
      "main.js": `let n = 0;
const out = document.getElementById("n");
function draw(){ out.textContent = String(n); }
document.getElementById("add").onclick = () => { n += 1; draw(); };
document.getElementById("sub").onclick = () => { n -= 1; draw(); };
draw();`,
    },
  },
  list: {
    chip: "LIST",
    blurb: "Lines you can tap off",
    files: {
      "index.html": `<!doctype html>
<html>
<head><meta charset="utf-8"><link rel="stylesheet" href="styles.css"></head>
<body>
  <p class="kicker">NEXUS LAB</p>
  <form id="f"><input id="q" placeholder="Add a line" autocomplete="off"><button>ADD</button></form>
  <ul id="list"></ul>
  <script src="main.js"></script>
</body>
</html>`,
      "styles.css": `body{margin:0;background:#111110;color:#e6e1d6;font-family:ui-sans-serif,system-ui;padding:20px}
form{display:flex;gap:8px}input{flex:1;background:#181716;color:#e6e1d6;border:1px solid #3a4644;padding:10px}
button{background:#e6e1d6;color:#111110;border:0;padding:10px 14px;font-weight:700}
li{padding:8px 0;border-bottom:1px solid #2a2926;cursor:pointer}
.kicker{letter-spacing:.18em;font-size:12px;color:#8a8580}`,
      "main.js": `const list = document.getElementById("list");
const q = document.getElementById("q");
document.getElementById("f").onsubmit = (e) => {
  e.preventDefault();
  const text = q.value.trim();
  if (!text) return;
  const li = document.createElement("li");
  li.textContent = text;
  li.onclick = () => li.remove();
  list.appendChild(li);
  q.value = "";
};`,
    },
  },
  clock: {
    chip: "CLOCK",
    blurb: "The time, in the preview",
    files: {
      "index.html": `<!doctype html>
<html>
<head><meta charset="utf-8"><link rel="stylesheet" href="styles.css"></head>
<body>
  <p class="kicker">NEXUS LAB</p>
  <h1 id="t">--:--:--</h1>
  <p id="d"></p>
  <script src="main.js"></script>
</body>
</html>`,
      "styles.css": `body{margin:0;background:#111110;color:#e6e1d6;font-family:ui-monospace,monospace;padding:24px}
h1{font-size:42px;margin:8px 0}p{color:#8a8580}
.kicker{letter-spacing:.2em;font-size:12px}`,
      "main.js": `function tick(){
  const d = new Date();
  document.getElementById("t").textContent = d.toLocaleTimeString();
  document.getElementById("d").textContent = d.toDateString();
}
tick();
setInterval(tick, 250);`,
    },
  },
  stock: {
    chip: "STOCK",
    blurb: "A bench inventory",
    files: {
      "index.html": `<!doctype html>
<html>
<head><meta charset="utf-8"><link rel="stylesheet" href="styles.css"></head>
<body>
  <p class="kicker">BENCH INVENTORY</p>
  <form id="f">
    <input id="sku" placeholder="Item" autocomplete="off">
    <input id="qty" type="number" min="1" value="1">
    <button>ADD</button>
  </form>
  <ul id="list"></ul>
  <p id="sum">0 items · 0 units</p>
  <script src="main.js"></script>
</body>
</html>`,
      "styles.css": `body{margin:0;background:#111110;color:#e6e1d6;font-family:ui-sans-serif,system-ui;padding:20px}
form{display:flex;gap:8px;flex-wrap:wrap}input{background:#181716;color:#e6e1d6;border:1px solid #3a4644;padding:10px;min-width:0}
#sku{flex:1}#qty{width:5rem}
button{background:#e6e1d6;color:#111110;border:0;padding:10px 14px;font-weight:700}
li{display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid #2a2926;cursor:pointer}
.kicker{letter-spacing:.18em;font-size:12px;color:#8a8580}`,
      "main.js": `const list = document.getElementById("list");
const sku = document.getElementById("sku");
const qty = document.getElementById("qty");
const sum = document.getElementById("sum");
const rows = [];
function draw(){
  list.replaceChildren();
  let units = 0;
  rows.forEach((row, i) => {
    units += row.qty;
    const li = document.createElement("li");
    li.textContent = row.sku + "  ·  " + row.qty;
    li.title = "Remove";
    li.onclick = () => { rows.splice(i, 1); draw(); };
    list.appendChild(li);
  });
  sum.textContent = rows.length + " items · " + units + " units. Tap a line to remove.";
}
document.getElementById("f").onsubmit = (e) => {
  e.preventDefault();
  const name = sku.value.trim();
  const n = Math.max(1, Number(qty.value) || 1);
  if (!name) return;
  const hit = rows.find((r) => r.sku.toLowerCase() === name.toLowerCase());
  if (hit) hit.qty += n;
  else rows.push({ sku: name, qty: n });
  sku.value = "";
  draw();
};
draw();`,
    },
  },
};
