/*
 * Besselian-element solar eclipse engine.
 * Elements: Total Solar Eclipse of 2026 Aug 12 (NASA/GSFC, Espenak).
 * t0 = 18:00:00.0 TDT, dT = 71.4s
 */

export const ELEMENTS = {
  name: 'Total Solar Eclipse of 12 August 2026',
  t0: Date.UTC(2026, 7, 12, 18, 0, 0),   // reference hour, TDT
  dT: 71.4,                               // TDT - UT, seconds
  x:  [0.475593, 0.5189288, -0.0000773, -0.0000088],
  y:  [0.771161, -0.2301664, -0.0001245, 0.0000037],
  d:  [14.79667, -0.012065, -0.000003],
  l1: [0.537954, 0.0000940, -0.0000121],
  l2: [-0.008142, 0.0000935, -0.0000121],
  mu: [88.74776, 15.003093],
  tanf1: 0.0046141,
  tanf2: 0.0045911,
  // published circumstances, used for display + sanity checks
  greatest: { utc: Date.UTC(2026, 7, 12, 17, 45, 53, 800), lat: 65.225, lon: -25.228 },
  gamma: 0.8978,
  magnitude: 1.0386,
  duration: 138.2,      // seconds at greatest eclipse
  pathWidth: 294.0      // km
};

const E2 = 0.00669454;              // Earth flattening: e^2
const R_EARTH = 6378.137;           // km, equatorial
const D2R = Math.PI / 180, R2D = 180 / Math.PI;

const poly = (c, t) => c.reduce((s, v, i) => s + v * Math.pow(t, i), 0);
const dpoly = (c, t) => c.reduce((s, v, i) => (i ? s + i * v * Math.pow(t, i - 1) : s), 0);

/** Besselian elements evaluated at a UTC instant (ms). */
export function elementsAt(utcMs, E = ELEMENTS) {
  // t is hours from t0 in TDT; input is UT, so add dT
  const t = (utcMs + E.dT * 1000 - E.t0) / 3600000;
  return {
    t,
    x: poly(E.x, t),   dx: dpoly(E.x, t),
    y: poly(E.y, t),   dy: dpoly(E.y, t),
    d: poly(E.d, t) * D2R,
    mu: poly(E.mu, t),
    l1: poly(E.l1, t),
    l2: poly(E.l2, t),
    tanf1: E.tanf1, tanf2: E.tanf2, dT: E.dT
  };
}

/**
 * Point where the shadow axis meets the Earth's surface.
 * Returns null when the axis misses the Earth (no central eclipse).
 */
export function shadowAxisPoint(utcMs, E = ELEMENTS) {
  const e = elementsAt(utcMs, E);
  const { x, y, d, mu } = e;

  const rho1 = Math.sqrt(1 - E2 * Math.cos(d) ** 2);
  const sd1 = Math.sin(d) / rho1;
  const cd1 = Math.sqrt(1 - E2) * Math.cos(d) / rho1;

  const eta1 = y / rho1;
  const zeta1sq = 1 - x * x - eta1 * eta1;
  if (zeta1sq <= 0) return null;                 // axis misses the Earth
  const zeta1 = Math.sqrt(zeta1sq);

  const sinPhi1 = eta1 * cd1 + zeta1 * sd1;
  const phi1 = Math.asin(Math.max(-1, Math.min(1, sinPhi1)));
  const theta = Math.atan2(x, zeta1 * cd1 - eta1 * sd1) * R2D;

  const lat = Math.atan(Math.tan(phi1) / Math.sqrt(1 - E2)) * R2D;
  // mu is referred to TDT; rotate back to UT. West-positive -> negate for east.
  let lon = -(mu - theta - 1.00273791 * (E.dT * 15 / 3600));
  lon = ((lon + 540) % 360) - 180;

  // umbral / penumbral radii on the ground
  const L2p = e.l2 - zeta1 * e.tanf2;
  const L1p = e.l1 - zeta1 * e.tanf1;
  const widthKm = Math.abs(L2p) * 2 * R_EARTH;   // across-path width
  const sunAlt = Math.asin(Math.max(-1, Math.min(1, zeta1))) * R2D;

  // The umbra's ground footprint is an ellipse: a circle of radius |L2'|
  // stretched by 1/sin(alt) along the Sun's azimuth.
  const sub = subSolarPoint(e, E);
  const sunAz = bearing(lat, lon, sub.lat, sub.lon);

  return {
    lat, lon, zeta1, sunAlt, sunAz,
    semiMinorKm: Math.abs(L2p) * R_EARTH,                       // across the Sun's azimuth
    semiMajorKm: Math.abs(L2p) * R_EARTH / Math.max(zeta1, 0.02), // along it
    umbraWidthKm: widthKm,
    penumbraRadiusKm: Math.abs(L1p) * R_EARTH,
    total: L2p < 0                                // negative L2' => total (not annular)
  };
}

