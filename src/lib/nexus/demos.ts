import type { PlanStep } from "./knowledge.ts";

export type DemoId = "video" | "landing" | "calc";

export type Demo = {
  id: DemoId;
  title: string;
  files: Record<string, string>;
  plan: PlanStep[];
  summary: string;
};

const VIDEO_HTML = `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Floorcast</title>
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>
    <header class="bar">
      <p class="mark">FLOORCAST</p>
      <input id="q" type="search" placeholder="Search tapes" aria-label="Search tapes" />
    </header>
    <main>
      <section id="grid" class="grid" aria-label="Tape grid"></section>
      <aside id="player" class="player" hidden>
        <button type="button" id="back" class="ghost">Back to grid</button>
        <div id="stage" class="stage" data-playing="0"><span id="glyph">▶</span></div>
        <h1 id="title">Tape</h1>
        <p id="meta" class="muted"></p>
        <button type="button" id="play">Play</button>
        <h2>Related</h2>
        <ul id="related" class="side"></ul>
        <h2>Comments</h2>
        <form id="comment">
          <input id="note" maxlength="80" placeholder="Leave a note" aria-label="Comment" />
          <button type="submit">Post</button>
        </form>
        <ul id="comments"></ul>
      </aside>
    </main>
    <script src="main.js"></script>
  </body>
</html>`;

const VIDEO_CSS = `*{box-sizing:border-box}
body{margin:0;font-family:ui-sans-serif,system-ui,sans-serif;background:#111110;color:#e6e1d6}
.bar{display:flex;gap:12px;align-items:center;padding:12px 16px;border-bottom:1px solid #2a2824;position:sticky;top:0;background:#111110}
.mark{margin:0;letter-spacing:.18em;font-size:11px;color:#c5c0b4}
#q{flex:1;min-height:44px;border:1px solid #2a2824;background:#1a1916;color:#e6e1d6;padding:0 12px}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:12px;padding:16px}
.card{background:#1a1916;border:1px solid #2a2824;padding:0;text-align:left;min-height:44px;color:inherit}
.thumb{height:88px;display:grid;place-items:center;font-size:28px}
.card h3,.card p{margin:8px 10px;font-size:14px}
.card p{color:#8a8580;font-size:12px}
.player{padding:16px}
.stage{height:180px;display:grid;place-items:center;background:#23211e;border:1px solid #2a2824;margin:12px 0}
.stage[data-playing="1"]{animation:roll 1.2s linear infinite}
@keyframes roll{from{filter:hue-rotate(0)}to{filter:hue-rotate(360deg)}}
.ghost,button{min-height:44px;padding:0 14px;border:0;background:#c5c0b4;color:#111110;font-weight:700}
.ghost{background:transparent;color:#c5c0b4;padding:0}
.side,.player ul{list-style:none;margin:0;padding:0}
.side button,.player li{display:block;width:100%;text-align:left;background:#1a1916;color:#e6e1d6;margin:6px 0;padding:10px;border:1px solid #2a2824}
#comment{display:flex;gap:8px;margin:8px 0}
#note{flex:1;min-height:44px;border:1px solid #2a2824;background:#1a1916;color:#e6e1d6;padding:0 10px}
.muted{color:#8a8580}
h1{font-size:22px;margin:8px 0}
h2{font-size:13px;letter-spacing:.12em;color:#c5c0b4}`;

