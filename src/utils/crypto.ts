import QRCode from 'qrcode';

/**
 * Computes a SHA-256 cryptographic hash over string data or raw image + payload.
 */
export async function computeSha256(data: string | Uint8Array): Promise<string> {
  const bytes = typeof data === 'string' ? new TextEncoder().encode(data) : data;
  const hashBuffer = await crypto.subtle.digest('SHA-256', bytes as unknown as BufferSource);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
  return hashHex.toUpperCase();
}

/**
 * Generates an official evidentiary payload hash combining image digest + metadata
 */
export async function generateEvidentiaryHash(params: {
  rawImageBase64: string;
  firNumber: string;
  officerBadge: string;
  reagentId: string;
  timestampIst: string;
  gpsCoords?: { lat: number; lng: number };
  sampledHex: string;
}): Promise<string> {
  // We hash the raw image digest first
  const imageHash = await computeSha256(params.rawImageBase64 || 'EMPTY_IMAGE');

  const combinedDigestString = [
    `GOVT_INDIA_NCB_EVIDENTIARY_SEAL_V2`,
    `IMG_HASH:${imageHash}`,
    `FIR:${params.firNumber || 'UNASSIGNED'}`,
    `OFFICER:${params.officerBadge}`,
    `REAGENT:${params.reagentId}`,
    `TIME_IST:${params.timestampIst}`,
    `GPS:${params.gpsCoords ? `${params.gpsCoords.lat.toFixed(6)},${params.gpsCoords.lng.toFixed(6)}` : 'UNKNOWN'}`,
    `OPTICAL_HEX:${params.sampledHex}`,
    `STATUTORY_FRAMEWORK:NDPS_ACT_1985_SEC52A_BNSS_2023`,
  ].join('||');

  return computeSha256(combinedDigestString);
}

/**
 * Formats a SHA-256 hash into official police ledger chunks
 * e.g. 8E3B:19A4:5D91:...
 */
export function formatHashDigest(hash: string): string {
  if (!hash) return '';
  return hash.match(/.{1,4}/g)?.join(':') || hash;
}

/**
 * Generates a high-density QR Code Data URL for instant physical verification
 */
export async function generateEvidentiaryQrCode(payload: {
  firNumber: string;
  caseId: string;
  substance: string;
  outcome: string;
  officer: string;
  sha256: string;
  timestamp: string;
}): Promise<string> {
  const qrContent = JSON.stringify({
    portal: 'NCB-DRUG-CHECK-INDIA',
    auth: 'MHA/NCB/ANTF/52A',
    case: payload.caseId,
    fir: payload.firNumber,
    res: payload.outcome,
    sub: payload.substance,
    by: payload.officer,
    ts: payload.timestamp,
    hash: payload.sha256.substring(0, 16) + '...',
    verifyUrl: `https://ncb.gov.in/verify/evidence?docket=${payload.caseId}&sha=${payload.sha256.substring(0, 8)}`,
  });

  try {
    return await QRCode.toDataURL(qrContent, {
      errorCorrectionLevel: 'H',
      margin: 2,
      width: 260,
      color: {
        dark: '#0F172A',
        light: '#FFFFFF',
      },
    });
  } catch (err) {
    console.error('QR code generation error:', err);
    return '';
  }
}
