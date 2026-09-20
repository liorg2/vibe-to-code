/* ---- state ---- */
const KEY = "vibe2code.v2";
const LS = { get: k => { try { return localStorage.getItem(k) } catch { return null } },
             set: (k, v) => { try { localStorage.setItem(k, v) } catch {} } };
let lang   = LS.get(KEY + ".lang")  || "en";
let theme  = LS.get(KEY + ".theme") || "dark";
let done   = new Set(JSON.parse(LS.get(KEY + ".done")  || "[]"));
let ticked = new Set(JSON.parse(LS.get(KEY + ".check") || "[]"));
let filter = "";
let answers = {};                                 // quiz answers for the open module
let card = 0, flipped = false;                    // flashcard review state

const $    = s => document.querySelector(s);
const tid  = (m, i) => m.id + ":" + i;
const esc  = s => String(s).replace(/[&<>]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]));
const t    = k => UI[k][lang];
const total = () => MODULES.reduce((n, m) => n + m.terms.length, 0);
const mins  = m => Math.max(3, Math.round(m.terms.length * 1.6));
const para  = s => s.split("\n\n").map(p => `<p>${esc(p)}</p>`).join("");
const byId  = id => MODULES.find(m => m.id === id);

function save() {
  LS.set(KEY + ".done", JSON.stringify([...done]));
  LS.set(KEY + ".check", JSON.stringify([...ticked]));
  LS.set(KEY + ".lang", lang);
  LS.set(KEY + ".theme", theme);
  if (window.cloudSave) window.cloudSave(window.vibeState.read());
}

// read/write hooks for auth.js; absent config, nothing ever calls them
window.vibeState = {
  read: () => ({ done: [...done], ticked: [...ticked] }),
  write: s => { done = new Set(s.done || []); ticked = new Set(s.ticked || []); save(); render(); }
};

/* ---- routing: #/  #/<mod>  #/<mod>/<termIndex>  #/project  #/checklist
                 #/glossary  #/review  #/architectures  #/architectures/<id> ---- */
