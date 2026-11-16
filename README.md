# Outdoor Heat at Work in Qatar

An Observable Framework dashboard for CMU 67-290. It compares 2019 field observations of heat stress by work setting and time of day. Data come from Table e1, page 4, of the [FAME Laboratory report hosted by the ILO](https://www.ilo.org/publications/assessment-occupational-heat-strain-and-mitigation-strategies-qatar).

## Run locally

Requires Node.js 22 and npm.

```sh
npm ci
npm run dev
```

Open the URL printed by Observable. The source table aggregates are stored in `src/data/heat-exposure.json`.

## Build and deploy

```sh
npm run build
```

Connect the repository to Vercel using the Other framework preset. The project configuration runs the build and serves the generated `dist` directory.

## AI assistance

ChatGPT generated the starter adaptation, data file, chart component, dashboard page and CSS from this implementation brief:

> Chart one question for proposal using attributed Flouris et al. 2019, ILO/FAME Table e1 printed p.4: dot plots as two small multiples with common linear percentage scales for high+extreme WBGT share of shift time.

The generated dashboard code is in `src/index.md`, `src/components/exposure.js` and `src/heat.css`. The checked source figures are in `src/data/heat-exposure.json`.
