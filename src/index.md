---
title: When the Workday Is Still Hot
---

```js
import {riskCategories, exposureShare, exposurePanel} from "./components/exposure.js";
import {breakComparison} from "./components/breaks.js";
import {summerTemperaturePlot} from "./components/temperature.js";

const breaks = FileAttachment("./data/unplanned-breaks.json").json();
const observations = FileAttachment("./data/heat-exposure.json").json();
const temperatureRows = await FileAttachment("./data/doha-hourly-temperature.json").json();
const regularBreaks = breaks.filter(row => row.group === "regular");
const constructionBreaks = regularBreaks.filter(row => row.site === "Construction");
const farmBreak = regularBreaks.find(row => row.site === "Farm");
const peak = temperatureRows.reduce((a, b) => a.median >= b.median ? a : b);
const at16 = temperatureRows.find(row => row.hour === 16);
const localHourLabel = hour => String(hour).padStart(2, "0") + ":00";
const categoryControl = Inputs.radio(riskCategories, {value: riskCategories[0], label: "Heat stress level"});
const category = Generators.input(categoryControl);
```

<header class="page-intro">
  <h1>When the Workday Is Still Hot</h1>
  <p>Qatar’s summer work restriction sets hours for covered outdoor work. What should employers check when a crew is scheduled to work outside those hours?</p>
</header>

<section class="exposure-figure" aria-labelledby="comparison-title">
  <h2 id="comparison-title">Start with where people work</h2>
  <p class="figure-description">In summer 2019, researchers followed 125 workers at a construction site and a farm in Qatar. Workers spent 55% of observed time in the sun under high or extreme heat stress, compared with 12% indoors or in shade.</p>
  <div class="figure-heading">
    <p class="figure-label">Share of observed time by heat stress level</p>
    <div class="metric-control">${categoryControl}</div>
  </div>
  <div class="comparison-grid">
    ${exposurePanel(html, observations.filter((row) => row.comparison === "setting"), category, {heading: "Work setting", comparison: "setting", labelGap: true})}
    ${exposurePanel(html, observations.filter((row) => row.comparison === "clock"), category, {heading: "Time of day", comparison: "clock", note: "Daytime 04:54–18:25. Nighttime 18:26–04:53 the next day. The study used local times based on average sunrise and sunset in July 2019."})}
  </div>
  <p class="source">Source: Flouris et al. (2019), FAME Laboratory. <a href="https://www.ilo.org/sites/default/files/wcmsp5/groups/public/@arabstates/@ro-beirut/documents/publication/wcms_723545.pdf#page=5">Table e1, page 4</a>.</p>
</section>