/** Point where the shadow axis is vertical — effectively the sub-solar point. */
export function subSolarPoint(e, E = ELEMENTS) {
  let lon = -(e.mu - 1.00273791 * (E.dT * 15 / 3600));
  lon = ((lon + 540) % 360) - 180;
  const lat = Math.atan(Math.tan(e.d) / (1 - E2)) * R2D;
  return { lat, lon };
}

/** Initial great-circle bearing from a to b, degrees clockwise from north. */
export function bearing(lat1, lon1, lat2, lon2) {
  const p1 = lat1 * D2R, p2 = lat2 * D2R, dl = (lon2 - lon1) * D2R;
  const y = Math.sin(dl) * Math.cos(p2);
  const x = Math.cos(p1) * Math.sin(p2) - Math.sin(p1) * Math.cos(p2) * Math.cos(dl);
  return (Math.atan2(y, x) * R2D + 360) % 360;
}

/** Great-circle destination from a point, given distance (km) and bearing (deg). */
export function destination(lat, lon, distKm, brgDeg) {
  const d = distKm / R_EARTH, p1 = lat * D2R, l1 = lon * D2R, b = brgDeg * D2R;
  const p2 = Math.asin(Math.sin(p1) * Math.cos(d) + Math.cos(p1) * Math.sin(d) * Math.cos(b));
  const l2 = l1 + Math.atan2(Math.sin(b) * Math.sin(d) * Math.cos(p1),
                             Math.cos(d) - Math.sin(p1) * Math.sin(p2));
  return [((l2 * R2D + 540) % 360) - 180, p2 * R2D];
}

/** Umbra footprint as a closed GeoJSON ring ([lon,lat] pairs). */
export function umbraRing(p, steps = 72) {
  const ring = [];
  for (let i = 0; i <= steps; i++) {
    const th = (i / steps) * 2 * Math.PI;
    const a = p.semiMajorKm * Math.cos(th);   // along the Sun's azimuth
    const b = p.semiMinorKm * Math.sin(th);   // across it
    ring.push(destination(p.lat, p.lon, Math.hypot(a, b),
                          p.sunAz + Math.atan2(b, a) * R2D));
  }
  return ring;
}

/**
 * Precompute the per-instant terms the pixel shader needs, so the raster
 * loop does no polynomial evaluation.
 */
export function fieldContext(utcMs, E = ELEMENTS) {
  const e = elementsAt(utcMs, E);
  return {
    x: e.x, y: e.y, l1: e.l1, l2: e.l2, tanf1: e.tanf1, tanf2: e.tanf2,
    sd: Math.sin(e.d), cd: Math.cos(e.d),
    muCorr: (e.mu - 1.00273791 * (E.dT * 15 / 3600)) * D2R
  };
}

/**
 * Fast obscuration + Sun altitude for one point. `c` comes from fieldContext.
 * Returns sinAlt (negative below the horizon) and area obscuration 0..1.
 */
