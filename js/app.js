/* Shared helpers, theme, router, and home page. */
(function () {
  'use strict';

  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* storage blocked: keep going in memory */ } }
  };
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const shuffle = (arr, r = Math.random) => { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const app = $('#app');
  const Views = {};
  window.U = { $, $$, store, esc, shuffle, app, Views };

  // Every definition item and application item, flattened once for all views.
  const GROUP = Object.fromEntries(LEARN_GROUPS.map(g => [g.id, g]));
  const ITEMS = [];
  LEARN_GROUPS.forEach(g => g.items.forEach((it, i) =>
    ITEMS.push({ id: `${g.id}-${i}`, kind: 'term', gid: g.id, mod: g.mod, term: it[0], prompt: it[1], alts: it[2] || [], hot: !!it[3] })));
  APPLY.forEach((q, k) =>
    ITEMS.push({ id: `ap-${k}`, kind: 'apply', gid: q.gid, mod: GROUP[q.gid].mod, term: q.a, prompt: q.q, wrong: q.w, why: q.why, hot: !!q.hot }));
  U.ITEMS = ITEMS;
  U.GROUP = GROUP;

  // ---------- theme ----------
  $('#themeBtn').addEventListener('click', () => {
    const root = document.documentElement;
    const cur = root.getAttribute('data-theme') || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    const next = cur === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('u1p2.theme', next); } catch (e) { }
  });

  // ---------- router ----------
  function route() {
    const h = location.hash.replace(/^#\/?/, '');
    const name = h.split('/')[0];
    const view = Views[name] ? name : 'home';
    $$('.nav a').forEach(a => a.classList.toggle('is-on', a.dataset.nav === view));
    document.body.dataset.route = view;
    Views[view](app, h);
  }
  U.route = route;
  window.addEventListener('hashchange', () => { route(); window.scrollTo(0, 0); });
  window.addEventListener('DOMContentLoaded', route);

  // ---------- home ----------
  Views.home = () => {
    const terms = ITEMS.filter(x => x.kind === 'term').length;
    const apply = ITEMS.filter(x => x.kind === 'apply').length;
    const sleepIds = ['stg', 'clk', 'why', 'los', 'dis', 'drm'];
    const sleepN = ITEMS.filter(x => sleepIds.includes(x.gid)).length;
    const hot = ITEMS.filter(x => x.hot).length;
    app.innerHTML = `
    <main class="screen">
      <section class="hero">
        <p class="eyebrow">AP Psychology · Unit 1, Part 2 · Modules 1.5a to 1.6d</p>
        <h1>Sleep, dreams, and sensation</h1>
        <p class="lede">Every term on the Part 2 study guide, with definitions from the Myers AP text. ${sleepN} of the ${ITEMS.length} items are about sleep and dreams. Learn rounds follow the expected exam mix by default: about 60% sleep, 20% cognition (1.5a), and 20% sensation.</p>
      </section>
      <section class="cards">
        <a class="card" href="#/learn"><span class="tag">Quizlet Learn style</span><h3>Learn</h3>
          <p>${terms} definitions and ${apply} AP-style scenario questions in rounds of 7. Definitions come back as typed answers once you get them right. Misses return later in the round.</p>
          <span class="go">Start learning</span></a>
        <a class="card" href="#/learn" id="hotCard"><span class="tag">From your teacher's notes</span><h3>Flagged topics only</h3>
          <p>${hot} items on what your teacher called out: the hypothalamus, pituitary, pineal gland, and thalamus in sleep; the irregular heartbeat in REM; sleep paralysis during REM; kinesthesis vs. vestibular.</p>
          <span class="go">Drill these</span></a>
        <a class="card" href="#/cards"><span class="tag">Flip through</span><h3>Flashcards</h3>
          <p>Term on one side, definition on the other. Filter by module, shuffle, and flip with the space bar.</p>
          <span class="go">Open flashcards</span></a>
        <a class="card" href="#/sheet"><span class="tag">One page</span><h3>Review sheet</h3>
          <p>The sleep cycle drawn out across a night, tables for stages, brain structures, disorders, and dream theories, plus the senses side by side.</p>
          <span class="go">Read it</span></a>
      </section>
    </main>
    <p class="foot">Definitions follow Myers' Psychology for AP, 4th edition. Your progress saves in this browser.</p>`;
    $('#hotCard').onclick = () => { U.learnHotOnly && U.learnHotOnly(); };
  };
})();
