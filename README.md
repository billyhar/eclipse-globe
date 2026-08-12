# Eclipse Globe Tracker — 12 August 2026

A real-time globe tracker for the total solar eclipse of **12 August 2026**
(Greenland · Iceland · Spain).

Everything is computed in the browser from the **Besselian elements** published by
NASA/GSFC (Espenak) — nothing is hardcoded or animated by hand.

## What it shows

- The umbra's true elliptical footprint, moving in real time
- The full path of totality, swept from the umbra footprint along the central line
- Per-pixel **eclipse obscuration** and the day/night terminator, rendered as a raster
- Live shadow position, ground speed, path width, Sun altitude and totality duration
- Your own local circumstances (peak coverage + contact times) via geolocation
- Scrub/playback across the whole eclipse, from first to last contact

## Accuracy

Validated against the published circumstances:

| Quantity | Published | Computed |
|---|---|---|
| Greatest eclipse position | 65.225°N, 25.228°W | 65.224°N, 25.227°W |
| Sun altitude at greatest | 25.8° | 25.8° |
| Path width at greatest | 294.0 km | 293 km |
| Central phase | 17:00–18:32 UTC | 17:00:04–18:32:09 UTC |
| Partial phase | 15:33–19:57 UTC | 15:33–19:57 UTC |

Locations within ~0.3% of the path limit (Madrid, Bilbao) are genuinely marginal —
the true edge depends on the lunar limb profile and observer elevation, which this
model does not include.

## Files

| File | Purpose |
|---|---|
| `eclipse.js` | Besselian-element engine: shadow axis, local circumstances, contacts |
| `index.html` | Globe rendering, HUD and controls |
| `vendor/` | d3 + topojson-client, vendored so there is no CDN dependency |
| `*110m.json` | Natural Earth land and country outlines |

## Running locally

```bash
python3 -m http.server 5599
```

Then open <http://localhost:5599>. It must be served over HTTP — the page uses
`fetch` and ES modules, so `file://` will not work.

## Source

Besselian elements: [NASA/GSFC Five Millennium Catalog of Solar Eclipses](https://eclipse.gsfc.nasa.gov/SEbeselm/SEbeselm2001/SE2026Aug12Tbeselm.html)
