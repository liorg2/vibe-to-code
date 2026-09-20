/* ---- merge the added content into MODULES ---- */
(function () {
  const byId = id => MODULES.find(m => m.id === id);
  EXTRA_TERMS.forEach(([modId, term, detail]) => {
    const m = byId(modId); if (!m) return;
    m.terms.push(term);
    DETAIL[term.t.en] = detail;
  });
  DEVTOOLS_TERMS.forEach(([term, detail, example]) => {
    byId("sides").terms.push(term);
    DETAIL[term.t.en] = detail;
    EXAMPLES[term.t.en] = example;
  });
  MODULES.splice(5, 0, TESTING_MODULE);          // after Languages
  MODULES.push(AI_MODULE);
  Object.assign(DETAIL, TESTING_DETAIL, AI_DETAIL);
  QUIZ.testing = TESTING_QUIZ;
})();

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

const $    = s => document.querySelector(s);
const tid  = (m, i) => m.id + ":" + i;
const esc  = s => String(s).replace(/[&<>]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]));
const t    = k => UI[k][lang];
const total = () => MODULES.reduce((n, m) => n + m.terms.length, 0);
const mins  = m => Math.max(3, Math.round(m.terms.length * 1.6));
const para  = s => s.split("\n\n").map(p => `<p>${esc(p)}</p>`).join("");

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

/* ---- routing: #/  #/<mod>  #/<mod>/<termIndex>  #/project  #/checklist ---- */
const route = () => {
  const p = location.hash.replace(/^#\/?/, "").split("/").filter(Boolean);
  return { id: p[0] || "", n: p[1] !== undefined ? parseInt(p[1], 10) : null };
};

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
    { m: PROJECT,   sub: t("capstone") },
    { m: CHECKLIST, sub: t("beforeShip") },
  ];
  return `<div class="cards">${MODULES.map((m, i) => {
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
  const nextLink = next ? `#/${next.id}` : `#/project`;
  const nextName = next ? next.title[lang] : PROJECT.title[lang];
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
    ${det ? `<div class="body">${para(det[lang])}</div>` : ""}
    ${ex ? `<div class="ex"><div class="cap">${esc(ex.cap[lang])}</div>
            <pre class="code">${esc(ex.code)}</pre></div>` : ""}
    <div class="cal"><b>${esc(t("why"))}</b><p>${esc(tm.w[lang])}</p></div>
    <div class="slidebar">
      <button class="btn ${isDone ? "" : "prim"}" id="gotBtn" data-k="${tid(m, i)}">
        ${isDone ? "&#10003; " + esc(t("gotYes")) : esc(t("got"))}</button>
      <span class="grow"></span>
      <span class="kbd">&larr; &rarr;</span>
      ${i > 0 ? `<a class="btn" href="#/${m.id}/${i - 1}">${esc(t("prevTerm"))}</a>` : ""}
      ${i < m.terms.length - 1
        ? `<a class="btn" href="#/${m.id}/${i + 1}">${esc(t("nextTerm"))}</a>`
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
        <div class="promptbox">
          <div class="lbl">${esc(t("prompt"))}</div>
          <button class="btn copy" data-copy="${s.n}">${esc(t("copy"))}</button>
          <pre class="code" id="p${s.n}">${esc(s.prompt)}</pre>
        </div>
      </div>`).join("")}
    <div class="pager"><a href="#/checklist"><b>${esc(t("next"))}</b><span>${esc(CHECKLIST.title[lang])}</span></a></div>`;
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
  const { id, n } = route();
  const mi = MODULES.findIndex(m => m.id === id);
  const home = mi < 0 && !q && id !== "project" && id !== "checklist";

  document.querySelector(".hero").style.display = home ? "" : "none";

  $("#nav").innerHTML =
    `<a href="#/" class="${home ? "on" : ""}"><span class="ic">&#9635;</span>
       <span>${esc(t("allMods"))}</span><span class="cnt">${done.size}/${total()}</span></a>` +
    MODULES.map(m => {
      const d = m.terms.filter((_, i) => done.has(tid(m, i))).length;
      return `<a href="#/${m.id}" class="${m.id === id && !q ? "on" : ""}"><span class="ic">${m.icon}</span>
        <span>${esc(m.title[lang])}</span><span class="cnt">${d}/${m.terms.length}</span></a>`;
    }).join("") +
    `<hr>` + [PROJECT, CHECKLIST].map(p =>
      `<a href="#/${p.id}" class="${p.id === id && !q ? "on" : ""}"><span class="ic">${p.icon}</span>
        <span>${esc(p.title[lang])}</span></a>`).join("");

  if (q) {
    const hit = tm => (tm.t.en + tm.t.he + tm.d[lang] + tm.w[lang]).toLowerCase().includes(q);
    const secs = MODULES.map((m, i) => {
      const hits = m.terms.map((tm, j) => ({ tm, j })).filter(({ tm }) => hit(tm));
      return hits.length
        ? `<section class="mod">${modHead(m, i)}<div class="grid">${
            hits.map(({ tm, j }) => termCard(m, j, tm)).join("")}</div></section>` : "";
    }).join("");
    $("#content").innerHTML = secs || `<div class="empty">${esc(t("noResults"))}</div>`;
  } else if (id === "project")   { $("#content").innerHTML = projectPage(); }
  else if (id === "checklist")   { $("#content").innerHTML = checklistPage(); }
  else if (home)                 { $("#content").innerHTML = homePage(); }
  else if (n !== null && !isNaN(n) && MODULES[mi].terms[n]) {
                                   $("#content").innerHTML = slidePage(MODULES[mi], mi, n); }
  else                           { $("#content").innerHTML = modulePage(MODULES[mi], mi); }

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

// arrow keys move between slides
addEventListener("keydown", e => {
  if (e.target.matches("input,textarea")) return;
  const { id, n } = route(); if (n === null || isNaN(n)) return;
  const m = MODULES.find(x => x.id === id); if (!m) return;
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
