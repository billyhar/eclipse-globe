/*
 * Solar eclipse catalog, 2026–2030.
 *
 * Besselian elements from the NASA/GSFC Five Millennium Catalog of Solar
 * Eclipses (Espenak). t0 is the reference hour in TDT; dT is TDT − UT.
 * Coefficients are polynomial in t = hours from t0.
 *
 * `duration` and `pathWidth` are at greatest eclipse. Partial eclipses have
 * neither — their shadow axis misses the Earth entirely.
 */

const D = (y, m, d, h, mi, s = 0, ms = 0) => Date.UTC(y, m - 1, d, h, mi, s, ms);

export const ECLIPSES = [
  {
    id: '2026-08-12', type: 'total',
    name: 'Total Solar Eclipse of 12 August 2026',
    short: '12 Aug 2026', regions: 'Greenland · Iceland · Spain',
    blurb: 'The first total solar eclipse visible from mainland Europe since 1999, crossing the Arctic, Greenland, western Iceland and northern Spain at sunset.',
    t0: D(2026, 8, 12, 18, 0), dT: 71.4,
    x: [0.475593, 0.5189288, -0.0000773, -0.0000088],
    y: [0.771161, -0.2301664, -0.0001245, 0.0000037],
    d: [14.79667, -0.012065, -0.000003],
    l1: [0.537954, 0.0000940, -0.0000121],
    l2: [-0.008142, 0.0000935, -0.0000121],
    mu: [88.74776, 15.003093],
    tanf1: 0.0046141, tanf2: 0.0045911,
    greatest: { utc: D(2026, 8, 12, 17, 45, 53, 800) },
    gamma: 0.8978, magnitude: 1.0386, duration: 138.2, pathWidth: 294.0
  },
  {
    id: '2027-02-06', type: 'annular',
    name: 'Annular Solar Eclipse of 6 February 2027',
    short: '6 Feb 2027', regions: 'Chile · Argentina · South Atlantic',
    blurb: 'A long "ring of fire" annular eclipse crossing southern Chile and Argentina, with up to 7 minutes 51 seconds of annularity.',
    t0: D(2027, 2, 6, 16, 0), dT: 71.6,
    x: [0.111743, 0.4664823, -0.0000325, -0.0000032],
    y: [-0.273277, 0.2031840, 0.0001025, -0.0000025],
    d: [-15.54794, 0.012383, 0.000004],
    l1: [0.571927, -0.0000653, -0.0000101],
    l2: [0.025661, -0.0000650, -0.0000100],
    mu: [56.49306, 15.000512],
    tanf1: 0.0047426, tanf2: 0.0047190,
    greatest: { utc: D(2027, 2, 6, 15, 59, 35, 700) },
    gamma: -0.2952, magnitude: 0.9281, duration: 470.9, pathWidth: 281.5
  },
  {
    id: '2027-08-02', type: 'total',
    name: 'Total Solar Eclipse of 2 August 2027',
    short: '2 Aug 2027', regions: 'Spain · North Africa · Egypt · Saudi Arabia',
    blurb: 'The longest totality on land this century so far — 6 minutes 23 seconds near Luxor. The path crosses southern Spain, Gibraltar, Morocco, Algeria, Tunisia, Libya, Egypt, Sudan, Saudi Arabia, Yemen and Somalia.',
    t0: D(2027, 8, 2, 10, 0), dT: 71.7,
    x: [-0.019645, 0.5447105, -0.0000444, -0.0000091],
    y: [0.160063, -0.2111569, -0.0001217, 0.0000037],
    d: [17.76247, -0.010181, -0.000004],
    l1: [0.530596, 0.0000138, -0.0000128],
    l2: [-0.015464, 0.0000137, -0.0000128],
    mu: [328.42249, 15.002093],
    tanf1: 0.0046064, tanf2: 0.0045834,
    greatest: { utc: D(2027, 8, 2, 10, 6, 37, 700) },
    gamma: 0.1421, magnitude: 1.0790, duration: 382.6, pathWidth: 257.7
  },
  {
    id: '2028-01-26', type: 'annular',
    name: 'Annular Solar Eclipse of 26 January 2028',
    short: '26 Jan 2028', regions: 'Ecuador · Peru · Brazil · Iberia at sunset',
    blurb: 'A 10 minute 27 second annular eclipse crossing the Galápagos, Ecuador, Peru, Brazil and Suriname, ending over Portugal and Spain at sunset.',
    t0: D(2028, 1, 26, 15, 0), dT: 71.9,
    x: [-0.205226, 0.4742711, -0.0000377, -0.0000070],
    y: [0.340278, 0.1738579, 0.0000968, -0.0000020],
    d: [-18.72825, 0.010073, 0.000005],
    l1: [0.574116, 0.0000420, -0.0000099],
    l2: [0.027839, 0.0000418, -0.0000099],
    mu: [41.89120, 14.998972],
    tanf1: 0.0047501, tanf2: 0.0047264,
    greatest: { utc: D(2028, 1, 26, 15, 7, 46, 500) },
    gamma: 0.3901, magnitude: 0.9208, duration: 627.1, pathWidth: 323.0
  },
  {
    id: '2028-07-22', type: 'total',
    name: 'Total Solar Eclipse of 22 July 2028',
    short: '22 Jul 2028', regions: 'Australia · New Zealand',
    blurb: 'Totality crosses the Kimberley, the Northern Territory, Queensland and New South Wales — passing directly over Sydney — before clipping New Zealand.',
    t0: D(2028, 7, 22, 3, 0), dT: 72.1,
    x: [-0.154300, 0.5449941, -0.0000226, -0.0000095],
    y: [-0.586380, -0.1746077, -0.0001022, 0.0000029],
    d: [20.18231, -0.007974, -0.000005],
    l1: [0.535236, -0.0000859, -0.0000123],
    l2: [-0.010847, -0.0000854, -0.0000122],
    mu: [223.37866, 15.001018],
    tanf1: 0.0046016, tanf2: 0.0045786,
    greatest: { utc: D(2028, 7, 22, 2, 55, 26, 900) },
    gamma: -0.6055, magnitude: 1.0560, duration: 309.7, pathWidth: 230.2
  },
  {
    id: '2029-01-14', type: 'partial',
    name: 'Partial Solar Eclipse of 14 January 2029',
    short: '14 Jan 2029', regions: 'North America',
    blurb: 'A deep partial eclipse for much of North America — the Moon\'s shadow cone passes north of the Earth, so no totality occurs anywhere.',
    t0: D(2029, 1, 14, 17, 0), dT: 72.2,
    x: [-0.407345, 0.5081627, -0.0000396, -0.0000077],
    y: [0.981051, 0.1455276, 0.0000923, -0.0000020],
    d: [-21.16301, 0.007240, 0.000006],
    l1: [0.562665, 0.0001189, -0.0000108],
    l2: [0.016445, 0.0001183, -0.0000108],
    mu: [72.69289, 14.997629],
    tanf1: 0.0047541, tanf2: 0.0047304,
    greatest: { utc: D(2029, 1, 14, 17, 12, 34, 700) },
    gamma: 1.0553, magnitude: 0.8714
  },
  {
    id: '2029-06-12', type: 'partial',
    name: 'Partial Solar Eclipse of 12 June 2029',
    short: '12 Jun 2029', regions: 'Arctic · Scandinavia · Alaska',
    blurb: 'A shallow partial eclipse over the high Arctic, Greenland, Iceland, Scandinavia and Alaska.',
    t0: D(2029, 6, 12, 4, 0), dT: 72.3,
    x: [-0.010734, 0.5247594, 0.0000101, -0.0000067],
    y: [1.295406, -0.0176371, -0.0002058, 0.0000004],
    d: [23.15931, 0.002590, -0.000005],
    l1: [0.556661, -0.0001027, -0.0000104],
    l2: [0.010471, -0.0001022, -0.0000103],
    mu: [240.03554, 14.999201],
    tanf1: 0.0046048, tanf2: 0.0045819,
    greatest: { utc: D(2029, 6, 12, 4, 5, 0, 300) },
    gamma: 1.2943, magnitude: 0.4576
  },
  {
    id: '2029-07-11', type: 'partial',
    name: 'Partial Solar Eclipse of 11 July 2029',
    short: '11 Jul 2029', regions: 'Southern South America',
    blurb: 'A slight partial eclipse low over southern Chile and Argentina.',
    t0: D(2029, 7, 11, 16, 0), dT: 72.4,
    x: [-0.137212, 0.5252570, -0.0000092, -0.0000066],
    y: [-1.427119, -0.1280404, -0.0000767, 0.0000019],
    d: [22.00245, -0.005424, -0.000006],
    l1: [0.548755, -0.0001269, -0.0000110],
    l2: [0.002604, -0.0001263, -0.0000109],
    mu: [58.60257, 15.000009],
    tanf1: 0.0045994, tanf2: 0.0045765,
    greatest: { utc: D(2029, 7, 11, 15, 36, 5, 700) },
    gamma: -1.4190, magnitude: 0.2304
  },
  {
    id: '2029-12-05', type: 'partial',
    name: 'Partial Solar Eclipse of 5 December 2029',
    short: '5 Dec 2029', regions: 'Southern South America · Antarctica',
    blurb: 'A deep partial eclipse over southern Argentina, Chile and the Antarctic Peninsula.',
    t0: D(2029, 12, 5, 15, 0), dT: 72.5,
    x: [-0.063748, 0.5766308, -0.0000036, -0.0000092],
    y: [-1.059709, -0.0140158, 0.0002296, 0.0000000],
    d: [-22.44545, -0.005054, 0.000006],
    l1: [0.540641, 0.0000699, -0.0000129],
    l2: [-0.005469, 0.0000695, -0.0000128],
    mu: [47.30986, 14.997174],
    tanf1: 0.0047446, tanf2: 0.0047209,
    greatest: { utc: D(2029, 12, 5, 15, 2, 44, 900) },
    gamma: -1.0609, magnitude: 0.8910
  },
  {
    id: '2030-06-01', type: 'annular',
    name: 'Annular Solar Eclipse of 1 June 2030',
    short: '1 Jun 2030', regions: 'Algeria · Greece · Turkey · Russia · Japan',
    blurb: 'A ring of fire crossing North Africa, Greece, Turkey, Ukraine, Russia and northern Japan, with 5 minutes 21 seconds of annularity.',
    t0: D(2030, 6, 1, 6, 0), dT: 76.9,
    x: [-0.269346, 0.5056356, 0.0000191, -0.0000058],
    y: [0.551976, 0.0210146, -0.0001586, -0.0000001],
    d: [22.06130, 0.005582, -0.000006],
    l1: [0.566149, -0.0000130, -0.0000097],
    l2: [0.019911, -0.0000129, -0.0000097],
    mu: [270.53992, 14.999707],
    tanf1: 0.0046120, tanf2: 0.0045890,
    greatest: { utc: D(2030, 6, 1, 6, 27, 55, 600) },
    gamma: 0.5626, magnitude: 0.9443, duration: 320.8, pathWidth: 249.6
  },
  {
    id: '2030-11-25', type: 'total',
    name: 'Total Solar Eclipse of 25 November 2030',
    short: '25 Nov 2030', regions: 'Botswana · South Africa · Australia',
    blurb: 'Totality crosses Botswana, South Africa and Lesotho at sunrise, then the southern Indian Ocean, ending over southern Australia at sunset.',
    t0: D(2030, 11, 25, 7, 0), dT: 77.3,
    x: [0.044200, 0.5787731, 0.0000157, -0.0000099],
    y: [-0.392726, -0.0551896, 0.0001744, 0.0000008],
    d: [-20.76100, -0.007989, 0.000005],
    l1: [0.538213, -0.0000379, -0.0000130],
    l2: [-0.007886, -0.0000377, -0.0000130],
    mu: [288.27457, 14.998360],
    tanf1: 0.0047361, tanf2: 0.0047125,
    greatest: { utc: D(2030, 11, 25, 6, 50, 19, 200) },
    gamma: -0.3868, magnitude: 1.0468, duration: 223.5, pathWidth: 169.3
  }
];

export const byId = id => ECLIPSES.find(e => e.id === id);

/** Word used for the central path — annular eclipses have no umbra on the ground. */
export const pathWord = e =>
  e.type === 'annular' ? 'annularity' : e.type === 'total' ? 'totality' : null;

/**
 * The eclipse to show by default: the first one that hasn't finished yet,
 * falling back to the last in the catalog. `endOf` is injected so this
 * module stays free of the Besselian math.
 */
export function currentEclipse(now, endOf) {
  return ECLIPSES.find(e => endOf(e) > now) || ECLIPSES[ECLIPSES.length - 1];
}