const VIDEO_JS = `const TAPES=[
  {id:"w",title:"Ware Constant walk",ch:"KITE",views:"1.2k",hue:28,note:"Phenomenology, not this runtime."},
  {id:"g",title:"Gate fail-closed",ch:"NYX",views:"880",hue:150,note:"No silent execute."},
  {id:"s",title:"SCAN SNAP SUNDER",ch:"VEX",views:"640",hue:200,note:"Look up, plan, write."},
  {id:"p",title:"Paper desk",ch:"ASH",views:"410",hue:42,note:"Coinbase mark. Local fill."},
  {id:"l",title:"Lab night shift",ch:"RIX",views:"990",hue:310,note:"Edit, TEST, RUN."},
  {id:"h",title:"Holds and drains",ch:"HAL",views:"220",hue:90,note:"Oldest first."},
  {id:"a",title:"Arcade idle",ch:"MOLT",views:"1.8k",hue:0,note:"Paddle stays local."},
  {id:"c",title:"Clean room hash",ch:"NYX",views:"70",hue:170,note:"If it isn't hashed it didn't happen."}
];
const grid=document.getElementById("grid");
const player=document.getElementById("player");
const q=document.getElementById("q");
const comments=document.getElementById("comments");
const related=document.getElementById("related");
const stage=document.getElementById("stage");
const play=document.getElementById("play");
let current=TAPES[0];
function paint(list){
  grid.innerHTML=list.map(t=>'<button class="card" data-id="'+t.id+'"><div class="thumb" style="background:hsl('+t.hue+' 18% 22%)">▶</div><h3>'+t.title+'</h3><p>'+t.ch+' · '+t.views+'</p></button>').join("")||"<p class='muted'>No tapes match.</p>";
}
function openTape(id){
  current=TAPES.find(t=>t.id===id)||TAPES[0];
  grid.hidden=true;
  player.hidden=false;
  document.getElementById("title").textContent=current.title;
  document.getElementById("meta").textContent=current.ch+" · "+current.views+" · "+current.note;
  stage.style.background="hsl("+current.hue+" 18% 22%)";
  stage.dataset.playing="0";
  play.textContent="Play";
  related.innerHTML=TAPES.filter(t=>t.id!==current.id).slice(0,3).map(t=>'<li><button type="button" data-id="'+t.id+'">'+t.title+'</button></li>').join("");
  comments.innerHTML="<li>"+current.ch+": first note on this tape.</li>";
}
function showGrid(){
  player.hidden=true;
  grid.hidden=false;
  stage.dataset.playing="0";
}
paint(TAPES);
q.addEventListener("input",()=>{
  const n=q.value.trim().toLowerCase();
  showGrid();
  paint(TAPES.filter(t=>!n||t.title.toLowerCase().includes(n)||t.ch.toLowerCase().includes(n)));
});
grid.addEventListener("click",e=>{
  const b=e.target.closest("[data-id]");
  if(b) openTape(b.getAttribute("data-id"));
});
related.addEventListener("click",e=>{
  const b=e.target.closest("[data-id]");
  if(b) openTape(b.getAttribute("data-id"));
});
document.getElementById("back").onclick=showGrid;
play.onclick=()=>{
  const on=stage.dataset.playing==="1";
  stage.dataset.playing=on?"0":"1";
  play.textContent=on?"Play":"Pause";
};
document.getElementById("comment").onsubmit=e=>{
  e.preventDefault();
  const v=document.getElementById("note").value.trim();
  if(!v) return;
  const li=document.createElement("li");
  li.textContent="YOU: "+v;
  comments.prepend(li);
  document.getElementById("note").value="";
};`;

const LANDING_HTML = `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>NEXUS landing</title>
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>
    <p class="kicker">ADL NEXUS</p>
    <h1>The office is the product</h1>
    <p class="lede">Tap the floor. Crew walks. You hold COMMIT.</p>
    <section class="cards">
      <article><h2>Think</h2><p>Reality state before anyone moves.</p></article>
      <article><h2>Authorize</h2><p>Fail-closed. AI advises.</p></article>
      <article><h2>Commit</h2><p>Named pathway. Hashed memory.</p></article>
    </section>
    <button type="button" id="go">Arm the desk</button>
    <p id="status">Idle.</p>
    <script src="main.js"></script>
  </body>
</html>`;

const LANDING_CSS = `*{box-sizing:border-box}
body{margin:0;padding:28px;font-family:ui-sans-serif,system-ui,sans-serif;background:#111110;color:#e6e1d6}
.kicker{letter-spacing:.16em;font-size:11px;color:#c5c0b4}
h1{font-size:32px;margin:8px 0}
.lede{color:#8a8580;max-width:28rem}
.cards{display:grid;gap:12px;margin:24px 0}
article{background:#1a1916;border:1px solid #2a2824;padding:16px}
button{min-height:44px;padding:0 18px;border:0;background:#3d8f6e;color:#e6e1d6;font-weight:700}
#status{color:#c5c0b4}`;

