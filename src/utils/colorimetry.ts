import { ReagentKit } from '../types';

export interface RgbColor {
  r: number;
  g: number;
  b: number;
}

export interface LabColor {
  l: number;
  a: number;
  b: number;
}

// Standard Law Enforcement Reagent Catalog
export const REAGENT_CATALOG: ReagentKit[] = [
  {
    id: 'marquis_heroin',
    name: 'Marquis Reagent (Heroin / Opium / Morphine)',
    hindiName: 'मार्क्विस अभिकर्मक (हेरोइन / अफीम / मॉर्फिन)',
    targetSubstances: 'Diacetylmorphine (Heroin/Smack), Morphine, Codeine, Opium Alkaloids',
    category: 'colorimetric',
    primaryTarget: 'Opium Derivatives (NDPS Sec 21)',
    standardReactionHex: '#4C1D95', // Deep purple / violet
    standardReactionName: 'Deep Purple / Violet (गाढ़ा बैंगनी)',
    negativeHex: '#FDE047', // Pale yellow / colorless
    negativeName: 'Colorless to Pale Yellow (कोई बदलाव नहीं)',
    ndpsSection: 'Section 21, NDPS Act 1985 (Manufactured Drugs & Opium Derivatives)',
    reactionTimeSeconds: 5,
    steps: [
      'Step 1: Place 1-2 mg of suspect powder or scrape into spot plate well.',
      'Step 2: Add 1-2 drops of Marquis Reagent (Formaldehyde + Concentrated H₂SO₄).',
      'Step 3: Observe chromogenic shift immediately (0-10 seconds). Rapid purple/violet confirms positive.',
    ],
    description: 'Gold-standard presumptive field test for detecting morphine alkaloids and illicit heroin/smack.',
    precautions: 'Corrosive acid mixture. Do not ingest, avoid skin contact. Use within well-ventilated enclosure.',
  },
  {
    id: 'scott_cocaine',
    name: 'Scott Reagent / Cobalt Thiocyanate (Cocaine HCl / Crack)',
    hindiName: 'स्कॉट अभिकर्मक (कोकीन हाइड्रोक्लोराइड / क्रैक)',
    targetSubstances: 'Cocaine Hydrochloride, Freebase Cocaine (Crack)',
    category: 'colorimetric',
    primaryTarget: 'Coca Alkaloids (NDPS Sec 21)',
    standardReactionHex: '#1D4ED8', // Cobalt blue
    standardReactionName: 'Cobalt Brilliant Blue (चमकदार कोबाल्ट नीला)',
    negativeHex: '#EC4899', // Pink / no organic blue layer
    negativeName: 'Pink / No Blue in Chloroform layer',
    ndpsSection: 'Section 21, NDPS Act 1985 (Coca Leaf and Cocaine Derivatives)',
    reactionTimeSeconds: 15,
    steps: [
      'Step 1: Add 2-3 drops 2% Cobalt Thiocyanate in 50% Glycerin. Blue precipitate forms.',
      'Step 2: Add 1 drop concentrated HCl. Blue precipitate dissolves into clear pink.',
      'Step 3: Add 3-5 drops Chloroform and shake. Intense blue color migrates to the bottom chloroform layer.',
    ],
    description: '3-Step specific presumptive test to eliminate false positives from procaine, lidocaine, or sugar excipients.',
    precautions: 'Chloroform is volatile. Cap ampoule tightly during phase separation phase.',
  },
  {
    id: 'duquenois_cannabis',
    name: 'Duquenois-Levine Reagent (Cannabis / Charas / Hashish / THC)',
    hindiName: 'ड्यूकेनोइस-लेवाइन अभिकर्मक (चरस / गांजा / भांग / हैशिश ऑयल)',
    targetSubstances: 'Tetrahydrocannabinol (THC), Charas, Ganja, Hashish, Bhang extracts',
    category: 'colorimetric',
    primaryTarget: 'Cannabis Resins & Products (NDPS Sec 20)',
    standardReactionHex: '#581C87', // Dark violet / purple in chloroform
    standardReactionName: 'Violet / Purple Chloroform Extraction Layer (बैंगनी निचली परत)',
    negativeHex: '#84CC16', // Yellowish brown/green
    negativeName: 'Brown/Green without purple partition',
    ndpsSection: 'Section 20, NDPS Act 1985 (Cannabis and Resin / Charas)',
    reactionTimeSeconds: 20,
    steps: [
      'Step 1: Place small piece (1-2mg) of plant material or resin in test tube.',
      'Step 2: Add 5 drops Duquenois reagent (Acetaldehyde + Vanillin in 95% Ethanol).',
      'Step 3: Add 5 drops concentrated HCl; purple-violet color develops.',
      'Step 4: Add 5 drops Chloroform; purple color separates into the lower organic layer.',
    ],
    description: 'Specific reagent for identifying phenolic components of cannabis resin (charas, ganja, hashish oil).',
    precautions: 'Vanillin solution must be kept away from direct heat to prevent oxidation.',
  },
  {
    id: 'marquis_meth',
    name: 'Marquis Reagent (Amphetamines / Methamphetamine)',
    hindiName: 'मार्क्विस अभिकर्मक (एम्फेटामाइन / मेथमफेटामाइन)',
    targetSubstances: 'Methamphetamine (Ice/Crystal), Amphetamine sulphate',
    category: 'colorimetric',
    primaryTarget: 'Psychotropic Stimulants (NDPS Sec 22)',
    standardReactionHex: '#C2410C', // Orange-red to brown
    standardReactionName: 'Orange-Red to Reddish-Brown (नारंगी-लाल से कत्थई)',
    negativeHex: '#E2E8F0', // Colorless
    negativeName: 'Colorless / No reaction',
    ndpsSection: 'Section 22, NDPS Act 1985 (Psychotropic Substances)',
    reactionTimeSeconds: 5,
    steps: [
      'Step 1: Apply 1-2 mg sample to white porcelain test plate.',
      'Step 2: Dispense 1 drop Marquis Reagent.',
      'Step 3: Instant transition to fiery orange-red turning dark reddish-brown confirms ATS stimulant.',
    ],
    description: 'Presumptive screening reagent for synthetic phenylalkylamines.',
    precautions: 'Handle with chemical-resistant nitrile gloves.',
  },
  {
    id: 'simon_meth',
    name: "Simon's Reagent (Secondary Amines / Meth / MDMA)",
    hindiName: 'साइमन्स अभिकर्मक (मेथमफेटामाइन / एमडीएमए विशिष्टता)',
    targetSubstances: 'Methamphetamine, MDMA (Ecstasy), Mephedrone (4-MMC)',
    category: 'colorimetric',
    primaryTarget: 'Secondary Amine Synthetics (NDPS Sec 22)',
    standardReactionHex: '#2563EB', // Intense Cobalt Blue
    standardReactionName: 'Instant Cobalt Deep Blue (तीव्र कोबाल्ट नीला)',
    negativeHex: '#CBD5E1', // No color change (remains clear/pale)
    negativeName: 'No Color Change (Clear / Pale)',
    ndpsSection: 'Section 22, NDPS Act 1985 (Psychotropic Amphetamines)',
    reactionTimeSeconds: 4,
    steps: [
      'Step 1: Place small sample in spot plate.',
      'Step 2: Add 1 drop Simon Solution A (20% aq Sodium Nitroprusside + Acetaldehyde).',
      'Step 3: Add 1 drop Simon Solution B (2% Sodium Carbonate).',
      'Step 4: Immediate intense cobalt blue indicates secondary amine (Meth/MDMA).',
    ],
    description: 'Differentiates secondary amines (Methamphetamine/MDMA) from primary amines (Amphetamine).',
    precautions: 'Mix reagents sequentially in strict order A then B.',
  },
  {
    id: 'mandelin_methadone',
    name: 'Mandelin Reagent (Methadone / Synthetic Opioids / Ketamine)',
    hindiName: 'मैंडेलिन अभिकर्मक (मेथाडोन / सिंथेटिक ओपिओइड / केटामाइन)',
    targetSubstances: 'Methadone, Ketamine, Buprenorphine, Opioid analgesics',
    category: 'colorimetric',
    primaryTarget: 'Synthetic Opioids & Dissociatives (NDPS Sec 21 & 22)',
    standardReactionHex: '#166534', // Dark olive green
    standardReactionName: 'Dark Olive Green / Greenish-Blue (गहरा जैतूनी हरा)',
    negativeHex: '#F3F4F6',
    negativeName: 'No Color Change',
    ndpsSection: 'Section 21/22, NDPS Act 1985 (Narcotic & Psychotropic Schedule)',
    reactionTimeSeconds: 10,
    steps: [
      'Step 1: Place 1 mg sample on ceramic tile.',
      'Step 2: Add 1-2 drops Mandelin Reagent (Ammonium Metavanadate in H₂SO₄).',
      'Step 3: Olive green development denotes Methadone; deep orange/red indicates Ketamine.',
    ],
    description: 'Broad-spectrum reagent for synthetic analgesics and illicit veterinary tranquilizers.',
    precautions: 'Vanadate solution contains heavy metal complexes; dispose in hazardous waste.',
  },
  {
    id: 'fentanyl_strip',
    name: 'Fentanyl / Ultra-Potent Opioid Immunoassay Strip',
    hindiName: 'फेंटानिल पार्श्व प्रवाह स्ट्रिप (इम्यूनोएसे स्ट्रिप)',
    targetSubstances: 'Fentanyl, Carfentanil, Acetylfentanyl, Fentanyl-laced Heroin/Cocaine',
    category: 'immunoassay',
    primaryTarget: 'Ultra-High Potency Opioids (NDPS Sec 21)',
    standardReactionHex: '#DC2626', // Red band
    standardReactionName: 'Single Line (C-Line Only = POSITIVE for Fentanyl)',
    negativeHex: '#10B981', // 2 lines
    negativeName: 'Double Line (C & T Lines = NEGATIVE)',
    ndpsSection: 'Section 21 / 22, NDPS Act 1985 (Class A Prohibited Synthetic Narcotic)',
    reactionTimeSeconds: 180,
    steps: [
      'Step 1: Dissolve 10-20 mg suspect residue in 5 mL clean water (buffer vial).',
      'Step 2: Immerse strip test pad into solution for 15 seconds (do not exceed max fill line).',
      'Step 3: Lay flat on clean non-absorbent surface and read results at 3-5 minutes.',
      'Step 4: 1 Red Line at C = POSITIVE. 2 Red Lines at C and T = NEGATIVE.',
    ],
    description: 'Nanogram-level sensitive rapid lateral flow immunoassay for detecting lethal fentanyl adulteration.',
    precautions: 'Handle pure suspected fentanyl with N95 mask and eye protection due to transdermal/aerosol toxicity.',
  },
];

