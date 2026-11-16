// Shares of observed shift time spent on work breaks in Table e3.
const ticks = [0, 25, 50, 75, 100];
const groups = [
  {key: "regular", title: "Regular shifts", className: "break-group"},
  {key: "pilot", title: "Pilot shift", className: "break-group break-group-pilot"},
];

export function breakComparison(html, rows) {
  return html`<div class="break-comparison">
    ${groups.map(({key, title, className}) => html`<section class=${className}>
      <h3>${title}</h3>
      <ul class="break-rows">
        ${rows.filter((row) => row.group === key).map((row) => {
          const position = row.share + "%";
          return html`<li class="break-row">
            <span class="break-label">
              <span class="break-site">${row.site}</span>
              <span class="break-hours">${row.hours}</span>
            </span>
            <span class="break-track">
              <span class="break-fill" aria-hidden="true" style=${{width: position}}></span>
              <strong class="break-value" style=${{left: position}}>${position}</strong>
            </span>
          </li>`;
        })}
      </ul>
    </section>`)}
    <div class="break-axis" aria-hidden="true">
      ${ticks.map((tick) => html`<span style=${{left: tick + "%"}}>${tick}%</span>`)}
    </div>
  </div>`;
}
