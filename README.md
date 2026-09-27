# discrete-math-trainer

A small offline study app for a discrete math exam: 60 questions with full answers, spaced-repetition flashcards, a definition quiz, and self-graded boss exams. No dependencies, plain HTML and JS, white and black UI.

The interface and the study materials both switch between Russian and English (RU / EN buttons in the sidebar).

## Features

- 60 exam questions with definitions, theorems, and worked examples
- Study gate: practice unlocks only after the theory is marked as studied
- Flashcards with spaced repetition (1 min to 1 day intervals)
- Quiz and a 45-second true/false sprint over definitions
- Boss exams per block with a final grade, self-scored 0/50/100
- Progress, XP levels, achievements; state kept in localStorage
- KaTeX is vendored, so the app works fully offline

## Run

```
python -m http.server 8123 --directory trainer
```

Open http://127.0.0.1:8123/

On Windows you can also double-click `trainer.cmd`.

## Project layout

```
blocks/                 study notes in Russian, one markdown file per topic block
blocks-en/              English mirror of the same notes
trainer/                the web app
  index.html            page shell
  app.js                app logic (modes, progress, gates)
  i18n.js               interface strings, Russian and English
  styles.css            minimal stylesheet
  data.js               generated content payload
  vendor/katex/         local KaTeX build
build_trainer_data.py   parses blocks/*.md into trainer/data.js
```

There is no build step. `data.js` is generated once and committed. To regenerate it after editing the notes:

```
python build_trainer_data.py
```

## Notes

- Content and questions follow a standard Russian university course in discrete mathematics (number theory and RSA, group theory, sets and relations, boolean functions and Post's theorem, combinatorics, graph theory).
- Progress is stored in the browser under the `dm_trainer_v1` key.
