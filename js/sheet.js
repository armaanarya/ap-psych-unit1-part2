/* Review sheet: the sleep cycle across a night, then tables for each part of the study guide. */
(function () {
  'use strict';
  const { $$, app, Views } = U;

  // A typical young adult's night, as [hour, stage]. N3 shrinks and REM grows as the night goes on.
  const NIGHT = [[0, 'W'], [0.12, 'N1'], [0.3, 'N2'], [0.55, 'N3'], [1.05, 'N2'], [1.2, 'R'], [1.38, 'N2'], [1.75, 'N3'], [2.15, 'N2'],
    [2.6, 'R'], [2.9, 'N2'], [3.3, 'N3'], [3.45, 'N2'], [4.05, 'R'], [4.5, 'N2'], [4.62, 'W'], [4.68, 'N2'], [5.55, 'R'], [6.1, 'N2'],
    [6.95, 'R'], [7.65, 'W'], [8, 'W']];
  const LEVEL = { W: 0, R: 1, N1: 2, N2: 3, N3: 4 };
  const LABEL = ['Awake', 'REM', 'NREM-1', 'NREM-2', 'NREM-3'];

  function hypnogram() {
    const x = h => 96 + h * 82, y = l => 34 + l * 44;
    let d = '';
    NIGHT.forEach(([h, s], i) => {
      d += i ? ` H${x(h)} V${y(LEVEL[s])}` : `M${x(h)} ${y(LEVEL[s])}`;
    });
    const rem = [];
    NIGHT.forEach(([h, s], i) => { if (s === 'R' && NIGHT[i + 1]) rem.push([h, NIGHT[i + 1][0]]); });
    return `<svg class="hypno" viewBox="0 0 780 300" role="img" aria-label="Hypnogram: sleep stages across an 8-hour night. Deep NREM-3 sleep comes early and disappears after about 3.5 hours; REM periods get longer toward morning.">
      ${LABEL.map((t, l) => `<line class="grid" x1="96" x2="752" y1="${y(l)}" y2="${y(l)}"/><text class="ylab" x="86" y="${y(l) + 4}" text-anchor="end">${t}</text>`).join('')}
      ${rem.map(([a, b]) => `<rect class="rem" x="${x(a)}" y="${y(1) - 9}" width="${x(b) - x(a)}" height="18" rx="4"/>`).join('')}
      <path class="trace" d="${d}"/>
      ${[0, 1, 2, 3, 4, 5, 6, 7, 8].map(h => `<text class="xlab" x="${x(h)}" y="${y(4) + 36}" text-anchor="middle">${h}h</text>`).join('')}
      <text class="note" x="${x(0.45)}" y="${y(4) + 17}">Deep sleep comes early</text>
      <text class="note" x="${x(6.3)}" y="${y(1) - 16}" text-anchor="middle">REM periods get longer</text>
      <text class="xlab" x="424" y="${y(4) + 60}" text-anchor="middle">Hours asleep · each cycle is about 90 minutes</text>
    </svg>`;
  }

  const table = (head, rows) => `<div class="tablewrap"><table class="gtable"><thead><tr>${head.map(h => `<th>${h}</th>`).join('')}</tr></thead>
    <tbody>${rows.map(r => `<tr>${r.map(c => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;

  Views.sheet = () => {
    app.innerHTML = `
    <main class="screen">
      <section class="hero">
        <p class="eyebrow">Review sheet</p>
        <h1>Everything on one page</h1>
        <p class="lede">Start with the boxes from your teacher's notes, then the sleep tables. Sensation is at the bottom.</p>
      </section>
      <nav class="guide-nav">
        <a href="#s-hot">Teacher's notes</a><a href="#s-cycle">Sleep cycle</a><a href="#s-brain">Sleep in the brain</a><a href="#s-why">Why we sleep</a>
        <a href="#s-loss">Sleep loss</a><a href="#s-dis">Disorders</a><a href="#s-dream">Dreams</a><a href="#s-con">Consciousness</a><a href="#s-sense">Senses</a>
      </nav>

      <section class="gsec" id="s-hot"><h2><span class="mod">Flagged</span> From your teacher's notes</h2>
        <div class="hotgrid">
          <div class="gblock hot"><h3>Brain structures that run sleep</h3>
            <ul>
              <li><b>Hypothalamus</b> holds the <b>suprachiasmatic nucleus (SCN)</b>, the master clock. Light hits the retina, the SCN learns it is day, and it tells the pineal gland to cut melatonin.</li>
              <li><b>Pineal gland</b> releases <b>melatonin</b> at night when the SCN quiets. Melatonin makes you sleepy.</li>
              <li><b>Pituitary gland</b> releases <b>growth hormone</b> during deep NREM-3 (slow-wave) sleep. That is the "sleep supports growth" reason.</li>
              <li><b>Thalamus</b>, the sensory relay, gates incoming sensory signals during NREM so they do not reach the cortex and wake you, and it helps make the sleep spindles of NREM-2.</li>
              <li><b>Brainstem (pons)</b> blocks the motor cortex's messages during REM, so the body is nearly paralyzed.</li>
            </ul></div>
          <div class="gblock hot"><h3>The heart during REM</h3>
            <p>In REM the heart <b>speeds up and beats irregularly</b>, close to waking levels. Breathing also becomes rapid and irregular, the eyes dart, and the genitals are aroused, while the muscles stay relaxed.</p>
            <p>Contrast: in NREM, and especially NREM-3, heart rate and breathing are slow and steady.</p>
            <p class="small mut">REM is "paradoxical sleep" because the inside of the body and the brain act awake while the outside is still.</p></div>
          <div class="gblock hot"><h3>Sleep paralysis happens during REM</h3>
            <p><b>When:</b> during REM, at its edges, most often as you wake out of a REM period (so often near morning, when REM periods are longest), sometimes as you slide into one.</p>
            <p><b>Why you can't move:</b> REM normally switches off the muscles (the brainstem blocks the motor cortex). In sleep paralysis the mind wakes up before that switch turns back on.</p>
            <p><b>What it feels like:</b> awake and aware but unable to move or speak for seconds to a minute or two, often with hallucinations such as a presence in the room or pressure on the chest.</p>
            <p class="small mut">Opposite problem: REM sleep behavior disorder, where the paralysis fails and people act out dreams.</p></div>
          <div class="gblock hot"><h3>Kinesthesis vs. vestibular sense</h3>
            ${table(['', 'Kinesthesis', 'Vestibular sense'], [
              ['Tracks', 'Position and movement of <b>individual body parts</b>', 'Balance: <b>head and whole-body</b> position and movement'],
              ['Receptors', 'Muscles, tendons, joints', 'Inner ear: semicircular canals and vestibular sacs (fluid)'],
              ['Examples', 'Touching your nose with eyes closed; typing without looking; knowing where your arm is mid-flip', 'Dizziness after spinning; staying upright on a balance beam; knowing your head is tilted; motion sickness'],
              ['Ask yourself', '"Where are my arms and legs?"', '"Which way is up, and am I moving?"']])}
            <p class="small mut" style="margin-bottom:0">Spinning makes you dizzy because the fluid in the semicircular canals keeps moving after you stop.</p></div>
        </div>
      </section>

      <section class="gsec" id="s-cycle"><h2><span class="mod">1.5b</span> The sleep cycle</h2>
        <div class="gblock">${hypnogram()}</div>
        <div class="gblock">${table(['Stage', 'Brain waves (EEG)', 'Body', 'What happens here'], [
          ['Awake, alert', 'Beta: fast, small', 'Active', ''],
          ['Awake, relaxed', '<b>Alpha</b>: relatively slow', 'Eyes closed, calm', 'Lying in bed before sleep'],
          ['NREM-1', 'Irregular; slowing', 'Breathing slows', 'Brief transition. <b>Hallucinations</b> and <b>hypnagogic sensations</b> (falling, floating, a jerk)'],
          ['NREM-2', 'Sleep spindles', 'Heart and temperature drop; easy to wake', 'About 20 min per cycle; about half the night overall'],
          ['NREM-3', '<b>Delta</b>: large, slow', 'Slowest, steadiest heart and breathing; hardest to wake', 'About 30 min. Growth hormone released. Sleepwalking, sleeptalking, night terrors, bedwetting'],
          ['REM', 'Fast, near-waking (like NREM-1)', '<b>Heart rate up and irregular</b>, breathing rapid and irregular, eyes dart, muscles paralyzed', 'Vivid dreams, nightmares, sleep paralysis at its edges. About 20 to 25% of the night']])}
          <ul class="small" style="margin-top:12px">
            <li>Order within a cycle: N1 → N2 → N3 → back up to N2 → REM. REM does not follow N3 directly.</li>
            <li>A cycle takes about 90 minutes and repeats 4 to 6 times a night. First REM comes about an hour after falling asleep and lasts about 10 minutes.</li>
            <li>As the night goes on, NREM-3 shrinks and disappears while REM and N2 periods lengthen.</li>
            <li><b>REM rebound</b>: deprived of REM, you get extra REM the next chance you have.</li>
          </ul></div>
      </section>

      <section class="gsec" id="s-brain"><h2><span class="mod">1.5b</span> Circadian rhythm and sleep patterns</h2>
        <div class="gblock">
          <p><b>Circadian rhythm</b>: the roughly 24-hour biological clock for body temperature and alertness. Temperature rises toward morning and dips at night.</p>
          <p class="steps-inline">Light → retina → <b>SCN</b> (hypothalamus) → less <b>melatonin</b> from the <b>pineal gland</b> → alert. Darkness → SCN quiets → more melatonin → sleepy.</p>
          <ul>
            <li>Newborns sleep about two-thirds of the day, with much more REM; adults sleep about a third. Older adults sleep less and wake more.</li>
            <li>Sleep patterns are partly genetic (morning vs. night people) and shaped by culture, school start times, and stress.</li>
            <li>Screens and artificial light delay sleep by suppressing melatonin. Night-shift work and jet lag cause desynchronization; bright morning light resets the clock.</li>
            <li>Teens' clocks shift later; "everyone needs 8 hours" is a myth, since needs vary.</li>
          </ul></div>
      </section>

      <section class="gsec" id="s-why"><h2><span class="mod">1.5b</span> Why we sleep: 6 reasons</h2>
        <div class="gblock">${table(['Reason', 'What it means'], [
          ['Protects', 'Darkness made foraging dangerous; staying still and hidden kept ancestors safe.'],
          ['Recuperates', 'Restores the immune system, repairs neurons, clears waste.'],
          ['Consolidates memories', 'Replays the day\'s learning and strengthens those neural connections.'],
          ['Feeds creative thinking', 'Better insight and problem-solving after sleep.'],
          ['Supports growth', 'Pituitary releases growth hormone in deep NREM-3 sleep.'],
          ['Conserves energy', 'Keeps us inactive when food gathering would be inefficient.']])}</div>
      </section>

      <section class="gsec" id="s-loss"><h2><span class="mod">1.5c</span> Effects of sleep loss</h2>
        <div class="gblock"><ul>
          <li><b>Mood</b>: irritability; higher risk of depression (teens sleeping 5 hours or less).</li>
          <li><b>Thinking</b>: worse attention, concentration, and memory consolidation; microsleeps of 1 to 6 seconds.</li>
          <li><b>Weight</b>: more <b>ghrelin</b> (hunger), less <b>leptin</b> (fullness), more <b>cortisol</b> (fat production), lower metabolism.</li>
          <li><b>Health</b>: suppressed immune system (more colds), higher blood pressure, joint inflammation.</li>
          <li><b>Safety</b>: slower reactions, more errors; more accidents the Monday after "spring forward."</li>
          <li><b>Sleep debt</b> builds over nights and the brain tracks it for about two weeks. Randy Gardner stayed awake 11 days and hallucinated.</li>
        </ul></div>
      </section>

      <section class="gsec" id="s-dis"><h2><span class="mod">1.5c</span> Sleep disorders</h2>
        <div class="gblock">${table(['Disorder', 'What it is', 'Stage / key detail'], [
          ['Insomnia', 'Recurring trouble falling or staying asleep', 'About 1 in 5 adults. Pills and alcohol reduce REM and build tolerance'],
          ['Narcolepsy', 'Sudden, uncontrollable sleep attacks', 'Can drop <b>straight into REM</b>'],
          ['Sleep apnea', 'Breathing stops repeatedly; brief awakenings not remembered', 'Snoring, daytime fatigue; linked to obesity, especially in men'],
          ['Sleepwalking / sleeptalking', 'Complex actions or talking while asleep', '<b>NREM-3</b>; children; runs in families; not remembered'],
          ['Night terrors', 'High arousal, looks terrified, may scream', '<b>NREM-3</b>, first 2 to 3 hours; seldom remembered; mostly children'],
          ['Nightmares (contrast)', 'Frightening dreams', '<b>REM</b>, toward morning; remembered'],
          ['REM sleep behavior disorder', 'REM paralysis fails, so dreams are acted out (kicking, punching)', '<b>REM</b>; more common in older adults'],
          ['Sleep paralysis', 'Awake but cannot move or speak; often hallucinations', '<b>REM</b>: mind wakes while REM paralysis is still on']])}</div>
      </section>

      <section class="gsec" id="s-dream"><h2><span class="mod">1.5c</span> Dreams and dream theories</h2>
        <div class="gblock"><p><b>Dream</b>: a sequence of images, emotions, and thoughts passing through a sleeping mind. REM dreams are vivid, emotional, often bizarre. Most dreams are about ordinary life and about 8 in 10 include a negative event or emotion. Outside stimuli (a water spray, a ringing phone) can get woven in.</p>
        ${table(['Theory', 'Dreams are…', 'Evidence / weakness'], [
          ['Information processing (consolidation)', 'sorting the day\'s events and storing memories', 'Rats replay maze routes in REM. Weakness: we dream of things we never experienced'],
          ['Physiological function', 'regular brain stimulation that builds and preserves neural pathways', 'Infants spend lots of time in REM. Weakness: does not explain why dreams mean something'],
          ['Activation-synthesis (neural activation)', 'the brain making a story out of random neural firing from the brainstem', 'Weakness: the story the brain builds still reflects the dreamer'],
          ['Cognitive development', 'a reflection of the dreamer\'s knowledge and level of development', 'Young kids\' dreams are like slide shows. Weakness: proposes no adaptive function'],
          ['Wish fulfillment (Freud)', 'disguised wishes: manifest content (storyline) hides latent content (meaning)', 'Little scientific support']])}
          <p class="small mut" style="margin-bottom:0">During emotional dreams the amygdala is active and the frontal lobe idles, which is why dreams feel emotional and illogical.</p></div>
      </section>

      <section class="gsec" id="s-con"><h2><span class="mod">1.5a</span> Consciousness</h2>
        <div class="gblock">${table(['Term', 'Meaning', 'Example'], [
          ['Consciousness', 'Subjective awareness of ourselves and our environment', 'Noticing you are nervous'],
          ['Cognitive neuroscience', 'Studying the brain activity linked with thinking, memory, perception, language', 'fMRI of a patient imagining tennis'],
          ['Dual processing', 'Information processed at once on conscious and unconscious tracks', 'Gut reaction plus later reasoning'],
          ['Blindsight', 'Responding to visual stimuli without conscious awareness of seeing them', 'Catching a ball you say you can\'t see'],
          ['Parallel processing', 'Many aspects at once; unconscious; familiar tasks', 'Recognizing a face instantly'],
          ['Sequential processing', 'One aspect at a time; conscious; new or hard tasks', 'Learning to merge on a highway']])}</div>
      </section>

      <section class="gsec" id="s-sense"><h2><span class="mod">1.6</span> The senses</h2>
        <div class="two">
          <div class="gblock"><h3>Thresholds (1.6a)</h3><ul>
            <li><b>Absolute threshold</b>: weakest stimulus detected 50% of the time.</li>
            <li><b>Difference threshold</b> (JND): smallest difference detected 50% of the time.</li>
            <li><b>Weber's law</b>: the difference must be a constant <i>percentage</i>, not amount.</li>
            <li><b>Signal detection</b>: detection depends on expectations, motivation, fatigue, not just strength. Hits, misses, false alarms, correct rejections.</li>
            <li><b>Subliminal</b>: below the absolute threshold; can briefly prime, no lasting persuasion.</li>
            <li><b>Sensory adaptation</b>: constant stimulus, less sensitivity.</li></ul></div>
          <div class="gblock"><h3>Vision (1.6b)</h3><ul>
            <li>Wavelength → <b>hue</b>; amplitude → <b>brightness</b>.</li>
            <li>Cornea → pupil (iris sizes it) → lens (accommodation) → retina (rods: dim light, motion; cones: color, detail, fovea).</li>
            <li>Rods/cones → bipolar → ganglion cells → optic nerve (blind spot) → <b>optic chiasm</b> (partial crossover) → <b>thalamus</b> → visual cortex (occipital).</li>
            <li><b>Trichromatic</b>: 3 cones (red, green, blue), explains color blindness. <b>Opponent-process</b>: red-green, blue-yellow, black-white, explains afterimages.</li>
            <li><b>Feature detectors</b> (Hubel and Wiesel); <b>fusiform face area</b> (temporal lobe, faces). Parallel processing: color, motion, form, depth.</li></ul></div>
          <div class="gblock"><h3>Hearing (1.6c)</h3><ul>
            <li>Frequency → <b>pitch</b>; amplitude → <b>loudness</b> (decibels).</li>
            <li>Outer: pinna, auditory canal, eardrum. Middle: hammer, anvil, stirrup. Inner: oval window, cochlea (basilar membrane, hair cells) → auditory nerve → thalamus → temporal lobe.</li>
            <li><b>Sensorineural</b>: hair cells or auditory nerve damaged (most common). <b>Conduction</b>: eardrum or middle-ear bones damaged. <b>Cochlear implant</b> stimulates the auditory nerve.</li>
            <li><b>Place theory</b>: high pitches. <b>Frequency theory</b>: low pitches (volley principle in between).</li>
            <li>Locating sound: which ear hears it first and louder.</li></ul></div>
          <div class="gblock"><h3>Other senses (1.6d)</h3><ul>
            <li><b>Touch</b>: pressure, warmth, cold, pain. Pain: nociceptors → spinal cord → thalamus → cortex. <b>Gate-control</b>: small fibers open the gate; large fibers (rubbing) and the brain (distraction) close it. Placebos work through expectation and endorphins.</li>
            <li><b>Taste</b> (gustation): sweet, salty, sour, bitter, umami, oleogustus (fat).</li>
            <li><b>Smell</b> (olfaction): skips the thalamus, goes to the limbic system, so it is tied to emotion and memory.</li>
            <li><b>Bottom-up</b> starts from the senses; <b>top-down</b> uses expectations. <b>Sensory interaction</b>: smell shapes taste. <b>Embodied cognition</b>: a warm cup makes people seem warmer. <b>Synesthesia</b>: hearing colors.</li></ul></div>
        </div>
      </section>
    </main>`;
    $$('.guide-nav a', app).forEach(a => a.onclick = e => {
      e.preventDefault();
      document.getElementById(a.getAttribute('href').slice(1)).scrollIntoView({ behavior: 'smooth' });
    });
  };
})();