export function fieldAt(c, latRad, lonRad, out) {
  const sp = Math.sin(latRad), cp = Math.cos(latRad);
  const s = Math.sqrt(1 - E2 * sp * sp);
  const rhoSin = 0.99665 * sp / s, rhoCos = cp / s;
  const H = c.muCorr + lonRad;
  const cH = Math.cos(H);

  const zeta = rhoSin * c.sd + rhoCos * cH * c.cd;
  out.sinAlt = zeta;
  if (zeta <= 0) { out.obsc = 0; out.total = false; return out; }

  const xi = rhoCos * Math.sin(H);
  const eta = rhoSin * c.cd - rhoCos * cH * c.sd;
  const dx = c.x - xi, dy = c.y - eta;
  const m = Math.sqrt(dx * dx + dy * dy);
  const L1 = c.l1 - zeta * c.tanf1;
  const L2 = c.l2 - zeta * c.tanf2;

  const rM = (L1 - L2) / 2, rS = (L1 + L2) / 2;
  out.total = m < Math.abs(L2) && L2 < 0;
  if (m >= rM + rS) { out.obsc = 0; return out; }
  if (m <= Math.abs(rM - rS)) { out.obsc = rM >= rS ? 1 : (rM * rM) / (rS * rS); return out; }
  const c1 = (m * m + rS * rS - rM * rM) / (2 * m * rS);
  const c2 = (m * m + rM * rM - rS * rS) / (2 * m * rM);
  const A1 = rS * rS * Math.acos(c1 < -1 ? -1 : c1 > 1 ? 1 : c1);
  const A2 = rM * rM * Math.acos(c2 < -1 ? -1 : c2 > 1 ? 1 : c2);
  const A3 = 0.5 * Math.sqrt(Math.max(0,
    (-m + rM + rS) * (m + rM - rS) * (m - rM + rS) * (m + rM + rS)));
  out.obsc = (A1 + A2 - A3) / (Math.PI * rS * rS);
  return out;
}

/**
 * Local circumstances for an observer at geodetic (lat, lon) at a UTC instant.
 * magnitude = fraction of the Sun's DIAMETER covered.
 * obscuration = fraction of the Sun's AREA covered.
 */
export function localCircumstances(lat, lon, utcMs, E = ELEMENTS) {
  const e = elementsAt(utcMs, E);
  const phi = lat * D2R;

  const s = Math.sqrt(1 - E2 * Math.sin(phi) ** 2);
  const rhoSin = Math.sqrt(1 - E2) * Math.sin(phi) / s;
  const rhoCos = Math.cos(phi) / s;

  // hour angle of the shadow axis for this observer
  const H = (e.mu - 1.00273791 * (E.dT * 15 / 3600) + lon) * D2R;

  const xi = rhoCos * Math.sin(H);
  const eta = rhoSin * Math.cos(e.d) - rhoCos * Math.cos(H) * Math.sin(e.d);
  const zeta = rhoSin * Math.sin(e.d) + rhoCos * Math.cos(H) * Math.cos(e.d);

  if (zeta < 0) return { magnitude: 0, obscuration: 0, sunUp: false, total: false };

  const dxi = e.x - xi, deta = e.y - eta;
  const m = Math.hypot(dxi, deta);
  const L1 = e.l1 - zeta * e.tanf1;
  const L2 = e.l2 - zeta * e.tanf2;

  let mag = (L1 - m) / (L1 + L2);
  if (!isFinite(mag) || mag < 0) mag = 0;
  const total = m < Math.abs(L2) && L2 < 0;

  return {
    magnitude: mag,
    obscuration: obscurationFrom(m, L1, L2),
    sunUp: true,
    total,
    sunAlt: Math.asin(Math.max(-1, Math.min(1, zeta))) * R2D
  };
}

