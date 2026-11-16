# Outdoor Heat at Work in Qatar

An Observable Framework dashboard for CMU 67-290. It compares heat stress by setting and time of day, and unplanned break time by observed shift. Data come from Tables e1 and e3 of the [2019 FAME Laboratory report hosted by the ILO](https://www.ilo.org/publications/assessment-occupational-heat-strain-and-mitigation-strategies-qatar).

## Run locally

Requires Node.js 22 and npm.

```sh
npm ci
npm run dev
```

Open the URL printed by Observable. The source aggregates are in `src/data/heat-exposure.json` and `src/data/unplanned-breaks.json`.

## Build and deploy

```sh
npm run build
```

Connect the repository to Vercel using the Other framework preset. The project configuration runs the build and serves the generated `dist` directory.

## AI assistance

ChatGPT generated the starter adaptation, data file, chart component, dashboard page and CSS from this implementation brief:

> Chart one question for proposal using attributed Flouris et al. 2019, ILO/FAME Table e1 printed p.4: dot plots as two small multiples with common linear percentage scales for high+extreme WBGT share of shift time.

The generated dashboard code is in `src/index.md`, `src/components/` and `src/heat.css`. The follow-up coding brief requested “zero-based horizontal bars, directly labeled values and shift hours” and a separate group for the construction pilot. ChatGPT also helped add the source-specific day and night times and rounding note.
