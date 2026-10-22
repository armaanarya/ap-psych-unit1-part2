/* Learn mode, modeled on Quizlet Learn: rounds of 7. Definition items show as multiple choice first, then come back
   as a typed answer; mastered after one of each (or two multiple-choice answers when typing is off).
   Scenario items are multiple choice only: right on the first try is mastered, right after a miss needs one more.
   Missed items return later in the same round. */
(function () {
  'use strict';
  const { $, $$, store, esc, shuffle, app, Views, ITEMS, GROUP } = U;
  const KEY = 'u1p2.learn.v1';
  const ROUND = 7;
  const BY_ID = Object.fromEntries(ITEMS.map(x => [x.id, x]));
  const KINDS = { both: 'Both', term: 'Definitions', apply: 'Scenarios' };

  const SLEEP = ['stg', 'clk', 'why', 'los', 'dis', 'drm'];
  const BUCKET_W = { sleep: 60, cog: 20, sense: 20 };
  const bucketOf = x => SLEEP.includes(x.gid) ? 'sleep' : x.gid === 'con' ? 'cog' : 'sense';

  let P = Object.assign({ levels: {}, topics: LEARN_GROUPS.map(g => g.id), typed: true, kinds: 'both', hotOnly: false, weighted: true },
    store.get(KEY, {}));
  let R = null;   // current round
  const save = () => store.set(KEY, P);
  const lvl = id => P.levels[id] || 0;
  const pool = () => ITEMS.filter(x => P.topics.includes(x.gid) && (P.kinds === 'both' || x.kind === P.kinds) && (!P.hotOnly || x.hot));

  U.learnHotOnly = () => { P.hotOnly = true; P.topics = LEARN_GROUPS.map(g => g.id); P.kinds = 'both'; R = null; save(); };

  // ---------- answer checking for typed rounds ----------
  const norm = s => s.toLowerCase().replace(/&/g, ' and ').replace(/[^a-z0-9]+/g, ' ').trim().replace(/^(the|a|an) /, '');
  const sing = s => s.split(' ').map(w => w.length > 3 ? w.replace(/(es|s)$/, '') : w).join(' ');
  function forms(item) {
    const out = new Set();
    [item.term, ...item.alts].forEach(f => {
      out.add(norm(f));
      out.add(norm(f.replace(/\([^)]*\)/g, ' ')));      // "NREM-3 (N3)" -> "nrem 3"
      const inner = f.match(/\(([^)]*)\)/);
      if (inner && inner[1].length > 2) out.add(norm(inner[1]));
    });
    out.delete('');
    return [...out];
  }
  function lev(a, b) {
    const d = Array.from({ length: a.length + 1 }, (_, i) => [i]);
    for (let j = 1; j <= b.length; j++) d[0][j] = j;
    for (let i = 1; i <= a.length; i++) for (let j = 1; j <= b.length; j++)
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    return d[a.length][b.length];
  }
  function typedOk(item, answer) {
    const a = norm(answer);
    if (!a) return false;
    return forms(item).some(f => {
      if (a === f || sing(a) === sing(f)) return true;
      // Numbers carry meaning here (N1 vs N3), so never forgive a wrong digit.
      if (/\d/.test(f) && a.replace(/\D/g, '') !== f.replace(/\D/g, '')) return false;
      const tol = f.length >= 10 ? 2 : f.length >= 5 ? 1 : 0;
      return tol > 0 && lev(sing(a), sing(f)) <= tol;
    });
  }

  function mcOptions(item) {
    if (item.kind === 'apply') return shuffle([item.term, ...item.wrong]);
    const seen = new Set([item.term]);
    const picks = [];
    const terms = ITEMS.filter(x => x.kind === 'term');
    const addFrom = list => shuffle(list).forEach(x => { if (picks.length < 3 && !seen.has(x.term)) { seen.add(x.term); picks.push(x.term); } });
    addFrom(terms.filter(x => x.gid === item.gid));
    addFrom(terms.filter(x => x.mod === item.mod));
    addFrom(terms);
    return shuffle([item.term, ...picks]);
  }

  // ---------- rounds ----------
  // Pick up to n items, learning ones (level 1) first so they get finished.
  function pickFrom(p, n) {
    const learning = shuffle(p.filter(x => lvl(x.id) === 1));
    const fresh = shuffle(p.filter(x => lvl(x.id) === 0));
    let pick = [...learning.slice(0, Math.ceil(n / 2)), ...fresh].slice(0, n);
    if (pick.length < n) pick = pick.concat(learning.slice(Math.ceil(n / 2), Math.ceil(n / 2) + n - pick.length));
    return pick;
  }
  // Exam weighting: each slot in a round is drawn 60% sleep, 20% cognition, 20% sensation,
  // skipping any bucket that has nothing left to study.
  function weightedPick(p) {
    const left = {};
    Object.keys(BUCKET_W).forEach(b => left[b] = pickFrom(p.filter(x => bucketOf(x) === b), ROUND));
    const pick = [];
    while (pick.length < ROUND) {
      const live = Object.keys(left).filter(b => left[b].length);
      if (!live.length) break;
      let r = Math.random() * live.reduce((s, b) => s + BUCKET_W[b], 0);
      const b = live.find(k => (r -= BUCKET_W[k]) < 0) || live[live.length - 1];
      pick.push(left[b].shift());
    }
    return pick;
  }
  function buildRound() {
    const p = pool().filter(x => lvl(x.id) < 2);
    if (!p.length) return null;
    const pick = P.weighted ? weightedPick(p) : pickFrom(p, ROUND);
    return { queue: shuffle(pick.map(x => x.id)), items: pick.map(x => x.id), first: {}, cur: null };
  }

  function nextQuestion() {
    if (!R.queue.length) { R.cur = null; return renderSummary(); }
    const id = R.queue.shift();
    const item = BY_ID[id];
    const type = item.kind === 'term' && lvl(id) >= 1 && P.typed ? 'typed' : 'mc';
    R.cur = { id, type, options: type === 'mc' ? mcOptions(item) : null, answered: false };
    renderCard();
  }

  function grade(ok, given) {
    const c = R.cur, id = c.id, item = BY_ID[id];
    c.answered = true; c.ok = ok; c.given = given;
    const firstTry = !(id in R.first);
    if (firstTry) R.first[id] = ok;
    if (ok) P.levels[id] = item.kind === 'apply' && firstTry && lvl(id) === 0 ? 2 : Math.min(2, lvl(id) + 1);
    else R.queue.push(id);          // missed items come back later in the round
    save();
    renderCard();
    // Definitions advance on their own when right; scenarios wait so you can read the explanation.
    if (ok && item.kind === 'term') setTimeout(() => { if (R && R.cur === c && document.body.dataset.route === 'learn') nextQuestion(); }, 1100);
  }

  // ---------- views ----------
  function counts(list) {
    let m = 0, l = 0, n = 0;
    list.forEach(x => { const v = lvl(x.id); if (v >= 2) m++; else if (v === 1) l++; else n++; });
    return { m, l, n, t: list.length };
  }
  function progressBar(list) {
    const c = counts(list);
    const pct = v => (v / Math.max(1, c.t) * 100).toFixed(1) + '%';
    return `<div class="progress3" aria-label="${c.m} mastered, ${c.l} learning, ${c.n} not studied"><div class="m" style="width:${pct(c.m)}"></div><div class="l" style="width:${pct(c.l)}"></div></div>
      <div class="plegend"><span><i style="background:var(--ok)"></i>${c.m} mastered</span><span><i style="background:var(--warn)"></i>${c.l} learning</span><span><i style="background:var(--panel-2);border:1px solid var(--line)"></i>${c.n} not studied</span></div>`;
  }

  Views.learn = () => { if (R && R.cur) renderCard(); else renderSetup(); };

  function renderSetup() {
    R = null;
    const list = pool();
    const allDone = list.length && list.every(x => lvl(x.id) >= 2);
    const inScope = x => (P.kinds === 'both' || x.kind === P.kinds) && (!P.hotOnly || x.hot);
    app.innerHTML = `
    <main class="screen"><div class="learnwrap">
      <section class="hero">
        <p class="eyebrow">Learn · ${ITEMS.length} items</p>
        <h1>Learn it until it sticks</h1>
        <p class="lede">Rounds of ${ROUND}. Definitions start as multiple choice; once you get one, it comes back and you type the term. Scenario questions are written like AP multiple choice and explain every answer. Miss anything and it returns later in the round.</p>
      </section>
      <div class="panel">
        <div class="row">
          <div class="seg" role="group" aria-label="Question types">${Object.entries(KINDS).map(([k, v]) =>
            `<button data-kind="${k}" class="${P.kinds === k ? 'is-on' : ''}">${v}</button>`).join('')}</div>
          <label class="toggle hotTog"><input type="checkbox" id="hotTog" ${P.hotOnly ? 'checked' : ''}> Only topics from the teacher's notes</label>
        </div>
        <h2 style="margin-top:16px">Topics</h2>
        <div class="topicpick">${LEARN_GROUPS.map(g => {
          const c = counts(ITEMS.filter(x => x.gid === g.id && inScope(x)));
          return `<label class="${c.t ? '' : 'empty'}"><input type="checkbox" value="${g.id}" ${P.topics.includes(g.id) ? 'checked' : ''}><span><b>${g.mod}</b> ${esc(g.name)}</span><span class="cnt">${c.m}/${c.t}</span></label>`;
        }).join('')}</div>
        <div class="row small"><button class="chip" id="allTopics">Select all</button><button class="chip" id="sleepTopics">Sleep only (1.5b, 1.5c)</button><button class="chip" id="cogTopics">Cognition only (1.5a)</button><button class="chip" id="senseTopics">Sensation only (1.6)</button><button class="chip" id="noTopics">Clear</button></div>
        <div class="row small" style="margin-top:10px">
          <label class="toggle"><input type="checkbox" id="weightTog" ${P.weighted ? 'checked' : ''}> Exam weighting: rounds are about 60% sleep, 20% cognition, 20% sensation</label>
          <span class="spacer"></span>
          <label class="toggle"><input type="checkbox" id="typedTog" ${P.typed ? 'checked' : ''}> Typed answers after multiple choice</label></div>
        <div style="margin-top:14px">${progressBar(list)}</div>
        <div class="row" style="margin-top:16px">
          <button class="btn" id="startLearn" ${list.length && !allDone ? '' : 'disabled'}>${!list.length ? 'Nothing selected' : allDone ? 'Everything here is mastered' : Object.keys(P.levels).length ? 'Continue learning' : 'Start learning'}</button>
          <span class="spacer"></span>
          <button class="btn quiet" id="resetLearn">Reset progress for these</button>
        </div>
        ${allDone ? '<p class="small mut" style="margin-bottom:0">Reset to go through them again, or add more topics above.</p>' : ''}
      </div>
    </div></main>`;
    const setTopics = ids => { P.topics = ids; save(); renderSetup(); };
    $$('.topicpick input').forEach(i => i.onchange = () => setTopics($$('.topicpick input:checked').map(x => x.value)));
    $$('[data-kind]').forEach(b => b.onclick = () => { P.kinds = b.dataset.kind; save(); renderSetup(); });
    $('#hotTog').onchange = e => { P.hotOnly = e.target.checked; save(); renderSetup(); };
    $('#allTopics').onclick = () => setTopics(LEARN_GROUPS.map(g => g.id));
    $('#sleepTopics').onclick = () => setTopics(SLEEP);
    $('#cogTopics').onclick = () => setTopics(['con']);
    $('#weightTog').onchange = e => { P.weighted = e.target.checked; save(); };
    $('#senseTopics').onclick = () => setTopics(LEARN_GROUPS.filter(g => g.mod.startsWith('1.6')).map(g => g.id));
    $('#noTopics').onclick = () => setTopics([]);
    $('#typedTog').onchange = e => { P.typed = e.target.checked; save(); };
    $('#resetLearn').onclick = () => {
      if (!confirm('Reset your progress for the selected items?')) return;
      pool().forEach(x => delete P.levels[x.id]); save(); renderSetup();
    };
    $('#startLearn').onclick = () => { R = buildRound(); if (R) nextQuestion(); };
  }

  function renderCard() {
    const c = R.cur, item = BY_ID[c.id], g = GROUP[item.gid];
    const done = R.items.filter(id => R.first[id] !== undefined && lvl(id) > 0 && !R.queue.includes(id)).length;
    const isApply = item.kind === 'apply';
    let body = '';
    if (c.type === 'mc') {
      body = `<div class="lopts ${isApply ? 'one' : ''}">${c.options.map((o, k) => {
        let cls = '';
        if (c.answered) { if (o === item.term) cls = 'ok'; else if (o === c.given) cls = 'bad'; }
        return `<button class="${cls}" data-opt="${esc(o)}" ${c.answered ? 'disabled' : ''}><span class="k">${k + 1}</span><span>${esc(o)}</span></button>`;
      }).join('')}</div>
      ${c.answered ? '' : '<div class="row" style="margin-top:10px"><button class="btn ghost" id="dunno" type="button">I don\'t know</button></div>'}`;
    } else {
      body = `<form class="typed" id="typedForm" autocomplete="off">
          <input id="typedIn" type="text" placeholder="Type the term" ${c.answered ? 'disabled' : ''} value="${c.answered ? esc(c.given || '') : ''}" aria-label="Your answer">
          ${c.answered ? '' : '<button class="btn" type="submit">Answer</button>'}
        </form>
        ${c.answered ? '' : '<div class="row" style="margin-top:8px"><button class="btn ghost" id="dunno" type="button">I don\'t know</button></div>'}`;
    }
    let fb = '';
    if (c.answered) {
      const why = isApply ? `<p class="why2">${esc(item.why)}</p>` : '';
      fb = c.ok
        ? `<div class="lfeed ok"><div class="head">${lvl(c.id) >= 2 ? 'Correct. Mastered.' : isApply ? 'Correct. Get it once more to master it.' : 'Correct. It will come back as a typed question.'}</div>${isApply ? why : `<div class="ans">${esc(item.term)}</div>`}</div>`
        : `<div class="lfeed bad"><div class="head">${c.given ? 'Not quite.' : 'Here it is.'} You will see this again.</div>
            <div>Correct answer: <span class="ans">${esc(item.term)}</span></div>
            ${c.given && c.type === 'typed' ? `<div class="small mut">You answered: ${esc(c.given)}</div>` : ''}${why}</div>`;
    }
    app.innerHTML = `
    <main class="screen"><div class="learnwrap">
      <div class="row"><a href="#/learn" id="exitLearn" class="small">End round</a><span class="spacer"></span><span class="small mut">Round progress: ${done} of ${R.items.length}</span></div>
      ${progressBar(pool())}
      <div class="lcard">
        <div class="kind"><span>${isApply ? 'Scenario' : c.type === 'mc' ? 'Definition · multiple choice' : 'Definition · type the term'}</span><span>·</span><span>${item.mod} ${esc(g.name)}</span>${item.hot ? '<span class="hotbadge">Teacher flagged</span>' : ''}</div>
        <p class="prompt ${isApply ? 'apply' : ''}">${esc(item.prompt)}</p>
        ${body}
        ${fb}
        ${c.answered ? `<div class="lfoot"><button class="btn" id="contBtn">Continue</button><span class="small mut">Press Enter</span>
          ${!c.ok && c.type === 'typed' && c.given ? '<span class="spacer"></span><button class="btn ghost" id="overrideBtn">I was right, count it</button>' : ''}</div>` : ''}
      </div>
    </div></main>`;
    $('#exitLearn').onclick = e => { e.preventDefault(); R = null; renderSetup(); };
    if (!c.answered) {
      $('#dunno').onclick = () => grade(false, '');
      if (c.type === 'mc') $$('[data-opt]').forEach(b => b.onclick = () => grade(b.dataset.opt === item.term, b.dataset.opt));
      else {
        const inp = $('#typedIn'); inp.focus();
        $('#typedForm').onsubmit = e => { e.preventDefault(); const v = inp.value; if (!v.trim()) return; grade(typedOk(item, v), v.trim()); };
      }
    } else {
      const cont = $('#contBtn'); cont.focus();
      cont.onclick = () => nextQuestion();
      const ov = $('#overrideBtn');
      if (ov) ov.onclick = () => {
        // Undo the miss: count it as correct and drop the repeat from the queue.
        const idx = R.queue.lastIndexOf(c.id); if (idx >= 0) R.queue.splice(idx, 1);
        R.first[c.id] = true; P.levels[c.id] = Math.min(2, lvl(c.id) + 1); save();
        c.ok = true; renderCard();
      };
    }
  }

  function renderSummary() {
    const rows = R.items.map(id => {
      const it = BY_ID[id];
      return `<li><span class="${R.first[id] ? 'dot-ok' : 'dot-bad'}"></span><b>${esc(it.term)}</b><span class="small mut">${esc(it.prompt)}</span></li>`;
    }).join('');
    const firstRight = R.items.filter(id => R.first[id]).length;
    const left = pool().filter(x => lvl(x.id) < 2).length;
    app.innerHTML = `
    <main class="screen"><div class="learnwrap">
      ${progressBar(pool())}
      <div class="lcard roundsum">
        <div class="kind">Round complete</div>
        <h2>${firstRight} of ${R.items.length} right on the first try</h2>
        <p class="mut">${left ? `${left} items left to master in this selection.` : 'You mastered every item in this selection.'}</p>
        <ul>${rows}</ul>
        <div class="lfoot">${left ? '<button class="btn" id="nextRound">Next round</button>' : ''}<button class="btn quiet" id="toSetup">Change topics</button></div>
      </div>
    </div></main>`;
    const nr = $('#nextRound');
    if (nr) { nr.focus(); nr.onclick = () => { R = buildRound(); if (R) nextQuestion(); else renderSetup(); }; }
    $('#toSetup').onclick = () => { R = null; renderSetup(); };
  }

  document.addEventListener('keydown', e => {
    if (document.body.dataset.route !== 'learn' || !R || !R.cur) return;
    const c = R.cur;
    if (!c.answered && c.type === 'mc' && /^[1-4]$/.test(e.key)) {
      const b = $$('[data-opt]')[Number(e.key) - 1]; if (b) b.click();
    } else if (c.answered && e.key === 'Enter' && document.contains(e.target) && !(e.target.closest && e.target.closest('button'))) {
      e.preventDefault(); nextQuestion();
    }
  });
})();