// Hex to RGB
export function hexToRgb(hex: string): RgbColor {
  let c = hex.replace('#', '');
  if (c.length === 3) {
    c = c.split('').map((char) => char + char).join('');
  }
  const num = parseInt(c, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}

// RGB to Hex
export function rgbToHex(r: number, g: number, b: number): string {
  const clamp = (val: number) => Math.max(0, Math.min(255, Math.round(val)));
  return (
    '#' +
    [clamp(r), clamp(g), clamp(b)]
      .map((x) => x.toString(16).padStart(2, '0'))
      .join('')
      .toUpperCase()
  );
}

// RGB to CIE L*a*b* conversion (D65 Standard Illuminant)
export function rgbToLab(rgb: RgbColor): LabColor {
  // Normalize sRGB to Linear RGB
  let r = rgb.r / 255;
  let g = rgb.g / 255;
  let b = rgb.b / 255;

  r = r > 0.04045 ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
  g = g > 0.04045 ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
  b = b > 0.04045 ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;

  // Convert to XYZ
  let x = (r * 0.4124 + g * 0.3576 + b * 0.1805) * 100;
  let y = (r * 0.2126 + g * 0.7152 + b * 0.0722) * 100;
  let z = (r * 0.0193 + g * 0.1192 + b * 0.9505) * 100;

  // D65 Reference White
  const refX = 95.047;
  const refY = 100.0;
  const refZ = 108.883;

  x /= refX;
  y /= refY;
  z /= refZ;

  const f = (t: number) => (t > 0.008856 ? Math.cbrt(t) : 7.787 * t + 16 / 116);

  const fx = f(x);
  const fy = f(y);
  const fz = f(z);

  return {
    l: Math.max(0, 116 * fy - 16),
    a: 500 * (fx - fy),
    b: 200 * (fy - fz),
  };
}

// CIE76 & CIE94 Delta-E Color Distance (Lower = Closer Match)
export function calculateDeltaE(rgb1: RgbColor, rgb2: RgbColor): number {
  const lab1 = rgbToLab(rgb1);
  const lab2 = rgbToLab(rgb2);

  const dL = lab1.l - lab2.l;
  const da = lab1.a - lab2.a;
  const db = lab1.b - lab2.b;

  // CIE76 formula
  const deltaE = Math.sqrt(dL * dL + da * da + db * db);
  return Number(deltaE.toFixed(2));
}

// Compute white balance adjustment from standard 4-point reference card
export function calibrateColorWithReference(
  rawRgb: RgbColor,
  whitePatch: RgbColor,
  grayPatch: RgbColor,
  blackPatch: RgbColor
): { calibratedRgb: RgbColor; correctionGain: { r: number; g: number; b: number } } {
  // Target D65 white = 255, gray = 128, black = 0
  const rGain = 255 / Math.max(whitePatch.r - blackPatch.r, 1);
  const gGain = 255 / Math.max(whitePatch.g - blackPatch.g, 1);
  const bGain = 255 / Math.max(whitePatch.b - blackPatch.b, 1);

  const correctedR = Math.min(255, Math.max(0, (rawRgb.r - blackPatch.r) * (rGain * 0.95)));
  const correctedG = Math.min(255, Math.max(0, (rawRgb.g - blackPatch.g) * (gGain * 0.95)));
  const correctedB = Math.min(255, Math.max(0, (rawRgb.b - blackPatch.b) * (bGain * 0.95)));

  return {
    calibratedRgb: {
      r: Math.round(correctedR),
      g: Math.round(correctedG),
      b: Math.round(correctedB),
    },
    correctionGain: {
      r: Number(rGain.toFixed(2)),
      g: Number(gGain.toFixed(2)),
      b: Number(bGain.toFixed(2)),
    },
  };
}

// Convert RGB to approximate Hue, Saturation, Value
export function rgbToHsv(rgb: RgbColor): { h: number; s: number; v: number } {
  const r = rgb.r / 255;
  const g = rgb.g / 255;
  const b = rgb.b / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const d = max - min;
  let h = 0;
  const s = max === 0 ? 0 : d / max;
  const v = max;

  if (max !== min) {
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    v: Math.round(v * 100),
  };
}