/**
 * Area obscuration from the two-circle overlap.
 * L1 = rSun + rMoon and L2 = rSun - rMoon on the fundamental plane,
 * so rMoon = (L1 - L2)/2 and rSun = (L1 + L2)/2.
 */
function obscurationFrom(m, L1, L2) {
  const rM = (L1 - L2) / 2;            // Moon radius on the fundamental plane
  const rS = (L1 + L2) / 2;            // Sun radius
  const a = Math.abs(rM), b = Math.abs(rS);
  if (m >= a + b) return 0;
  if (m <= Math.abs(a - b)) return a >= b ? 1 : (a * a) / (b * b);
  const c1 = (m * m + b * b - a * a) / (2 * m * b);
  const c2 = (m * m + a * a - b * b) / (2 * m * a);
  const A1 = b * b * Math.acos(Math.max(-1, Math.min(1, c1)));
  const A2 = a * a * Math.acos(Math.max(-1, Math.min(1, c2)));
  const A3 = 0.5 * Math.sqrt(Math.max(0,
    (-m + a + b) * (m + a - b) * (m - a + b) * (m + a + b)));
  return (A1 + A2 - A3) / (Math.PI * b * b);
}

/** Sample the central line over the whole central phase. */
export function centralLine(E = ELEMENTS, stepSec = 60) {
  const pts = [];
  const start = E.greatest.utc - 3 * 3600 * 1000;
  const end = E.greatest.utc + 3 * 3600 * 1000;
  for (let t = start; t <= end; t += stepSec * 1000) {
    const p = shadowAxisPoint(t, E);
    if (p) pts.push({ ...p, utc: t });
  }
  return pts;
}

/** First and last instant of the central (umbral) phase, to the second. */
export function centralPhaseBounds(E = ELEMENTS) {
  const g = E.greatest.utc, span = 3 * 3600 * 1000;
  const edge = (dir) => {
    let lo = g, hi = g + dir * span;
    if (shadowAxisPoint(hi, E)) return hi;
    for (let i = 0; i < 60; i++) {
      const mid = (lo + hi) / 2;
      if (shadowAxisPoint(mid, E)) lo = mid; else hi = mid;
    }
    return lo;
  };
  return { start: edge(-1), end: edge(1) };
}

/**
 * Local contact times, found by scanning then bisecting.
 * Returns null when the location sees no eclipse at all.
 */
export function localContacts(lat, lon, E = ELEMENTS) {
  const g = E.greatest.utc;
  const span = 3.5 * 3600 * 1000, step = 30 * 1000;
  const mag = (t) => localCircumstances(lat, lon, t, E).magnitude;
  const isTotal = (t) => localCircumstances(lat, lon, t, E).total;

  let best = null;
  for (let t = g - span; t <= g + span; t += step) {
    const m = mag(t);
    if (!best || m > best.m) best = { t, m };
  }
  if (!best || best.m <= 0) return null;

  // refine maximum
  let lo = best.t - step, hi = best.t + step;
  for (let i = 0; i < 40; i++) {
    const a = lo + (hi - lo) / 3, b = hi - (hi - lo) / 3;
    if (mag(a) < mag(b)) lo = a; else hi = b;
  }
  const peak = (lo + hi) / 2;
  const cross = (from, to, pred) => {
    let a = from, b = to;
    for (let i = 0; i < 50; i++) {
      const mid = (a + b) / 2;
      if (pred(mid)) b = mid; else a = mid;
    }
    return (a + b) / 2;
  };

  const c = { max: peak, maxCirc: localCircumstances(lat, lon, peak, E) };
  c.start = cross(g - span, peak, (t) => mag(t) > 0);
  c.end = cross(g + span, peak, (t) => mag(t) > 0);
  if (isTotal(peak)) {
    c.totalStart = cross(c.start, peak, (t) => isTotal(t));
    c.totalEnd = cross(c.end, peak, (t) => isTotal(t));
  }
  return c;
}

export const R_EARTH_KM = R_EARTH;
