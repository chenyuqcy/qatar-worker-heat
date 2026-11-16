---
title: Outdoor heat at work in Qatar
---

```js
import {riskCategories, exposureShare, exposurePanel} from "./components/exposure.js";

const observations = FileAttachment("./data/heat-exposure.json").json();
const categoryControl = Inputs.radio(riskCategories, {value: riskCategories[0], label: "Heat stress category"});
const category = Generators.input(categoryControl);
```

<header class="hero">
  <p class="study-label">Summer 2019 field study · Qatar</p>
  <h1>Outdoor heat at work</h1>
  <p class="hero-summary">How did heat stress differ by work setting and time of day at a construction site and a farm in Qatar?</p>
</header>

<section class="chart-card" aria-labelledby="comparison-title">
  <div class="chart-header">
    <div>
      <h2 id="comparison-title">How much of a shift was spent in high heat?</h2>
      <p class="chart-unit">Share of shift time in the selected wet-bulb globe temperature (WBGT) category</p>
    </div>
    <div class="metric-control">${categoryControl}</div>
  </div>
  <div class="comparison-grid" aria-live="polite">
    ${exposurePanel(html, observations.filter((row) => row.comparison === "setting"), category, {heading: "By work setting", comparison: "setting", labelGap: true})}
    ${exposurePanel(html, observations.filter((row) => row.comparison === "clock"), category, {heading: "By time of day", comparison: "clock", labelGap: false})}
  </div>
</section>

<section class="context" aria-labelledby="study-context">
  <h2 id="study-context">Reading the comparison</h2>
  <p>The field study covered 125 workers at two sites. The setting comparison groups shift time by where workers were. The time-of-day comparison groups shift time by when they worked. These groups can overlap.</p>
  <p>The study classified WBGT of 31.1–32.1°C as high heat stress and values above 32.1°C as extreme. These observations describe the two sites in summer 2019 and precede the 2021 heat-stress rules.</p>
  <details>
    <summary>View chart values</summary>
    <table class="data-table">
      <caption>Share of shift time by heat stress category</caption>
      <thead><tr><th scope="col">Group</th><th scope="col">High or extreme</th><th scope="col">Extreme only</th></tr></thead>
      <tbody>${observations.map((row) => html`<tr><th scope="row">${row.label}</th><td>${exposureShare(row, riskCategories[0])}%</td><td>${exposureShare(row, riskCategories[1])}%</td></tr>`)}</tbody>
    </table>
  </details>
  <p class="source">Flouris et al. (2019), FAME Laboratory, Table e1, p. 4. <a href="https://www.ilo.org/publications/assessment-occupational-heat-strain-and-mitigation-strategies-qatar">ILO field study</a></p>
</section>
