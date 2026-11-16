---
title: Outdoor heat at work in Qatar
---

```js
import {riskCategories, exposureShare, exposurePanel} from "./components/exposure.js";

const observations = FileAttachment("./data/heat-exposure.json").json();
const categoryControl = Inputs.radio(riskCategories, {value: riskCategories[0], label: "Heat stress level"});
const category = Generators.input(categoryControl);
```

<header class="page-intro">
  <h1>Outdoor heat at work in Qatar</h1>
  <p>In summer 2019, a field study tracked heat exposure among 125 workers at a construction site and a farm.</p>
</header>

<section class="exposure-figure" aria-labelledby="comparison-title">
  <div class="figure-heading">
    <h2 id="comparison-title">Share of shift time by heat stress level</h2>
    <div class="metric-control">${categoryControl}</div>
  </div>
  <div class="comparison-grid">
    ${exposurePanel(html, observations.filter((row) => row.comparison === "setting"), category, {heading: "Work setting", comparison: "setting", labelGap: true})}
    ${exposurePanel(html, observations.filter((row) => row.comparison === "clock"), category, {heading: "Time of day", comparison: "clock", labelGap: false})}
  </div>
  <p class="source">Source: Flouris et al. (2019), FAME Laboratory. <a href="https://www.ilo.org/sites/default/files/wcmsp5/groups/public/@arabstates/@ro-beirut/documents/publication/wcms_723545.pdf#page=5">Table e1, page 4</a>.</p>
</section>

<section class="context" aria-labelledby="study-context">
  <h2 id="study-context">How to read the figures</h2>
  <p>The study used wet-bulb globe temperature (WBGT) to measure heat stress. It classified 31.1–32.1°C as high and anything above 32.1°C as extreme.</p>
  <p>The setting and time-of-day groups can overlap. Values were rounded in the source. The observations cover two sites in 2019 and predate Qatar’s 2021 heat-stress rules.</p>
  <details>
    <summary>View chart values</summary>
    <table class="data-table">
      <caption>Share of shift time by heat stress level</caption>
      <thead><tr><th scope="col">Group</th><th scope="col">High or extreme</th><th scope="col">Extreme only</th></tr></thead>
      <tbody>${observations.map((row) => html`<tr><th scope="row">${row.label}</th><td>${exposureShare(row, riskCategories[0])}%</td><td>${exposureShare(row, riskCategories[1])}%</td></tr>`)}</tbody>
    </table>
  </details>
</section>