const LANDING_JS = `const b=document.getElementById("go");
const s=document.getElementById("status");
let on=false;
b.onclick=()=>{
  on=!on;
  b.textContent=on?"Desk armed":"Arm the desk";
  s.textContent=on?"Standing authorize is local. You still own the key.":"Idle.";
};`;

const CALC_HTML = `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Lab calc</title>
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>
    <h1>Lab calc</h1>
    <p id="out">0</p>
    <div id="pad" class="pad"></div>
    <script src="main.js"></script>
  </body>
</html>`;

const CALC_CSS = `body{margin:0;padding:24px;font-family:ui-monospace,monospace;background:#111110;color:#e6e1d6}
#out{font-size:36px;min-height:48px}
.pad{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;max-width:280px}
.pad button{min-height:44px;border:1px solid #2a2824;background:#1a1916;color:#e6e1d6}`;

const CALC_JS = `const keys=["7","8","9","/","4","5","6","*","1","2","3","-","0",".","=","+","C"];
const pad=document.getElementById("pad");
const out=document.getElementById("out");
let expr="";
pad.innerHTML=keys.map(k=>'<button type="button" data-k="'+k+'">'+k+"</button>").join("");
pad.onclick=e=>{
  const k=e.target.getAttribute("data-k");
  if(!k) return;
  if(k==="C"){expr="";out.textContent="0";return;}
  if(k==="="){
    try{expr=String(Function('"use strict";return ('+expr+")")());}
    catch{expr="";out.textContent="err";return;}
    out.textContent=expr||"0";
    return;
  }
  expr+=k;
  out.textContent=expr;
};`;

function steps(rows: [string, string, string][]): PlanStep[] {
  return rows.map((r, i) => ({
    id: `s${i + 1}`,
    title: r[0],
    owner: r[1],
    test: r[2],
    done: true,
  }));
}

export const DEMOS: Record<DemoId, Demo> = {
  video: {
    id: "video",
    title: "Floorcast",
    files: { "index.html": VIDEO_HTML, "styles.css": VIDEO_CSS, "main.js": VIDEO_JS },
    plan: steps([
      ["Header + search", "pm", "search input exists"],
      ["Tape grid", "cpo", "grid of local tapes"],
      ["Player stage", "engineer", "click-to-play"],
      ["Related sidebar", "engineer", "related list"],
      ["Comments", "qa", "post a note"],
      ["QA sign-off", "qa", "lab tests pass"],
    ]),
    summary: "Floorcast is in the lab. Search, grid, player, related, comments. Local tapes — not YouTube.",
  },
  landing: {
    id: "landing",
    title: "Landing",
    files: { "index.html": LANDING_HTML, "styles.css": LANDING_CSS, "main.js": LANDING_JS },
    plan: steps([
      ["Heading", "pm", "h1 on the page"],
      ["Three cards", "cpo", "Think / Authorize / Commit"],
      ["Working button", "engineer", "toggles status"],
      ["QA sign-off", "qa", "lab tests pass"],
    ]),
    summary: "Landing page in the lab. Heading, three cards, working button.",
  },
  calc: {
    id: "calc",
    title: "Calc",
    files: { "index.html": CALC_HTML, "styles.css": CALC_CSS, "main.js": CALC_JS },
    plan: steps([
      ["Pad layout", "pm", "digit keys"],
      ["Evaluate", "engineer", "equals works"],
      ["Clear", "qa", "C resets"],
    ]),
    summary: "Lab calculator shipped. Local only.",
  },
};

export function matchDemo(goal: string): Demo | null {
  const t = goal.toLowerCase();
  if (/\b(youtube|video grid|floorcast|home feed|tape grid)\b/.test(t)) return DEMOS.video;
  if (/\b(player.{0,24}sidebar|sidebar.{0,24}comments)\b/.test(t)) return DEMOS.video;
  if (/\blanding\b/.test(t)) return DEMOS.landing;
  if (/\b(calculator|\bcalc\b)\b/.test(t)) return DEMOS.calc;
  return null;
}
