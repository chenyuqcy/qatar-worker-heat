// Table e1 reports whole percentages for each setting and time of day.
export const riskCategories = ["High or extreme", "Extreme only"];
const axisMax = 60;
const ticks = [0, 15, 30, 45, axisMax];

export function exposureShare(row, category) {
  return category === "Extreme only" ? row.extreme : row.high + row.extreme;
}

export function exposurePanel(html, rows, category, {heading, comparison, labelGap = false, note}) {
  const values = rows.map((row) => exposureShare(row, category));
  const headingId = comparison + "-title";

  return html`<section class="comparison-panel" aria-labelledby=${headingId}>
    <h3 id=${headingId}>${heading}</h3>
    <ul class="chart-rows">
      ${rows.map((row, index) => {
        const value = values[index];
        const position = (value / axisMax) * 100 + "%";
        return html`<li class="chart-row">
          <span class="row-label">${row.label}</span>
          <span class="chart-track">
            <span class="chart-point" style=${{left: position}}>${value}%${value === 0 ? html` <span class="value-note">(rounded)</span>` : null}</span>
          </span>
        </li>`;
      })}
    </ul>
    <div class="tick-row" aria-hidden="true">
      ${ticks.map((tick) => html`<span style=${{left: (tick / axisMax) * 100 + "%"}}>${tick}%</span>`)}
    </div>
    ${labelGap ? html`<p class="gap-note"><strong>${values[0] - values[1]} percentage points</strong> higher in the sun.</p>` : null}
    ${note ? html`<p class="figure-note">${note}</p>` : null}
  </section>`;
}
