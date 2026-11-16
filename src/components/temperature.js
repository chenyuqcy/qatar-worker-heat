const restrictedHours = [10, 15.5];
const colors = {
  median: "#235e8f",
  range: "#ccddeb",
  restricted: "#f1e9d6",
  guides: "#a0834e",
};

function formatHour(hour) {
  return String(hour).padStart(2, "0") + ":00";
}

export function summerTemperaturePlot(Plot, rows, {width = 760} = {}) {
  const compact = width < 480;
  return Plot.plot({
    className: "temperature-plot",
    width,
    height: compact ? 252 : 290,
    marginLeft: 54,
    marginRight: 20,
    marginTop: 21,
    marginBottom: 42,
    style: {
      background: "none",
      color: "#4c5662",
      fontFamily: "Source Sans 3, system-ui, sans-serif",
      fontSize: "12px",
    },
    ariaLabel: "Summer air temperature near Doha by local hour",
    ariaDescription: "June 1 through September 15, 2024. The line shows hourly medians and the band spans the 10th to 90th percentile. The marked interval runs from 10:00 to 15:30 Doha time.",
    x: {
      domain: [0, 23],
      ticks: compact ? [0, 6, 12, 18, 23] : [0, 4, 8, 12, 16, 20, 23],
      tickFormat: formatHour,
      label: "Local time in Doha",
      labelArrow: "none",
    },
    y: {
      nice: true,
      ticks: 5,
      label: "Air temperature (°C)",
      labelArrow: "none",
    },
    marks: [
      Plot.rect([restrictedHours], {
        x1: ([start]) => start,
        x2: ([, end]) => end,
        fill: colors.restricted,
        ariaHidden: true,
      }),
      Plot.gridY({stroke: "#d9dfe5", strokeOpacity: 0.8, ariaHidden: true}),
      Plot.areaY(rows, {
        x: "hour",
        y1: "p10",
        y2: "p90",
        fill: colors.range,
      }),
      Plot.ruleX(restrictedHours, {
        stroke: colors.guides,
        strokeDasharray: "3,3",
        strokeOpacity: 0.8,
        ariaHidden: true,
      }),
      Plot.lineY(rows, {
        x: "hour",
        y: "median",
        stroke: colors.median,
        strokeWidth: 2.4,
      }),
    ],
  });
}
