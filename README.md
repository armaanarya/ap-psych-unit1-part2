# AP Psych Unit 1, Part 2 Learn

Quizlet Learn style study site for AP Psychology Unit 1, Part 2 (Modules 1.5a to 1.6d): consciousness, sleep, dreams, and sensation. Static, no build step.

- **Learn** (`#/learn`): 151 definitions and 87 AP-style scenario questions in rounds of 7. Definitions go multiple choice first, then typed. Scenarios explain the answer. Missed items return later in the round. Exam weighting (on by default) draws each round about 60% sleep, 20% cognition (1.5a), 20% sensation.
- **Flashcards** (`#/cards`): flip through the definitions by module.
- **Review sheet** (`#/sheet`): the teacher's flagged topics, a hypnogram, and tables for stages, sleep in the brain, disorders, dream theories, and the senses.

## Files

| File | What it holds |
| --- | --- |
| `js/data-learn.js` | Definition items: `[term, prompt, [accepted spellings], hot]` grouped by module |
| `js/data-apply.js` | Scenario items: `{ gid, hot, q, a, w: [3 wrong], why }` |
| `js/learn.js` | Learn engine, including the exam weighting (`BUCKET_W`) |
| `js/cards.js`, `js/sheet.js`, `js/app.js` | Flashcards, review sheet, router and home |

`hot: 1` marks the teacher's flagged topics (sleep brain structures, the irregular heartbeat in REM, sleep paralysis in REM, kinesthesis vs. vestibular).

## Run locally

```bash
python3 -m http.server 4328
```

Pushes to `main` deploy to Vercel.
