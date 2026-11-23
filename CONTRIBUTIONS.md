# Contribution Log

**Team name:** Team 2
**Members:** Airan Gu, Ray Hu, Chenyu Qiu

## Logged work

| Date (Doha) | Member | Contribution | Related commit or PR |
| --- | --- | --- | --- |
| 2026-11-15 | Chenyu Qiu | Selected the project topic for the Phase 1 draft. | None |
| 2026-11-16 | Chenyu Qiu | Requested a division of responsibilities for the checkpoint and provided the assignment requirements. | None |

## Checkpoint responsibilities

| Member | Planned responsibility | Status |
| --- | --- | --- |
| Airan Gu | Check the four Table e1 percentages against the original ILO report and verify the denominators, definitions, and limitations. | Planned |
| Ray Hu | Review the two dashboard charts and the annotation. Test the page on desktop and mobile and record any needed corrections. | Planned |
| Chenyu Qiu | Incorporate the reviews, finalize the interim report, coordinate GitHub and Vercel, and submit the checkpoint for Team 2. | Planned |

Add the actual date, work completed, and any related commit or PR as each task wraps up. The current dashboard and report drafts were prepared with ChatGPT assistance.

## AI assistance

ChatGPT generated the starter adaptation, data file, chart component, dashboard page and CSS from this implementation brief:

> Chart one question for proposal using attributed Flouris et al. 2019, ILO/FAME Table e1 printed p.4: dot plots as two small multiples with common linear percentage scales for high+extreme WBGT share of shift time.

The generated dashboard code is in `src/index.md`, `src/components/` and `src/heat.css`. The follow-up coding brief requested “zero-based horizontal bars, directly labeled values and shift hours” and a separate group for the construction pilot. ChatGPT also helped add the source-specific day and night times and rounding note.

The temperature update requested a “median line and P10–P90 band” with a distinct guide for “10:00–15:30 Doha time.” ChatGPT assisted with the chart in `src/components/temperature.js`, the preprocessing script, and the final report and slides.
