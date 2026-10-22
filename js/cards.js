/* Flashcards: flip through the definition items. Space or click flips, arrow keys move. */
(function () {
  'use strict';
  const { $, $$, store, esc, shuffle, app, Views, ITEMS, GROUP } = U;
  const KEY = 'u1p2.cards.v1';
  let C = Object.assign({ gid: 'all', termFirst: true, shuffled: false }, store.get(KEY, {}));
  let deck = [], pos = 0, flipped = false;
  const save = () => store.set(KEY, { gid: C.gid, termFirst: C.termFirst, shuffled: C.shuffled });

  function buildDeck() {
    const terms = ITEMS.filter(x => x.kind === 'term' && (C.gid === 'all' || (C.gid === 'hot' ? x.hot : x.gid === C.gid)));
    deck = C.shuffled ? shuffle(terms) : terms;
    pos = 0; flipped = false;
  }

  Views.cards = () => { if (!deck.length) buildDeck(); render(); };

  function render() {
    const it = deck[pos];
    const front = C.termFirst ? it.term : it.prompt;
    const back = C.termFirst ? it.prompt : it.term;
    const side = flipped ? back : front;
    const isTermSide = C.termFirst !== flipped;
    app.innerHTML = `
    <main class="screen"><div class="learnwrap">
      <section class="hero" style="margin-bottom:16px">
        <p class="eyebrow">Flashcards</p>
        <h1>Flip through the terms</h1>
      </section>
      <div class="row">
        <select id="deckSel" class="sel" aria-label="Which cards">
          <option value="all">All modules (${ITEMS.filter(x => x.kind === 'term').length})</option>
          <option value="hot">Teacher flagged</option>
          ${LEARN_GROUPS.map(g => `<option value="${g.id}">${g.mod} ${esc(g.name)}</option>`).join('')}
        </select>
        <span class="spacer"></span>
        <label class="toggle"><input type="checkbox" id="shufTog" ${C.shuffled ? 'checked' : ''}> Shuffle</label>
        <label class="toggle"><input type="checkbox" id="defTog" ${C.termFirst ? '' : 'checked'}> Show definition first</label>
      </div>
      <button class="flash ${isTermSide ? 'termside' : 'defside'}" id="flash" aria-label="Flip card">
        <span class="flash-meta">${it.mod} ${esc(GROUP[it.gid].name)}${it.hot ? ' · <b class="hotbadge">Teacher flagged</b>' : ''}</span>
        <span class="flash-text">${esc(side)}</span>
        <span class="flash-hint">${flipped ? 'Click to flip back' : 'Click or press space to flip'}</span>
      </button>
      <div class="row" style="justify-content:center;margin-top:14px">
        <button class="btn quiet" id="prevBtn" ${pos ? '' : 'disabled'}>← Previous</button>
        <span class="small mut" style="min-width:90px;text-align:center">${pos + 1} / ${deck.length}</span>
        <button class="btn quiet" id="nextBtn" ${pos < deck.length - 1 ? '' : 'disabled'}>Next →</button>
      </div>
      <p class="small mut" style="text-align:center">Keys: <kbd>Space</kbd> flip · <kbd>←</kbd> <kbd>→</kbd> move</p>
    </div></main>`;
    $('#deckSel').value = C.gid;
    $('#deckSel').onchange = e => { C.gid = e.target.value; save(); buildDeck(); render(); };
    $('#shufTog').onchange = e => { C.shuffled = e.target.checked; save(); buildDeck(); render(); };
    $('#defTog').onchange = e => { C.termFirst = !e.target.checked; save(); flipped = false; render(); };
    $('#flash').onclick = () => { flipped = !flipped; render(); };
    $('#prevBtn').onclick = () => move(-1);
    $('#nextBtn').onclick = () => move(1);
  }
  function move(d) {
    const n = pos + d;
    if (n < 0 || n >= deck.length) return;
    pos = n; flipped = false; render();
  }

  document.addEventListener('keydown', e => {
    if (document.body.dataset.route !== 'cards' || /input|select|textarea/i.test(e.target.tagName)) return;
    if (e.key === ' ') { e.preventDefault(); flipped = !flipped; render(); }
    else if (e.key === 'ArrowRight') move(1);
    else if (e.key === 'ArrowLeft') move(-1);
  });
})();