const route = () => {
  const p = location.hash.replace(/^#\/?/, "").split("/").filter(Boolean);
  return { id: p[0] || "", sub: p[1], n: p[1] !== undefined ? parseInt(p[1], 10) : null };
};

const PAGES = { project: PROJECT, checklist: CHECKLIST, architectures: ARCHITECTURES };

/* ---- pieces ---- */
const termCard = (m, i, tm) => `
  <a class="term ${done.has(tid(m, i)) ? "done" : ""}" href="#/${m.id}/${i}" data-k="${tid(m, i)}">
    <button class="chk" title="${esc(t("got"))}">&#10003;</button>
    <h4>${esc(tm.t[lang])}</h4>
    <p>${esc(tm.d[lang])}</p>
    <div class="more">${esc(t("open"))} &rarr;</div>
  </a>`;

const modHead = (m, mi) => {
  const d = m.terms.filter((_, i) => done.has(tid(m, i))).length;
  return `<div class="mhead">
    <div class="ic">${m.icon}</div>
    <div><h2>${String(mi + 1).padStart(2, "0")}. ${esc(m.title[lang])}</h2></div>
    <div class="n">${d}/${m.terms.length} ${esc(t("terms"))}<br>~${mins(m)} ${esc(t("min"))}</div>
  </div>
  <p class="mblurb">${esc(m.blurb[lang])}</p>`;
};

const promptBox = (id, text, label) => `
  <div class="promptbox">
    <div class="lbl">${esc(label)}</div>
    <button class="btn copy" data-copy="${id}">${esc(t("copy"))}</button>
    <pre class="code" id="p${id}">${esc(text)}</pre>
  </div>`;

const httpFlowHtml = () => `
  <div class="http-flow" aria-hidden="true">
    <div class="hf-cap">${esc(t("hfCap"))}</div>
    <div class="hf-row">
      <div class="hf-node hf-client">${esc(t("hfClient"))}</div>
      <div class="hf-track">
        <div class="hf-packet hf-req">${esc(t("hfReq"))}</div>
        <div class="hf-packet hf-res">${esc(t("hfRes"))}</div>
      </div>
      <div class="hf-node hf-server">${esc(t("hfServer"))}</div>
    </div>
  </div>`;

function quizHtml(modId) {
  const qs = QUIZ[modId]; if (!qs) return "";
  const got = qs.filter((_, i) => answers[i] === qs[i].c).length;
  const answered = qs.filter((_, i) => answers[i] !== undefined).length;
  return `<div class="quiz">
    <h3>${esc(t("test"))}</h3>
    <p class="sub">${esc(t("testSub"))}</p>
    ${qs.map((q, qi) => {
      const pick = answers[qi];
      return `<div class="q">
        <div class="qt"><i>${qi + 1}.</i>${esc(q.q[lang])}</div>
        ${q.a.map((a, ai) => {
          let cls = "", mk = "";
          if (pick !== undefined) {
            if (ai === q.c) { cls = "right"; mk = "&#10003;"; }
            else if (ai === pick) { cls = "wrong"; mk = "&times;"; }
          }
          return `<button class="opt ${cls}" data-q="${qi}" data-a="${ai}"
            ${pick !== undefined ? "disabled" : ""}>
            <span class="mk">${mk}</span>${esc(a[lang])}</button>`;
        }).join("")}
        ${pick !== undefined ? `<div class="ans">${esc(q.why[lang])}</div>` : ""}
      </div>`;
    }).join("")}
    ${answered === qs.length
      ? `<div class="score ${got === qs.length ? "pass" : ""}">${got} / ${qs.length}${
          got === qs.length ? " &mdash; " + esc(t("perfect")) : ""}</div>`
      : ""}
  </div>`;
}

/* ---- pages ---- */
function homePage() {
  const extra = [
    { m: PROJECT,       sub: t("capstone") },
    { m: ARCHITECTURES, sub: t("more") },
    { m: CHECKLIST,     sub: t("beforeShip") },
  ].filter(x => x.m && x.m.id);

  const paths = `<section class="paths">
    <div class="phead"><h3>${esc(t("paths"))}</h3><p>${esc(t("pathsSub"))}</p></div>
    <div class="pgrid">${PATHS.map(p => {
      const mods = p.mods.map(id => byId(id) || PAGES[id]).filter(Boolean);
      const terms = mods.reduce((n, m) => n + (m.terms ? m.terms.length : 0), 0);
      const d = mods.reduce((n, m) => n + (m.terms
        ? m.terms.filter((_, i) => done.has(tid(m, i))).length : 0), 0);
      return `<a class="path" href="#/${p.mods[0]}">
        <div class="row"><span class="ic">${p.icon}</span><h4>${esc(p.title[lang])}</h4></div>
        <p>${esc(p.blurb[lang])}</p>
        <div class="chips">${mods.map(m => `<span>${esc(m.title[lang])}</span>`).join("")}</div>
        <div class="mini"><i style="width:${terms ? d / terms * 100 : 0}%"></i></div>
      </a>`;
    }).join("")}</div>
  </section>`;

  return paths + `<div class="cards">${MODULES.map((m, i) => {
    const d = m.terms.filter((_, j) => done.has(tid(m, j))).length;
    return `<a class="mcard" href="#/${m.id}">
      <div class="row"><div class="ic">${m.icon}</div>
        <div><div class="num">${esc(t("lesson"))} ${String(i + 1).padStart(2, "0")} &middot; ~${mins(m)} ${esc(t("min"))}</div>
        <h3>${esc(m.title[lang])}</h3></div></div>
      <p>${esc(m.blurb[lang])}</p>
      <div class="mini"><i style="width:${d / m.terms.length * 100}%"></i></div>
      <span class="cnt">${d}/${m.terms.length} ${esc(t("terms"))}</span>
    </a>`;
  }).join("") + extra.map(({ m, sub }) => `
    <a class="mcard special" href="#/${m.id}">
      <div class="row"><div class="ic">${m.icon}</div>
        <div><div class="num">${esc(sub)}</div><h3>${esc(m.title[lang])}</h3></div></div>
      <p>${esc(m.blurb[lang])}</p>
    </a>`).join("")}</div>`;
}

function modulePage(m, mi) {
  const prev = MODULES[mi - 1], next = MODULES[mi + 1];
  const nextLink = next ? `#/${next.id}` : `#/architectures`;
  const nextName = next ? next.title[lang] : ARCHITECTURES.title[lang];
  return `<a class="crumb" href="#/">${esc(t("backHome"))}</a>
    <section class="mod">${modHead(m, mi)}
      <div class="grid">${m.terms.map((tm, i) => termCard(m, i, tm)).join("")}</div>
    </section>
    ${quizHtml(m.id)}
    <div class="pager">
      ${prev ? `<a href="#/${prev.id}"><b>${esc(t("prev"))}</b><span>${esc(prev.title[lang])}</span></a>` : ""}
      <a class="nx" href="${nextLink}"><b>${esc(t("next"))}</b><span>${esc(nextName)}</span></a>
    </div>`;
}

function slidePage(m, mi, i) {
  const tm = m.terms[i], det = DETAIL[tm.t.en], ex = EXAMPLES[tm.t.en];
  const isDone = done.has(tid(m, i));
  return `<a class="crumb" href="#/${m.id}">&larr; ${esc(m.title[lang])}</a>
  <article class="slide">
    <div class="kicker">${String(mi + 1).padStart(2, "0")} ${esc(m.title[lang])} &middot; ${i + 1}/${m.terms.length}</div>
    <h2>${esc(tm.t[lang])}</h2>
    <div class="lede">${esc(tm.d[lang])}</div>
    ${tm.t.en === "Request / Response" ? httpFlowHtml() : ""}
    ${det ? `<div class="body">${para(det[lang])}</div>` : ""}
    ${ex ? `<div class="ex"><div class="cap">${esc(ex.cap[lang])}</div>
            <pre class="code">${esc(ex.code)}</pre></div>` : ""}
    <div class="cal"><b>${esc(t("why"))}</b><p>${esc(tm.w[lang])}</p></div>
    <details class="ask">
      <summary>${esc(t("askAI"))}</summary>
      <p class="sub">${esc(t("askSub"))}</p>
      ${promptBox("ask", ASK_PROMPT.replace("{term}", tm.t.en), esc(t("prompt")))}
    </details>
    <div class="slidebar">
      <button class="btn ${isDone ? "" : "prim"}" id="gotBtn" data-k="${tid(m, i)}">
        ${isDone ? "&#10003; " + esc(t("gotYes")) : esc(t("got"))}</button>
      <span class="grow"></span>
      <span class="kbd">&larr; &rarr;</span>
      ${i > 0 ? `<a class="btn" href="#/${m.id}/${i - 1}">${esc(t("prevTerm"))}</a>` : ""}
      ${i < m.terms.length - 1
        ? `<a class="btn prim" href="#/${m.id}/${i + 1}">${esc(t("nextTerm"))}</a>`
        : `<a class="btn prim" href="#/${m.id}">${esc(t("toTest"))}</a>`}
    </div>
  </article>`;
}

function projectPage() {
  const P = PROJECT;
  return `<a class="crumb" href="#/">${esc(t("backHome"))}</a>
    <section class="mod">
      <div class="mhead"><div class="ic">${P.icon}</div><div><h2>${esc(P.title[lang])}</h2></div>
        <div class="n">${P.steps.length} ${esc(t("steps"))}</div></div>
      <p class="mblurb">${esc(P.blurb[lang])}</p>
    </section>
    <div class="note">&#9888; ${esc(P.warn[lang])}</div>
    ${P.steps.map(s => `
      <div class="step">
        <div class="top"><div class="no">${s.n}</div><h3>${esc(s.title[lang])}</h3></div>
        <p class="goal"><b>${esc(t("goal"))}:</b> ${esc(s.goal[lang])}</p>
        <p class="whyp">${esc(s.why[lang])}</p>
        <div class="tags">${s.uses.map(u => {
          const loc = findTerm(u);
          return loc ? `<a href="#/${loc.m.id}/${loc.i}">${esc(loc.m.terms[loc.i].t[lang])}</a>` : "";
        }).join("")}</div>
        ${promptBox(s.n, s.prompt, t("prompt"))}
      </div>`).join("")}
    <div class="pager"><a class="nx" href="#/checklist"><b>${esc(t("next"))}</b><span>${esc(CHECKLIST.title[lang])}</span></a></div>`;
}

function archPage(id) {
  const A = ARCHITECTURES;
  if (!A || !A.items) return "";
  if (id) {
    const a = A.items.find(x => x.id === id);
    if (a) return archDetail(a, A.items.indexOf(a));
  }
  return `<a class="crumb" href="#/">${esc(t("backHome"))}</a>
    <section class="mod">
      <div class="mhead"><div class="ic">${A.icon}</div><div><h2>${esc(A.title[lang])}</h2></div>
        <div class="n">${A.items.length}</div></div>
      <p class="mblurb">${esc(A.blurb[lang])}</p>
    </section>
    <div class="cards">${A.items.map((a, i) => `
      <a class="mcard" href="#/architectures/${a.id}">
        <div class="row"><div class="ic">${i + 1}</div>
          <div><div class="num">${esc(a.tag[lang])}</div><h3>${esc(a.title[lang])}</h3></div></div>
        <pre class="code mini-dia">${esc(a.diagram)}</pre>
      </a>`).join("")}</div>`;
}

function archDetail(a, i) {
  const A = ARCHITECTURES, next = A.items[i + 1];
  const box = (k, cls) => `<div class="abox ${cls}"><b>${esc(t(k[0]))}</b><p>${esc(a[k[1]][lang])}</p></div>`;
  return `<a class="crumb" href="#/architectures">&larr; ${esc(A.title[lang])}</a>
  <article class="slide arch">
    <div class="kicker">${String(i + 1).padStart(2, "0")} ${esc(A.title[lang])} &middot; ${esc(a.tag[lang])}</div>
    <h2>${esc(a.title[lang])}</h2>
    <pre class="code dia">${esc(a.diagram)}</pre>
    <h3>${esc(t("archFlow"))}</h3>
    <div class="body"><p>${esc(a.flow[lang])}</p></div>
    <h3>${esc(t("archParts"))}</h3>
    <div class="parts">${a.parts.map(p => `
      <div class="part"><b>${esc(p.n[lang])}</b><p>${esc(p.d[lang])}</p></div>`).join("")}</div>
    <div class="aboxes">
      ${box(["archGood", "good"], "ok")}
      ${box(["archBad", "bad"], "no")}
      ${box(["archCost", "cost"], "")}
      ${box(["archScale", "scale"], "")}
    </div>
    <div class="tags">${a.uses.map(u => {
      const loc = findTerm(u);
      return loc ? `<a href="#/${loc.m.id}/${loc.i}">${esc(loc.m.terms[loc.i].t[lang])}</a>` : "";
    }).join("")}</div>
    ${promptBox("arch", a.prompt, t("archPrompt"))}
    <div class="pager">
      ${next ? `<a class="nx" href="#/architectures/${next.id}"><b>${esc(t("next"))}</b><span>${esc(next.title[lang])}</span></a>` : ""}
    </div>
  </article>`;
}

function glossaryPage() {
  const all = [];
  MODULES.forEach(m => m.terms.forEach((tm, i) => all.push({ m, i, tm })));
  all.sort((a, b) => a.tm.t[lang].localeCompare(b.tm.t[lang], lang === "he" ? "he" : "en"));
  const groups = {};
  all.forEach(x => { const k = x.tm.t[lang][0].toUpperCase(); (groups[k] ||= []).push(x); });
  return `<a class="crumb" href="#/">${esc(t("backHome"))}</a>
    <section class="mod">
      <div class="mhead"><div class="ic">&#9776;</div><div><h2>${esc(t("glossary"))}</h2></div>
        <div class="n">${all.length} ${esc(t("terms"))}</div></div>
      <p class="mblurb">${esc(t("glossarySub"))}</p>
    </section>
    <div class="gloss">${Object.keys(groups).map(k => `
      <div class="gl"><h4>${esc(k)}</h4>
        ${groups[k].map(({ m, i, tm }) => `
          <a href="#/${m.id}/${i}" class="${done.has(tid(m, i)) ? "done" : ""}">
            <span>${esc(tm.t[lang])}</span><i>${esc(m.title[lang])}</i></a>`).join("")}
      </div>`).join("")}</div>`;
}

function reviewPage() {
  const pool = [];
  MODULES.forEach(m => m.terms.forEach((tm, i) => {
    if (!done.has(tid(m, i))) pool.push({ m, i, tm });
  }));
  const all = pool.length ? pool : (() => {
    const a = []; MODULES.forEach(m => m.terms.forEach((tm, i) => a.push({ m, i, tm }))); return a;
  })();
  if (card >= all.length) card = 0;
  const { m, i, tm } = all[card];
  return `<a class="crumb" href="#/">${esc(t("backHome"))}</a>
    <section class="mod">
      <div class="mhead"><div class="ic">&#9850;</div><div><h2>${esc(t("review"))}</h2></div>
        <div class="n">${all.length - card} ${esc(t("left"))}</div></div>
      <p class="mblurb">${esc(pool.length ? t("reviewSub") : t("reviewAll"))}</p>
    </section>
    <div class="flash ${flipped ? "on" : ""}" id="flash">
      <div class="fk">${esc(m.title[lang])}</div>
      <h2>${esc(tm.t[lang])}</h2>
      ${flipped
        ? `<div class="fb"><p>${esc(tm.d[lang])}</p><p class="w">${esc(tm.w[lang])}</p></div>`
        : `<div class="fhint">${esc(t("tapToFlip"))}</div>`}
    </div>
    <div class="fbar">
      <button class="btn" id="fSkip">${esc(t("skip"))} &rarr;</button>
      <span class="grow"></span>
      <a class="btn" href="#/${m.id}/${i}">${esc(t("openSlide"))}</a>
      <button class="btn prim" id="fGot" data-k="${tid(m, i)}">&#10003; ${esc(t("got"))}</button>
    </div>`;
}

function checklistPage() {
  const C = CHECKLIST;
  const item = (x, k, no) => `<div class="ci">
      <label>${no ? `<span class="x">&times;</span>` : `<input type="checkbox" data-ck="${k}" ${ticked.has(k) ? "checked" : ""}>`}
        <span>${esc(x.t[lang])}</span></label>
      <p>${esc(x.d[lang])}</p></div>`;
  const okDone = C.do.filter((_, i) => ticked.has("do:" + i)).length;
  return `<a class="crumb" href="#/">${esc(t("backHome"))}</a>
    <section class="mod">
      <div class="mhead"><div class="ic">${C.icon}</div><div><h2>${esc(C.title[lang])}</h2></div>
        <div class="n">${okDone}/${C.do.length}</div></div>
      <p class="mblurb">${esc(C.blurb[lang])}</p>
    </section>
    <div class="cols">
      <div class="col ok"><h3>&#10003; ${esc(t("doThis"))}</h3>
        <p class="sub">${esc(t("doSub"))}</p>
        ${C.do.map((x, i) => item(x, "do:" + i, false)).join("")}</div>
      <div class="col no"><h3>&times; ${esc(t("neverThis"))}</h3>
        <p class="sub">${esc(t("neverSub"))}</p>
        ${C.dont.map((x, i) => item(x, "no:" + i, true)).join("")}</div>
    </div>`;
}

function findTerm(nameEn) {
  for (const m of MODULES) {
    const i = m.terms.findIndex(x => x.t.en === nameEn);
    if (i >= 0) return { m, i };
  }
  return null;
}

/* ---- render ---- */
function render() {
  const rtl = lang === "he";
  document.body.dir = rtl ? "rtl" : "ltr";
  document.documentElement.lang = lang;
  document.documentElement.dataset.theme = theme;

  $("#brand").textContent = t("brand");
  $("#intro").textContent = `${MODULES.length} ${t("modules")} · ${total()} ${t("terms")} · ${t("noCode")}`;
  $("#h1").innerHTML = rtl ? "מ<span>Vibe</span> למפתח" : "From <span>vibe</span> to developer";
  $("#tagline").textContent  = t("tagline");
  $("#heroNote").textContent = t("heroNote");
  $("#startBtn").textContent = t("start");
  $("#resetBtn").textContent = t("reset");
  $("#navTitle").textContent = t("modules");
  $("#search").placeholder   = t("search");
  document.querySelectorAll(".seg button").forEach(b =>
    b.setAttribute("aria-pressed", String(b.dataset.lang === lang)));

  const q = filter.trim().toLowerCase();
  const { id, sub, n } = route();
  const mi = MODULES.findIndex(m => m.id === id);
  const special = ["project", "checklist", "architectures", "glossary", "review"];
  const home = mi < 0 && !q && !special.includes(id);

  document.querySelector(".hero").style.display = home ? "" : "none";

  const navLink = (p, icon, label, cnt) =>
    `<a href="#/${p}" class="${p === id && !q ? "on" : ""}"><span class="ic">${icon}</span>
      <span>${esc(label)}</span>${cnt ? `<span class="cnt">${cnt}</span>` : ""}</a>`;

  $("#nav").innerHTML =
    navLink("", "&#9635;", t("allMods"), `${done.size}/${total()}`) +
    MODULES.map(m => {
      const d = m.terms.filter((_, i) => done.has(tid(m, i))).length;
      return `<a href="#/${m.id}" class="${m.id === id && !q ? "on" : ""}"><span class="ic">${m.icon}</span>
        <span>${esc(m.title[lang])}</span><span class="cnt">${d}/${m.terms.length}</span></a>`;
    }).join("") +
    `<hr>` +
    [PROJECT, ARCHITECTURES, CHECKLIST].filter(p => p && p.id)
      .map(p => navLink(p.id, p.icon, p.title[lang])).join("") +
    navLink("glossary", "&#9776;", t("glossary")) +
    navLink("review", "&#9850;", t("review"));

  if (q) {
    const hit = tm => (tm.t.en + tm.t.he + tm.d[lang] + tm.w[lang]).toLowerCase().includes(q);
    const secs = MODULES.map((m, i) => {
      const hits = m.terms.map((tm, j) => ({ tm, j })).filter(({ tm }) => hit(tm));
      return hits.length
        ? `<section class="mod">${modHead(m, i)}<div class="grid">${
            hits.map(({ tm, j }) => termCard(m, j, tm)).join("")}</div></section>` : "";
    }).join("");
    $("#content").innerHTML = secs || `<div class="empty">${esc(t("noResults"))}</div>`;
  }
  else if (id === "project")       { $("#content").innerHTML = projectPage(); }
  else if (id === "checklist")     { $("#content").innerHTML = checklistPage(); }
  else if (id === "architectures") { $("#content").innerHTML = archPage(sub); }
  else if (id === "glossary")      { $("#content").innerHTML = glossaryPage(); }
  else if (id === "review")        { $("#content").innerHTML = reviewPage(); }
  else if (home)                   { $("#content").innerHTML = homePage(); }
  else if (n !== null && !isNaN(n) && MODULES[mi].terms[n]) {
                                     $("#content").innerHTML = slidePage(MODULES[mi], mi, n); }
  else                             { $("#content").innerHTML = modulePage(MODULES[mi], mi); }

  $("#pbar").style.width = (done.size / total() * 100) + "%";
}

/* ---- events ---- */
$("#content").addEventListener("click", e => {
  const chk = e.target.closest(".chk");
  if (chk) {                                   // tick from a card, without navigating
    e.preventDefault(); e.stopPropagation();
    const k = chk.closest(".term").dataset.k;
    done.has(k) ? done.delete(k) : done.add(k);
    save(); render(); return;
  }
  const got = e.target.closest("#gotBtn");
  if (got) {
    const k = got.dataset.k;
    done.has(k) ? done.delete(k) : done.add(k);
    save(); render(); return;
  }
  const flash = e.target.closest("#flash");
  if (flash) { flipped = !flipped; render(); return; }

  const fGot = e.target.closest("#fGot");
  if (fGot) { done.add(fGot.dataset.k); flipped = false; save(); render(); return; }

  const fSkip = e.target.closest("#fSkip");
  if (fSkip) { card++; flipped = false; render(); return; }

  const opt = e.target.closest(".opt");
  if (opt) { answers[+opt.dataset.q] = +opt.dataset.a; render(); return; }

  const cp = e.target.closest(".copy");
  if (cp) {
    const txt = document.getElementById("p" + cp.dataset.copy).textContent;
    navigator.clipboard.writeText(txt)
      .then(() => { cp.textContent = t("copied"); setTimeout(() => (cp.textContent = t("copy")), 1400); })
      .catch(() => { cp.textContent = t("copyFail"); });
  }
});

$("#content").addEventListener("change", e => {
  const ck = e.target.closest("[data-ck]"); if (!ck) return;
  const k = ck.dataset.ck;
  ck.checked ? ticked.add(k) : ticked.delete(k);
  save(); render();
});

document.querySelectorAll(".seg button").forEach(b =>
  b.onclick = () => { lang = b.dataset.lang; save(); render(); });

$("#theme").onclick    = () => { theme = theme === "dark" ? "light" : "dark"; save(); render(); };
$("#startBtn").onclick = () => { location.hash = "#/" + MODULES[0].id; };
$("#resetBtn").onclick = () => { done.clear(); ticked.clear(); answers = {}; save(); render(); };
$("#search").oninput   = e => { filter = e.target.value; render(); };

// arrow keys move between slides; space flips a flashcard
addEventListener("keydown", e => {
  if (e.target.matches("input,textarea")) return;
  const { id, n } = route();
  if (id === "review") {
    if (e.key === " ")     { e.preventDefault(); flipped = !flipped; render(); }
    if (e.key === "ArrowRight") { card++; flipped = false; render(); }
    return;
  }
  if (n === null || isNaN(n)) return;
  const m = byId(id); if (!m) return;
  const fwd = lang === "he" ? "ArrowLeft" : "ArrowRight";
  const bwd = lang === "he" ? "ArrowRight" : "ArrowLeft";
  if (e.key === fwd && n < m.terms.length - 1) location.hash = `#/${id}/${n + 1}`;
  if (e.key === bwd && n > 0)                  location.hash = `#/${id}/${n - 1}`;
});

addEventListener("hashchange", () => {
  const prev = route().id;
  filter = ""; $("#search").value = "";
  if (prev !== hashMod) { answers = {}; hashMod = prev; }   // reset quiz when leaving a module
  render(); scrollTo(0, 0);
});
let hashMod = route().id;

render();
