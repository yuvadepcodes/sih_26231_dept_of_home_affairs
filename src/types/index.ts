export interface ReagentKit {
  id: string;
  name: string;
  hindiName: string;
  targetSubstances: string;
  category: 'colorimetric' | 'immunoassay';
  primaryTarget: string;
  standardReactionHex: string;
  standardReactionName: string;
  negativeHex: string;
  negativeName: string;
  ndpsSection: string;
  steps: string[];
  reactionTimeSeconds: number;
  description: string;
  precautions: string;
}

export interface CalibrationTarget {
  white: { r: number; g: number; b: number; hex: string };
  gray18: { r: number; g: number; b: number; hex: string };
  black: { r: number; g: number; b: number; hex: string };
  colorIndex: number;
  quality: 'OPTIMAL' | 'ACCEPTABLE' | 'DEGRADED';
  luxEstimate?: number;
  whiteBalanceCorrectionFactor: { r: number; g: number; b: number };
}

export interface AnalysisOutcome {
  outcome: 'POSITIVE' | 'NEGATIVE' | 'INCONCLUSIVE';
  presumptiveSubstance: string;
  detectedHue: string;
  hexColor: string;
  referenceExpectedHex: string;
  deltaEMatch: number;
  confidenceScore: number;
  calibrationQuality: 'CALIBRATED_OPTIMAL' | 'ACCEPTABLE' | 'SUB_OPTIMAL_LIGHTING';
  reactionTimelineMatch: string;
  forensicObservations: string;
  ndpsSectionReference: string;
  courtReadinessSummary: string;
  statutoryWarning: string;
  source?: string;
  immunoassayDetails?: {
    controlLinePresent: boolean;
    testLinePresent: boolean;
    bandInterpretation: string;
  };
}

export interface OfficerDetails {
  name: string;
  rankBadge: string;
  unit: string;
  zoneState: string;
  firNumber: string;
  caseDiaryNumber: string;
  thanaJurisdiction: string;
  testKitLotNumber: string;
  testKitExpiry: string;
  seizureLocation: string;
}

export interface PanchWitness {
  id: string;
  name: string;
  age: number | string;
  address: string;
  contactNumber: string;
  signatureDataUrl?: string;
}

export interface CaseRecord {
  id: string;
  caseNumber: string;
  firNumber: string;
  dateCreated: string;
  timestampUtc: string;
  timestampIst: string;
  officer: OfficerDetails;
  panchWitnesses: PanchWitness[];
  reagentId: string;
  reagentName: string;
  sampleDescription: string;
  seizedQuantityEstimated: string;
  rawImage: string; // base64
  calibratedImage?: string;
  sampledColorHex: string;
  calibration: CalibrationTarget;
  analysis: AnalysisOutcome;
  sha256Hash: string;
  qrCodeUrl?: string;
  officerSignature?: string;
  status: 'SEIZED_PRESUMPTIVE' | 'PENDING_FSL' | 'COURT_SUBMITTED' | 'DISPOSED_SEC52A';
  auditLog: { timestamp: string; action: string; actor: string }[];
}
