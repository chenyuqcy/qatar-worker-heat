// Table e1 reports whole percentages for each setting and time of day.
export const riskCategories = ["High or extreme", "Extreme only"];
const axisMax = 60;
const ticks = [0, 15, 30, 45, axisMax];

export function exposureShare(row, category) {
  return category === "Extreme only" ? row.extreme : row.high + row.extreme;
}

export function exposurePanel(html, rows, category, {heading, comparison, labelGap}) {
  const first = exposureShare(rows[0], category);
  const second = exposureShare(rows[1], category);
  return html`<section class="comparison-panel" aria-labelledby=${comparison + "-title"}>
    <h3 id=${comparison + "-title"}>${heading}</h3>
    <ul class="chart-rows">
      ${rows.map((row, index) => {
        const value = exposureShare(row, category);
        return html`<li class="chart-row">
          <span class="row-label">${row.label}</span>
          <span class="chart-track">
            <span class="chart-dot ${index === 0 ? "higher" : "lower"}"
              aria-hidden="true" style=${{left: (value / axisMax) * 100 + "%"}}></span>
            <strong class="chart-value" style=${{left: (value / axisMax) * 100 + "%"}}>${value}%</strong>
          </span>
        </li>`;
      })}
    </ul>
    <div class="tick-row" aria-hidden="true">
      ${ticks.map((tick) => html`<span>${tick}%</span>`)}
    </div>
    <p class="panel-note ${labelGap ? "gap-note" : ""}">
      ${labelGap
        ? html`<strong>${first - second} percentage points</strong> more in the sun than indoors or in shade.`
        : html`The study reported ${second}% at night, rounded to a whole percentage.`}
    </p>
  </section>`;
}
