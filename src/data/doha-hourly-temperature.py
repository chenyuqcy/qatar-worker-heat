"""Regenerate the Doha temperature profile with Python 3.8+ and curl."""

import csv
import io
import json
from datetime import date, datetime, timedelta, timezone
from decimal import Decimal
from pathlib import Path
from statistics import quantiles
from subprocess import check_output


SOURCE = (
    "https://power.larc.nasa.gov/api/temporal/hourly/point"
    "?parameters=T2M&community=AG&longitude=51.53&latitude=25.29"
    "&start=20240531&end=20240916&format=CSV&time-standard=UTC"
)
DOHA_TIME = timezone(timedelta(hours=3))
START = date(2024, 6, 1)
END = date(2024, 9, 16)  # Exclusive, in Qatar local time.


def main():
    source_csv = check_output(
        ["curl", "--fail", "--silent", "--show-error", "--location", "--max-time", "60", SOURCE],
        encoding="utf-8-sig",
    )

    _, header_end, data = source_csv.partition("-END HEADER-")
    if not header_end:
        raise ValueError("NASA POWER response lacks its expected CSV header.")

    by_hour = [[] for _ in range(24)]
    seen = set()
    for row in csv.DictReader(io.StringIO(data.lstrip())):
        utc = datetime(
            int(row["YEAR"]),
            int(row["MO"]),
            int(row["DY"]),
            int(row["HR"]),
            tzinfo=timezone.utc,
        )
        local = utc.astimezone(DOHA_TIME)
        if not START <= local.date() < END:
            continue

        temperature = Decimal(row["T2M"])
        if not temperature.is_finite() or temperature == -999:
            raise ValueError(f"Missing temperature at {local.isoformat()}.")
        if local in seen:
            raise ValueError(f"Duplicate temperature at {local.isoformat()}.")
        seen.add(local)
        by_hour[local.hour].append(temperature)

    expected_days = (END - START).days
    records = []
    for hour, temperatures in enumerate(by_hour):
        if len(temperatures) != expected_days:
            raise ValueError(f"Expected {expected_days} values for local hour {hour:02d}.")

        # Interpolate within the observed sample. The sorted endpoints are p0 and p100.
        deciles = quantiles(temperatures, n=10, method="inclusive")
        records.append(
            {
                "hour": hour,
                "p10": float(round(deciles[0], 2)),
                "median": float(round(deciles[4], 2)),
                "p90": float(round(deciles[8], 2)),
                "count": len(temperatures),
            }
        )

    output = Path(__file__).with_suffix(".json")
    output.write_text(json.dumps(records, indent=2) + "\n", encoding="utf-8")
    print(f"Wrote {len(records)} hourly summaries from {len(seen)} observations to {output}.")


if __name__ == "__main__":
    main()
