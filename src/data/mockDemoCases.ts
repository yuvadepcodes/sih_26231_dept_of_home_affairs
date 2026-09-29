import { CaseRecord } from '../types';

// Helper to create an SVG data URL representing a field test kit swatch with calibration card
function createTestSwatchSvg(bgColor: string, reactionColor: string, title: string, hasCalibCard = true): string {
  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400">
    <rect width="600" height="400" fill="#1E293B"/>
    <!-- Stainless Steel / Porcelain Spot Plate Grid -->
    <rect x="20" y="20" width="560" height="360" rx="12" fill="#0F172A" stroke="#334155" stroke-width="2"/>
    
    <!-- Test Well with Reagent reaction -->
    <circle cx="200" cy="180" r="110" fill="#334155" stroke="#475569" stroke-width="4"/>
    <circle cx="200" cy="180" r="95" fill="${bgColor}"/>
    <circle cx="200" cy="180" r="75" fill="${reactionColor}" opacity="0.95"/>
    <circle cx="220" cy="160" r="45" fill="${reactionColor}" opacity="0.9"/>
    
    <!-- Reticle Crosshairs -->
    <line x1="160" y1="180" x2="240" y2="180" stroke="#F8FAFC" stroke-width="2" stroke-dasharray="4,4"/>
    <line x1="200" y1="140" x2="200" y2="220" stroke="#F8FAFC" stroke-width="2" stroke-dasharray="4,4"/>
    <circle cx="200" cy="180" r="15" fill="none" stroke="#F59E0B" stroke-width="2"/>

    <!-- Reference Calibration Card in frame -->
    ${
      hasCalibCard
        ? `
      <g transform="translate(370, 70)">
        <rect width="180" height="230" rx="6" fill="#FFFFFF" stroke="#0F172A" stroke-width="3"/>
        <text x="90" y="24" font-family="Arial" font-size="10" font-weight="bold" fill="#0F172A" text-anchor="middle">NCB CALIBRATION TARGET</text>
        <text x="90" y="38" font-family="Arial" font-size="8" fill="#64748B" text-anchor="middle">ISO 17025 D65 18% GREY</text>
        
        <!-- White Patch (100%) -->
        <rect x="15" y="48" width="65" height="40" fill="#FFFFFF" stroke="#CBD5E1"/>
        <text x="47" y="72" font-family="Arial" font-size="8" fill="#475569" text-anchor="middle">WHITE 100%</text>
        
        <!-- 18% Neutral Grey -->
        <rect x="100" y="48" width="65" height="40" fill="#808080" stroke="#475569"/>
        <text x="132" y="72" font-family="Arial" font-size="8" fill="#FFFFFF" text-anchor="middle">18% GREY</text>

        <!-- True Black -->
        <rect x="15" y="100" width="65" height="40" fill="#000000"/>
        <text x="47" y="124" font-family="Arial" font-size="8" fill="#FFFFFF" text-anchor="middle">BLACK 0%</text>

        <!-- Primaries Matrix -->
        <rect x="100" y="100" width="30" height="40" fill="#EF4444"/>
        <rect x="135" y="100" width="30" height="40" fill="#3B82F6"/>
        
        <!-- Cyan & Yellow -->
        <rect x="15" y="150" width="65" height="25" fill="#06B6D4"/>
        <rect x="100" y="150" width="65" height="25" fill="#FACC15"/>

        <!-- Scale Bar -->
        <line x1="15" y1="195" x2="165" y2="195" stroke="#0F172A" stroke-width="2"/>
        <text x="90" y="212" font-family="Arial" font-size="8" fill="#0F172A" text-anchor="middle">10mm CALIBRATION SCALE</text>
      </g>
    `
        : ''
    }

    <!-- Label Banner -->
    <rect x="20" y="320" width="560" height="60" rx="4" fill="#090D16"/>
    <text x="40" y="348" font-family="Arial" font-size="14" font-weight="bold" fill="#F8FAFC">${title}</text>
    <text x="40" y="368" font-family="Arial" font-size="11" fill="#94A3B8">NCB/ANTF Optical Colorimetry Spot-Sampler Record | D65 Ambient Standard</text>
  </svg>
  `;
  return `data:image/svg+xml;base64,${btoa(svg)}`;
}

export const PRELOADED_DEMO_CASES: CaseRecord[] = [
  {
    id: 'NCB-2026-DL-0891',
    caseNumber: 'NCB/DZU/NDPS/2026/0891',
    firNumber: 'FIR No. 412/2026 (PS Special Cell, Lodhi Colony)',
    dateCreated: '2026-09-24T14:32:00Z',
    timestampUtc: '2026-09-24T14:32:00.124Z',
    timestampIst: '24 Sep 2026, 20:02:00.124 IST',
    officer: {
      name: 'Inspector Vikramaditya Rathore',
      rankBadge: 'ANTF Badge #DL-4819',
      unit: 'Anti-Narcotics Task Force (ANTF) Special Cell',
      zoneState: 'Delhi Zone / Central Division',
      firNumber: 'FIR No. 412/2026',
      caseDiaryNumber: 'GD Entry #14-B/2026',
      thanaJurisdiction: 'PS Special Cell, New Delhi',
      testKitLotNumber: 'LOT-NCB-MARQ-2026-04',
      testKitExpiry: '2028-11',
      seizureLocation: 'Near ISBT Kashmiri Gate Inter-State Bus Terminal, Delhi',
    },
    panchWitnesses: [
      {
        id: 'pw-1',
        name: 'Rameshwar Dayal Sharma',
        age: 48,
        address: 'H.No. 42, Gali No. 3, Kashmiri Gate, Delhi - 110006',
        contactNumber: '+91 98112-44910',
      },
      {
        id: 'pw-2',
        name: 'Mohammad Shahid Khan',
        age: 39,
        address: 'Shop No. 12, Main Market, Mori Gate, Delhi - 110006',
        contactNumber: '+91 98731-09823',
      },
    ],
    reagentId: 'marquis_heroin',
    reagentName: 'Marquis Reagent (Heroin / Morphine / Opium)',
    sampleDescription: 'Off-white to light brown compressed granular powder recovered from secret cavity of suspect backpack.',
    seizedQuantityEstimated: 'Approx. 450 grams (Commercial Quantity Threshold: 250g)',
    rawImage: createTestSwatchSvg('#1E1B4B', '#4C1D95', 'SAMPLE 01: HEROIN (SMACK) - MARQUIS VIOLET REACTION'),
    sampledColorHex: '#4C1D95',
    calibration: {
      white: { r: 252, g: 252, b: 252, hex: '#FCFCFC' },
      gray18: { r: 128, g: 128, b: 128, hex: '#808080' },
      black: { r: 12, g: 12, b: 14, hex: '#0C0C0E' },
      colorIndex: 99.4,
      quality: 'OPTIMAL',
      whiteBalanceCorrectionFactor: { r: 1.01, g: 1.0, b: 0.99 },
    },
    analysis: {
      outcome: 'POSITIVE',
      presumptiveSubstance: 'Diacetylmorphine (Heroin / Smack) / Morphine Alkaloids',
      detectedHue: 'Deep Violet / Purple Chromophore (गाढ़ा बैंगनी)',
      hexColor: '#4C1D95',
      referenceExpectedHex: '#4C1D95',
      deltaEMatch: 1.28,
      confidenceScore: 98.7,
      calibrationQuality: 'CALIBRATED_OPTIMAL',
      reactionTimelineMatch: 'Immediate chromogenic shift (< 3 seconds) through reddish-violet to stable deep violet.',
      forensicObservations: 'Marquis reagent spot reaction demonstrated classic formaldehyde-sulfuric acid condensation with morphine phenolic ring, yielding characteristic stable deep purple/violet chromophore.',
      ndpsSectionReference: 'Section 21(c) NDPS Act 1985 (Commercial Quantity of Heroin / Manufactured Drug)',
      courtReadinessSummary: 'Conclusive presumptive field identification of diacetylmorphine (heroin). Complies with Section 52A NDPS Act inventory guidelines.',
      statutoryWarning: 'PRESUMPTIVE FIELD SCREENING: Preliminary evidence for seizure and arrest under NDPS Act 1985. Subject to confirmatory GC-MS/HPLC analysis by CFSL.',
      source: 'gemini_vision_forensic_engine',
    },
    sha256Hash: 'A7F94B2C8E1D9302B6714E5D8F0123AB456789CDEF0123456789ABCDEF012345',
    status: 'SEIZED_PRESUMPTIVE',
    auditLog: [
      { timestamp: '2026-09-24 20:02:00 IST', action: 'Sample Scraped & Optical Field Test Initialized', actor: 'Insp. V. Rathore' },
      { timestamp: '2026-09-24 20:02:45 IST', action: 'In-Frame Reference Calibration White-Balance Locked', actor: 'DRUG-CHECK Engine' },
      { timestamp: '2026-09-24 20:03:10 IST', action: 'Positive Heroin Presumptive Match Certified & SHA-256 Hashed', actor: 'NCB ANTF Portal' },
    ],
  },
  {
    id: 'NCB-2026-MZ-0419',
    caseNumber: 'NCB/MZU/CR/2026/0419',
    firNumber: 'CR No. 88/2026 (NCB Mumbai Zonal Unit)',
    dateCreated: '2026-09-23T11:15:00Z',
    timestampUtc: '2026-09-23T11:15:00.890Z',
    timestampIst: '23 Sep 2026, 16:45:00.890 IST',
    officer: {
      name: 'Superintendent Rajesh K. Deshmukh',
      rankBadge: 'NCB Badge #MZ-1092',
      unit: 'Narcotics Control Bureau Mumbai Zonal Unit',
      zoneState: 'Western Zone / Maharashtra & Goa',
      firNumber: 'CR No. 88/2026',
      caseDiaryNumber: 'NCB/MZU/D-Log/41',
      thanaJurisdiction: 'NCB Zonal Office, Ballard Estate, Mumbai',
      testKitLotNumber: 'LOT-NCB-SCOTT-2026-09',
      testKitExpiry: '2028-09',
      seizureLocation: 'Air Cargo Complex, Chhatrapati Shivaji Maharaj International Airport (CSMIA), Mumbai',
    },
    panchWitnesses: [
      {
        id: 'pw-3',
        name: 'Ganesh Pandurang Patil',
        age: 44,
        address: 'B-304, Sahyadri Heights, Sahar Village, Andheri East, Mumbai - 400099',
        contactNumber: '+91 98201-77821',
      },
      {
        id: 'pw-4',
        name: 'Sunil Manohar Shinde',
        age: 38,
        address: 'Customs Cargo Clearing Agent, Terminal 2, Mumbai - 400099',
        contactNumber: '+91 98334-11928',
      },
    ],
    reagentId: 'scott_cocaine',
    reagentName: 'Scott Reagent / Cobalt Thiocyanate (Cocaine HCl / Base)',
    sampleDescription: 'Fine crystalline pure white powder concealed inside concealed wall of international transit courier package.',
    seizedQuantityEstimated: 'Approx. 1.25 Kilograms (Commercial Quantity Threshold: 100g)',
    rawImage: createTestSwatchSvg('#172554', '#1D4ED8', 'SAMPLE 02: COCAINE HYDROCHLORIDE - SCOTT 3-STEP BLUE LAYER'),
    sampledColorHex: '#1D4ED8',
    calibration: {
      white: { r: 254, g: 254, b: 255, hex: '#FEFEFF' },
      gray18: { r: 129, g: 129, b: 130, hex: '#818182' },
      black: { r: 8, g: 8, b: 10, hex: '#08080A' },
      colorIndex: 99.8,
      quality: 'OPTIMAL',
      whiteBalanceCorrectionFactor: { r: 1.0, g: 1.0, b: 0.98 },
    },
    analysis: {
      outcome: 'POSITIVE',
      presumptiveSubstance: 'Cocaine Hydrochloride / Coca Alkaloid Derivative',
      detectedHue: 'Cobalt Brilliant Blue in Chloroform Layer (चमकदार कोबाल्ट नीला)',
      hexColor: '#1D4ED8',
      referenceExpectedHex: '#1D4ED8',
      deltaEMatch: 0.94,
      confidenceScore: 99.2,
      calibrationQuality: 'CALIBRATED_OPTIMAL',
      reactionTimelineMatch: '3-Step Sequence: Step 1 Blue ppt -> Step 2 Pink solution -> Step 3 Intense blue chloroform layer partition.',
      forensicObservations: 'Scott modified cobalt thiocyanate reaction executed in tri-stage protocol. Partition coefficient confirms cocaine base/HCl with high specificity, ruling out lidocaine/procaine false positives.',
      ndpsSectionReference: 'Section 21(c) NDPS Act 1985 (Commercial Quantity of Cocaine / Coca Derivative)',
      courtReadinessSummary: 'Specific presumptive 3-stage validation for Cocaine Hydrochloride. Seizure memo docketed under NDPS Section 52A.',
      statutoryWarning: 'PRESUMPTIVE FIELD SCREENING: Preliminary evidence for seizure and arrest under NDPS Act 1985.',
      source: 'gemini_vision_forensic_engine',
    },
    sha256Hash: '9D81A2E3F4B5C60718293A4B5C6D7E8F90123456789ABCDEF0123456789A0123',
    status: 'SEIZED_PRESUMPTIVE',
    auditLog: [
      { timestamp: '2026-09-23 16:45:00 IST', action: 'Customs Interdiction & Field Sampling Conducted', actor: 'Supt. R. Deshmukh' },
      { timestamp: '2026-09-23 16:47:12 IST', action: 'Scott 3-Phase Reaction Imaged and White-Balanced', actor: 'DRUG-CHECK Engine' },
    ],
  },
  {
    id: 'NCB-2026-HP-0204',
    caseNumber: 'HP/ANTF/NDPS/2026/0204',
    firNumber: 'FIR No. 204/2026 (PS Kullu, Himachal Pradesh)',
    dateCreated: '2026-09-22T08:20:00Z',
    timestampUtc: '2026-09-22T08:20:00.410Z',
    timestampIst: '22 Sep 2026, 13:50:00.410 IST',
    officer: {
      name: 'Deputy Superintendent Amit Thakur',
      rankBadge: 'HP Police ANTF Badge #HP-308',
      unit: 'Anti-Narcotics Task Force Himachal Pradesh',
      zoneState: 'Northern Mountain Range / Himachal Pradesh',
      firNumber: 'FIR No. 204/2026',
      caseDiaryNumber: 'KLU-GD-228',
      thanaJurisdiction: 'PS Sadar Kullu, HP Police',
      testKitLotNumber: 'LOT-HP-DL-2026-11',
      testKitExpiry: '2028-12',
      seizureLocation: 'Bhuntar-Manali Highway Nakabandi Point, Kullu Valley, HP',
    },
    panchWitnesses: [
      {
        id: 'pw-5',
        name: 'Tek Chand Negi',
        age: 51,
        address: 'Village Kasol, Tehsil Bhuntar, Distt. Kullu, HP - 175105',
        contactNumber: '+91 94180-33290',
      },
      {
        id: 'pw-6',
        name: 'Dharam Pal Verma',
        age: 46,
        address: 'Near Govt Senior Secondary School, Bhuntar, Kullu, HP - 175125',
        contactNumber: '+91 94182-99014',
      },
    ],
    reagentId: 'duquenois_cannabis',
    reagentName: 'Duquenois-Levine Reagent (Cannabis / Charas / Hashish / THC)',
    sampleDescription: 'Dark greenish-black sticky resinous slab emitting characteristic pungent aromatic cannabinoid odor (Malana Cream charas).',
    seizedQuantityEstimated: 'Approx. 2.4 Kilograms (Commercial Quantity Threshold: 1.0 kg)',
    rawImage: createTestSwatchSvg('#3B0764', '#581C87', 'SAMPLE 03: CANNABIS RESIN (CHARAS) - DUQUENOIS-LEVINE PURPLE EXTRACTION'),
    sampledColorHex: '#581C87',
    calibration: {
      white: { r: 250, g: 250, b: 252, hex: '#FAFDFC' },
      gray18: { r: 127, g: 128, b: 129, hex: '#7F8081' },
      black: { r: 15, g: 14, b: 16, hex: '#0F0E10' },
      colorIndex: 98.9,
      quality: 'OPTIMAL',
      whiteBalanceCorrectionFactor: { r: 1.02, g: 1.0, b: 0.99 },
    },
    analysis: {
      outcome: 'POSITIVE',
      presumptiveSubstance: 'Cannabis Resin / Charas / Tetrahydrocannabinol (THC)',
      detectedHue: 'Dark Violet / Purple Chloroform Extraction Phase (बैंगनी निचली परत)',
      hexColor: '#581C87',
      referenceExpectedHex: '#581C87',
      deltaEMatch: 1.62,
      confidenceScore: 97.9,
      calibrationQuality: 'CALIBRATED_OPTIMAL',
      reactionTimelineMatch: 'Acetaldehyde-vanillin reaction partitioned with HCl into lower chloroform phase within 18 seconds.',
      forensicObservations: 'Duquenois-Levine test with chloroform phase separation yielded dark violet coloration partitioned completely into the lower organic layer, confirming presence of cannabinoids / THC.',
      ndpsSectionReference: 'Section 20(b)(ii)(C) NDPS Act 1985 (Commercial Quantity of Cannabis Resin / Charas)',
      courtReadinessSummary: 'Definitive presumptive identification of cannabis resin. Seizure memo prepared under NDPS Section 52A.',
      statutoryWarning: 'PRESUMPTIVE FIELD SCREENING: Preliminary evidentiary proof under Section 52A NDPS Act 1985.',
      source: 'gemini_vision_forensic_engine',
    },
    sha256Hash: '4C5E6F7A8B9C0D1E2F3A4B5C6D7E8F90123456789ABCDEF0123456789ABCDEF0',
    status: 'SEIZED_PRESUMPTIVE',
    auditLog: [
      { timestamp: '2026-09-22 13:50:00 IST', action: 'Vehicular Nakabandi Interdiction & Charas Extraction', actor: 'DSP Amit Thakur' },
      { timestamp: '2026-09-22 13:52:15 IST', action: 'Duquenois-Levine Test Captured & Spectral Analyzed', actor: 'DRUG-CHECK Engine' },
    ],
  },
  {
    id: 'NCB-2026-BL-0055',
    caseNumber: 'NCB/SZU/GEN/2026/0055',
    firNumber: 'GD Entry No. 55/2026 (NCB Bengaluru Zonal Unit)',
    dateCreated: '2026-09-21T06:40:00Z',
    timestampUtc: '2026-09-21T06:40:00.110Z',
    timestampIst: '21 Sep 2026, 12:10:00.110 IST',
    officer: {
      name: 'Inspector Meenakshi Sundaram',
      rankBadge: 'NCB Badge #SZ-2041',
      unit: 'Narcotics Control Bureau Bengaluru Zonal Unit',
      zoneState: 'Southern Zone / Karnataka',
      firNumber: 'GD No. 55/2026',
      caseDiaryNumber: 'SZU-INSP-99',
      thanaJurisdiction: 'NCB Bengaluru Zonal Headquarters',
      testKitLotNumber: 'LOT-NCB-MARQ-2026-05',
      testKitExpiry: '2028-10',
      seizureLocation: 'Kempegowda International Airport Domestic Courier Screening, Bengaluru',
    },
    panchWitnesses: [
      {
        id: 'pw-7',
        name: 'K. Venkatesh Murthy',
        age: 42,
        address: 'No. 88, 5th Cross, Malleshwaram, Bengaluru - 560003',
        contactNumber: '+91 98450-77123',
      },
      {
        id: 'pw-8',
        name: 'Suresh B. Poojary',
        age: 35,
        address: 'No. 14, 2nd Main, Devanahalli, Bengaluru - 562110',
        contactNumber: '+91 98455-88341',
      },
    ],
    reagentId: 'marquis_heroin',
    reagentName: 'Marquis Reagent (Negative Blank / Non-Contraband Test)',
    sampleDescription: 'White powdered substance suspected to be illicit opioid during preliminary X-ray suspicious parcel scan.',
    seizedQuantityEstimated: 'Approx. 50 grams (Found to be innocent Paracetamol/Excipient)',
    rawImage: createTestSwatchSvg('#334155', '#FDE047', 'SAMPLE 04: NON-CONTRABAND BLANK - MARQUIS NO COLOR REACTION'),
    sampledColorHex: '#FDE047',
    calibration: {
      white: { r: 255, g: 255, b: 255, hex: '#FFFFFF' },
      gray18: { r: 128, g: 128, b: 128, hex: '#808080' },
      black: { r: 5, g: 5, b: 5, hex: '#050505' },
      colorIndex: 99.9,
      quality: 'OPTIMAL',
      whiteBalanceCorrectionFactor: { r: 1.0, g: 1.0, b: 1.0 },
    },
    analysis: {
      outcome: 'NEGATIVE',
      presumptiveSubstance: 'Non-Narcotic Excipient / Paracetamol (No Opiates Detected)',
      detectedHue: 'Pale Yellow / No Chromogenic Shift (कोई रंग परिवर्तन नहीं)',
      hexColor: '#FDE047',
      referenceExpectedHex: '#FDE047',
      deltaEMatch: 0.81,
      confidenceScore: 99.5,
      calibrationQuality: 'CALIBRATED_OPTIMAL',
      reactionTimelineMatch: 'No chromogenic reaction observed within 60 seconds observation period.',
      forensicObservations: 'Reagent remained pale straw yellow with zero violet, purple, orange, or black transition. Negative for diacetylmorphine, morphine, codeine, and amphetamine-class psychotropics.',
      ndpsSectionReference: 'Non-Contraband Screening - No NDPS Offence Attracted',
      courtReadinessSummary: 'Presumptive screening indicates negative reaction. Release of non-contraband material recommended subject to supervisory concurrence.',
      statutoryWarning: 'Presumptive negative screening result. Parcel cleared for regular customs processing.',
      source: 'gemini_vision_forensic_engine',
    },
    sha256Hash: '11223344556677889900AABBCCDDEEFF11223344556677889900AABBCCDDEEFF',
    status: 'SEIZED_PRESUMPTIVE',
    auditLog: [
      { timestamp: '2026-09-21 12:10:00 IST', action: 'Courier Screening & Spot Test Executed', actor: 'Insp. M. Sundaram' },
      { timestamp: '2026-09-21 12:11:30 IST', action: 'Negative Reaction Verified & Logged', actor: 'DRUG-CHECK Engine' },
    ],
  },
  {
    id: 'NCB-2026-BG-0119',
    caseNumber: 'NCB/SZU/CR/2026/0119',
    firNumber: 'CR No. 119/2026 (NCB Bengaluru Zonal Unit)',
    dateCreated: '2026-09-20T16:50:00Z',
    timestampUtc: '2026-09-20T16:50:00.670Z',
    timestampIst: '20 Sep 2026, 22:20:00.670 IST',
    officer: {
      name: 'Assistant Director K. Ramanujam',
      rankBadge: 'NCB Badge #SZ-0044',
      unit: 'Narcotics Control Bureau Cyber & Interdiction Wing',
      zoneState: 'Karnataka & Kerala Zone',
      firNumber: 'CR No. 119/2026',
      caseDiaryNumber: 'NCB-BG-CR-119',
      thanaJurisdiction: 'NCB Bengaluru Special Jurisdiction',
      testKitLotNumber: 'LOT-FENT-RAPID-2026-02',
      testKitExpiry: '2027-12',
      seizureLocation: 'Darknet Foreign Post Office Consignment Centre, Chamarajpet, Bengaluru',
    },
    panchWitnesses: [
      {
        id: 'pw-9',
        name: 'Pradeep Kumar Hegde',
        age: 49,
        address: 'Flat 402, Royal Enclave, Chamarajpet, Bengaluru - 560018',
        contactNumber: '+91 99801-33412',
      },
      {
        id: 'pw-10',
        name: 'Anand R. Swamy',
        age: 37,
        address: 'Postal Assistant, Foreign Post Office, Bengaluru - 560018',
        contactNumber: '+91 99805-44219',
      },
    ],
    reagentId: 'fentanyl_strip',
    reagentName: 'Fentanyl / Ultra-Potent Opioid Lateral Flow Immunoassay',
    sampleDescription: 'Counterfeit light blue round tablets stamped with "M 30" illicit imprint laced with synthetic opioid.',
    seizedQuantityEstimated: '5,000 Counterfeit Fentanyl Tablets (Approx. 550 grams)',
    rawImage: createTestSwatchSvg('#450A0A', '#DC2626', 'SAMPLE 05: FENTANYL IMMUNOASSAY - SINGLE LINE (C-LINE ONLY) POSITIVE'),
    sampledColorHex: '#DC2626',
    calibration: {
      white: { r: 253, g: 253, b: 254, hex: '#FDFDFE' },
      gray18: { r: 128, g: 129, b: 128, hex: '#808180' },
      black: { r: 10, g: 10, b: 11, hex: '#0A0A0B' },
      colorIndex: 99.6,
      quality: 'OPTIMAL',
      whiteBalanceCorrectionFactor: { r: 1.0, g: 1.0, b: 1.0 },
    },
    analysis: {
      outcome: 'POSITIVE',
      presumptiveSubstance: 'Synthetic Opioid (Fentanyl / Fentanyl Analogue Adulteration)',
      detectedHue: 'Single Red Band at Control Line (C-Line Only = POSITIVE)',
      hexColor: '#DC2626',
      referenceExpectedHex: '#DC2626',
      deltaEMatch: 1.15,
      confidenceScore: 99.4,
      calibrationQuality: 'CALIBRATED_OPTIMAL',
      reactionTimelineMatch: 'Lateral flow completed at 3.5 minutes. Distinct Control (C) band present; Test (T) band completely absent (competitive inhibition).',
      forensicObservations: 'Rapid competitive lateral flow immunoassay confirmed presence of Fentanyl at or above cut-off threshold of 20 ng/mL in dissolved pill scrapings. High toxicity biohazard protocol invoked.',
      ndpsSectionReference: 'Section 21(c) & Section 22(c) NDPS Act 1985 (Class A High-Risk Synthetic Narcotic)',
      courtReadinessSummary: 'Positive immunoassay detection of lethal synthetic opioid Fentanyl. Case docketed under urgent Section 52A NDPS protocol.',
      statutoryWarning: 'PRESUMPTIVE IMMUNOASSAY SCREENING: Lethal synthetic opioid confirmed. Hazardous handling precautions mandatory.',
      source: 'gemini_vision_forensic_engine',
      immunoassayDetails: {
        controlLinePresent: true,
        testLinePresent: false,
        bandInterpretation: 'Single C line visible; T line absent. Conclusive positive for Fentanyl competitive immunoassay.',
      },
    },
    sha256Hash: '887766554433221100FFEEDDCCBBAA99887766554433221100FFEEDDCCBBAA99',
    status: 'SEIZED_PRESUMPTIVE',
    auditLog: [
      { timestamp: '2026-09-20 22:20:00 IST', action: 'Foreign Post Office Darknet Parcel Interdiction', actor: 'Asst. Dir. K. Ramanujam' },
      { timestamp: '2026-09-20 22:24:00 IST', action: 'Fentanyl Lateral Flow Strip Immunoassay Analyzed', actor: 'DRUG-CHECK Engine' },
    ],
  },
];
