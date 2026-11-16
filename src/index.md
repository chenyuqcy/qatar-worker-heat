---
title: Outdoor heat at work in Qatar
---

```js
import {riskCategories, exposureShare, exposurePanel} from "./components/exposure.js";
import {breakComparison} from "./components/breaks.js";

const breaks = FileAttachment("./data/unplanned-breaks.json").json();
const observations = FileAttachment("./data/heat-exposure.json").json();
const categoryControl = Inputs.radio(riskCategories, {value: riskCategories[0], label: "Heat stress level"});
const category = Generators.input(categoryControl);
```

<header class="page-intro">
  <h1>Outdoor heat at work in Qatar</h1>
  <p>In summer 2019, a field study tracked heat exposure and work activity among 125 workers at a construction site and a farm.</p>
</header>

<section class="exposure-figure" aria-labelledby="comparison-title">
  <div class="figure-heading">
    <h2 id="comparison-title">Share of shift time by heat stress level</h2>
    <div class="metric-control">${categoryControl}</div>
  </div>
  <div class="comparison-grid">
    ${exposurePanel(html, observations.filter((row) => row.comparison === "setting"), category, {heading: "Work setting", comparison: "setting", labelGap: true})}
    ${exposurePanel(html, observations.filter((row) => row.comparison === "clock"), category, {heading: "Time of day", comparison: "clock", note: "Daytime 04:54–18:25. Nighttime 18:26–04:53 the next day. The study used local times based on average sunrise and sunset in July 2019."})}
  </div>
  <p class="source">Source: Flouris et al. (2019), FAME Laboratory. <a href="https://www.ilo.org/sites/default/files/wcmsp5/groups/public/@arabstates/@ro-beirut/documents/publication/wcms_723545.pdf#page=5">Table e1, page 4</a>.</p>
</section>

<section class="exposure-figure breaks-figure" aria-labelledby="breaks-title">
  <h2 id="breaks-title">Unplanned breaks by shift</h2>
  <p class="figure-description">Share of observed shift time spent on worker-initiated breaks. Scheduled breaks such as meals are excluded.</p>
  ${breakComparison(html, breaks)}
  <p class="figure-note">Shift hours are local. The sites differed in tasks, schedules, and heat protections. The pilot ran under a research exemption that required specific precautions.</p>
  <p class="source">Source: Flouris et al. (2019), FAME Laboratory. <a href="https://www.ilo.org/sites/default/files/wcmsp5/groups/public/@arabstates/@ro-beirut/documents/publication/wcms_723545.pdf#page=7">Table e3, page 6</a>.</p>
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
