# Solar Eclipse Tracker — 2026 to 2030

A real-time globe showing where the Moon's shadow falls on the Earth, for every
solar eclipse from **2026 through 2030** — eleven in all: four total, three
annular, four partial. It counts down to whichever comes next.

Everything is computed in the browser from the **Besselian elements** published by
NASA/GSFC (Espenak) — nothing is hardcoded or animated by hand.

## What it shows

- The umbra's true elliptical footprint, moving in real time
- The central path (totality or annularity), swept from that footprint along the central line
- **Obscuration contour rings** at 20/40/60/80/90%, computed in screen space
- Per-pixel eclipse obscuration and the day/night terminator, rendered as a raster
- Live shadow position, ground speed, path width, Sun altitude and central duration
- Your own local circumstances (peak coverage + contact times) via geolocation
- Scrub/playback across any eclipse, from first to last contact
- A live countdown to the next eclipse, deep-linkable per eclipse via `?e=<id>`

## Accuracy

Every eclipse in the catalog is validated against NASA's published circumstances.
Greatest-eclipse positions agree to within 0.01°, and path widths to ~1 km:

| Eclipse | Type | Width (computed / published) | Duration (computed / published) |
|---|---|---|---|
| 2026 Aug 12 | Total | 293 / 294.0 km | 134 / 138.2 s |
| 2027 Feb 06 | Annular | 281 / 281.5 km | 470 / 470.9 s |
| 2027 Aug 02 | Total | 258 / 257.7 km | 382 / 382.6 s |
| 2028 Jan 26 | Annular | 323 / 323.0 km | 627 / 627.1 s |
| 2028 Jul 22 | Total | 230 / 230.2 km | 309 / 309.7 s |
| 2030 Jun 01 | Annular | 249 / 249.6 km | 317 / 320.8 s |
| 2030 Nov 25 | Total | 169 / 169.3 km | 220 / 223.5 s |

The four 2029 eclipses are partial: the shadow axis misses the Earth entirely, so
they have no central path, and the tracker reports the point of maximum eclipse on
the limb instead.

Locations within ~1 km of a path limit (Madrid and Bilbao in 2026, for instance)
are genuinely marginal — the true edge depends on the lunar limb profile and
observer elevation, neither of which this model includes.

## Files

| File | Purpose |
|---|---|
| `eclipse.js` | Besselian-element engine: shadow axis, local circumstances, contacts |
| `eclipses.js` | Catalog of elements + metadata for all 11 eclipses, 2026–2030 |
| `index.html` | Globe rendering, HUD and controls |
| `vendor/` | d3 + topojson-client, vendored so there is no CDN dependency |
| `*110m.json` | Natural Earth land and country outlines |

## Regenerating the social preview

`og.png` is a headless render of the page, so it goes stale as the countdown ticks:

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless=new --disable-gpu --hide-scrollbars --force-device-scale-factor=1 \
  --window-size=1200,630 --virtual-time-budget=9000 --screenshot=og.png \
  "https://eclipse-globe.vercel.app/?e=2027-08-02&og=1"
```

## Running locally

```bash
python3 -m http.server 5599
```

Then open <http://localhost:5599>. It must be served over HTTP — the page uses
`fetch` and ES modules, so `file://` will not work.

## Source

Besselian elements: [NASA/GSFC Five Millennium Catalog of Solar Eclipses](https://eclipse.gsfc.nasa.gov/SEbeselm/SEbeselm2001/SE2026Aug12Tbeselm.html)