<section class="exposure-figure temperature-figure" aria-labelledby="temperature-title">
  <h2 id="temperature-title">Check conditions when work resumes</h2>
  <p class="figure-description">The 2019 field study shows how exposure can vary by setting and time. A separate set of 2024 estimates near Doha shows what air temperatures can look like after the restricted hours end.</p>
  <p class="figure-label">Hourly air temperature near Doha, June 1–September 15, 2024</p>
  <ul class="temperature-key" aria-label="Chart key">
    <li><span class="key-median" aria-hidden="true"></span>Hourly median</li>
    <li><span class="key-spread" aria-hidden="true"></span>10th to 90th percentile</li>
    <li><span class="key-restriction" aria-hidden="true"></span>10:00–15:30 work restriction</li>
  </ul>
  <div class="temperature-chart">${resize(width => summerTemperaturePlot(Plot, temperatureRows, {width}))}</div>
  <p class="gap-note">The median reached <strong>${peak.median.toFixed(1)}°C at ${localHourLabel(peak.hour)}</strong> and was <strong>${at16.median.toFixed(1)}°C at 16:00</strong>, the first plotted hour after the restriction ends.</p>
  <p class="figure-note">Each hour summarizes 107 days of NASA POWER air temperature estimates. Qatar’s 2021 decision restricts covered outdoor work from 10:00 to 15:30, June 1 through September 15. The separate stop-work rule applies when worksite WBGT exceeds 32.1°C.</p>
  <details class="temperature-values">
    <summary>View hourly temperature values</summary>
    <table class="data-table">
      <caption>Local hour and air temperature in °C</caption>
      <thead><tr><th scope="col">Hour</th><th scope="col">10th pct.</th><th scope="col">Median</th><th scope="col">90th pct.</th></tr></thead>
      <tbody>${temperatureRows.map(row => html`<tr><th scope="row">${localHourLabel(row.hour)}</th><td>${row.p10.toFixed(2)}</td><td>${row.median.toFixed(2)}</td><td>${row.p90.toFixed(2)}</td></tr>`)}</tbody>
    </table>
  </details>
  <p class="source">Sources: <a href="https://power.larc.nasa.gov/api/temporal/hourly/point?parameters=T2M&amp;community=AG&amp;longitude=51.53&amp;latitude=25.29&amp;start=20240531&amp;end=20240916&amp;format=CSV&amp;time-standard=UTC">NASA POWER hourly T2M data</a> and <a href="https://www.ilo.org/sites/default/files/wcmsp5/groups/public/@arabstates/@ro-beirut/documents/legaldocument/wcms_794551.pdf#page=2">Ministerial Decision No. 17 of 2021, Articles 2 and 4</a>.</p>
</section>

<section class="exposure-figure breaks-figure" aria-labelledby="breaks-title">
  <h2 id="breaks-title">Make room for breaks during the shift</h2>
  <p class="figure-label">Share of observed shift time spent on unplanned breaks</p>
  <p class="figure-description">The 2019 field study counted worker-initiated breaks separately from scheduled breaks such as meals.</p>
  ${breakComparison(html, breaks)}
  <p class="gap-note">Workers took unplanned breaks for <strong>${constructionBreaks.map(row => row.share + "%").join(" and ")}</strong> of the two regular construction shifts, compared with <strong>${farmBreak.share}%</strong> of the farm shift.</p>
  <p class="figure-note">Shift hours are local. The sites differed in tasks, schedules, and heat protections. The pilot ran under a research exemption that required specific precautions.</p>
  <p class="source">Source: Flouris et al. (2019), FAME Laboratory. <a href="https://www.ilo.org/sites/default/files/wcmsp5/groups/public/@arabstates/@ro-beirut/documents/publication/wcms_723545.pdf#page=7">Table e3, page 6</a>.</p>
</section>

<section class="takeaway" aria-labelledby="takeaway-title">
  <h2 id="takeaway-title">What to check before crews go back outside</h2>
  <p>Site supervisors should follow the summer schedule, check worksite WBGT before crews start or resume outdoor work, and make shaded rest areas and breaks easy to access throughout the shift.</p>
  <p>The two-site study shows how much exposure and break time varied in practice. The Doha temperature profile shows why 15:30 alone tells you little about conditions a crew will face.</p>
</section>

<section class="context" aria-labelledby="study-context">
  <h2 id="study-context">How to read the figures</h2>
  <p>The study used wet-bulb globe temperature (WBGT) to measure heat stress. It classified 31.1–32.1°C as high and anything above 32.1°C as extreme.</p>
  <p>The setting and time-of-day groups can overlap. Values were rounded in the source. The observations cover two sites in 2019 and predate Qatar’s 2021 heat-stress rules.</p>
  <details>
    <summary>View heat stress values</summary>
    <table class="data-table">
      <caption>Share of shift time by heat stress level</caption>
      <thead><tr><th scope="col">Group</th><th scope="col">High or extreme</th><th scope="col">Extreme only</th></tr></thead>
      <tbody>${observations.map((row) => html`<tr><th scope="row">${row.label}</th><td>${exposureShare(row, riskCategories[0])}%</td><td>${exposureShare(row, riskCategories[1])}%</td></tr>`)}</tbody>
    </table>
  </details>
</section>
