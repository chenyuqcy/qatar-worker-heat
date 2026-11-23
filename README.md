# Outdoor Heat at Work in Qatar

An Observable Framework dashboard for CMU 67-290. It compares heat stress by setting and time of day, summarizes hourly air temperature near Doha, and compares unplanned break time by observed shift. Worksite data come from Tables e1 and e3 of the [2019 FAME Laboratory report hosted by the ILO](https://www.ilo.org/publications/assessment-occupational-heat-strain-and-mitigation-strategies-qatar).

## Run locally

Requires Node.js 22 and npm.

```sh
npm ci
npm run dev
```

Open the URL printed by Observable. The source aggregates are in `src/data/`. To refresh the 2024 temperature profile from the [NASA POWER hourly API](https://power.larc.nasa.gov/docs/services/api/temporal/hourly/), run `python3 src/data/doha-hourly-temperature.py`. The script converts UTC to Doha time and uses linearly interpolated 10th, 50th, and 90th percentiles by local hour. It checks for a complete 107-day sample.

## Build and deploy

```sh
npm run build
```

Connect the repository to Vercel using the Other framework preset. The project configuration runs the build and serves the generated `dist` directory.
