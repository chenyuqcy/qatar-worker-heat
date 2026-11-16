# Outdoor Heat and Worker Protection in Qatar

67-290 Storytelling with Data Visualization | Phase 2 Interim Report | Team 2

## Issue and audience

Outdoor workers in Qatar face heat stress that varies with sun exposure and shift timing. The dashboard is for site supervisors, safety staff, and worker representatives discussing shade, scheduling, and access to breaks.

## Checkpoint question and finding

How did the share of shift time in high or extreme heat stress vary by setting and time of day at two Qatar worksites? In the summer 2019 study, high or extreme heat stress accounted for 55% of shift time in direct sun and 12% indoors or in shade, a gap of 43 percentage points. Table e1 reports 31% during the day and 0% at night, using rounded percentages.

## Data and scope

Table e1 of the [Flouris et al. field study](https://www.ilo.org/sites/default/files/wcmsp5/groups/public/@arabstates/@ro-beirut/documents/publication/wcms_723545.pdf#page=5) provides aggregate wet-bulb globe temperature (WBGT) categories across one construction site and one farm. The study covered 125 workers. We added the published high and extreme percentages within each row. Setting and time are overlapping views of the study. The findings describe the two sites in 2019. Evaluating current work conditions or the effects of the 2021 rule would require additional worksite data.

## Visualization principles

- **Position on a common scale.** Horizontal dot position encodes the percentage in each category. A shared scale supports comparison across the two panels.
- **Small multiples and proximity.** Matching panels group the setting comparison and the time-of-day comparison. Direct labels sit close to the corresponding dots.
- **Data-ink ratio and annotation.** Light gridlines and direct percentage labels keep attention on the four values. An annotation names the 43-point gap between direct sun and indoors or shade.

## Next step

Add Doha's hourly summer air temperatures from NASA POWER as weather context and a separate chart of observed break time by shift from Table e3. The [2021 ministerial decision](https://www.ilo.org/resource/qatars-ministerial-decision-heat-stress) will provide policy context.

*ChatGPT assisted with source research, drafting, and code. The repository README records the coding prompt and files.*
