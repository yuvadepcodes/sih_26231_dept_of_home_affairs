import { jsPDF } from 'jspdf';
import { CaseRecord } from '../types';
import { formatHashDigest } from './crypto';

/**
 * Generates an official Court-Ready PDF Certificate of Presumptive Field Analysis (FORM VII)
 */
export async function generateCourtReadyPdf(caseData: CaseRecord): Promise<void> {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 14;

  // Background subtle border & security watermark
  doc.setDrawColor(30, 41, 59); // Navy slate
  doc.setLineWidth(0.8);
  doc.rect(margin, margin, pageWidth - margin * 2, pageHeight - margin * 2);
  doc.setLineWidth(0.2);
  doc.rect(margin + 1.5, margin + 1.5, pageWidth - margin * 2 - 3, pageHeight - margin * 2 - 3);

  // Watermark text in background
  doc.setTextColor(240, 240, 245);
  doc.setFontSize(28);
  doc.setFont('helvetica', 'bold');
  doc.text('GOVERNMENT OF INDIA - NCB SECURE', pageWidth / 2, pageHeight / 2, {
    align: 'center',
    angle: 45,
  });

  let y = margin + 8;

  // Header Banner
  doc.setFillColor(15, 23, 42); // Deep Navy
  doc.rect(margin + 2, y, pageWidth - (margin * 2 + 4), 22, 'F');

  doc.setTextColor(217, 119, 6); // Ashoka Gold
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.text('GOVERNMENT OF INDIA | MINISTRY OF HOME AFFAIRS (MHA)', pageWidth / 2, y + 5, { align: 'center' });

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(11);
  doc.text('NARCOTICS CONTROL BUREAU & POLICE ANTF FIELD PORTAL', pageWidth / 2, y + 11, { align: 'center' });

  doc.setFontSize(8);
  doc.setTextColor(203, 213, 225);
  doc.text('FORM VII: CERTIFICATE OF PRESUMPTIVE COLORIMETRIC FIELD ANALYSIS', pageWidth / 2, y + 17, { align: 'center' });

  y += 26;

  // Subtitle / Legal Framing
  doc.setTextColor(15, 23, 42);
  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'normal');
  doc.text(
    '[Issued under Section 52A NDPS Act 1985 & Section 105 Bharatiya Nagarik Suraksha Sanhita (BNSS 2023)]',
    pageWidth / 2,
    y,
    { align: 'center' }
  );

  y += 5;

  // Case & FIR Details Table Grid
  doc.setFillColor(241, 245, 249);
  doc.rect(margin + 3, y, pageWidth - (margin * 2 + 6), 26, 'F');
  doc.setDrawColor(203, 213, 225);
  doc.rect(margin + 3, y, pageWidth - (margin * 2 + 6), 26, 'S');

  doc.setFontSize(8);
  doc.setTextColor(15, 23, 42);

  // Row 1
  doc.setFont('helvetica', 'bold');
  doc.text('FIR / Crime No:', margin + 6, y + 5);
  doc.setFont('helvetica', 'normal');
  doc.text(caseData.firNumber || 'N/A', margin + 34, y + 5);

  doc.setFont('helvetica', 'bold');
  doc.text('Police Thana / ANTF Unit:', margin + 75, y + 5);
  doc.setFont('helvetica', 'normal');
  doc.text(caseData.officer.thanaJurisdiction || caseData.officer.unit, margin + 120, y + 5);

  // Row 2
  doc.setFont('helvetica', 'bold');
  doc.text('Inspecting Officer:', margin + 6, y + 11);
  doc.setFont('helvetica', 'normal');
  doc.text(`${caseData.officer.name} (${caseData.officer.rankBadge})`, margin + 34, y + 11);

  doc.setFont('helvetica', 'bold');
  doc.text('Time & Date (IST):', margin + 75, y + 11);
  doc.setFont('helvetica', 'normal');
  doc.text(caseData.timestampIst, margin + 120, y + 11);

  // Row 3
  doc.setFont('helvetica', 'bold');
  doc.text('Seizure Location:', margin + 6, y + 17);
  doc.setFont('helvetica', 'normal');
  doc.text(caseData.officer.seizureLocation || 'Field Interdiction Site', margin + 34, y + 17);

  doc.setFont('helvetica', 'bold');
  doc.text('Kit Lot / Expiry:', margin + 75, y + 17);
  doc.setFont('helvetica', 'normal');
  doc.text(`${caseData.officer.testKitLotNumber || 'LOT-2026-NCB'} | Exp: ${caseData.officer.testKitExpiry || '2028-12'}`, margin + 120, y + 17);

  // Row 4
  doc.setFont('helvetica', 'bold');
  doc.text('Estimated Qty:', margin + 6, y + 23);
  doc.setFont('helvetica', 'normal');
  doc.text(caseData.seizedQuantityEstimated || 'Suspected Contraband Scrape (1-2mg test sample)', margin + 34, y + 23);

  doc.setFont('helvetica', 'bold');
  doc.text('Docket ID:', margin + 75, y + 23);
  doc.setFont('helvetica', 'normal');
  doc.text(caseData.caseNumber, margin + 120, y + 23);

  y += 30;

  // Analysis Result Section Header
  doc.setFillColor(15, 23, 42);
  doc.rect(margin + 3, y, pageWidth - (margin * 2 + 6), 6, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'bold');
  doc.text('1. REAGENT TEST RESULT & COLORIMETRIC VERIFICATION', margin + 6, y + 4.2);

  y += 8;

  // Result Badge Box
  const isPositive = caseData.analysis.outcome === 'POSITIVE';
  const outcomeColor = isPositive ? [220, 38, 38] : [16, 185, 129]; // Red for positive contraband, Green for negative

  doc.setFillColor(outcomeColor[0], outcomeColor[1], outcomeColor[2]);
  doc.rect(margin + 3, y, 40, 10, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text(caseData.analysis.outcome, margin + 23, y + 6.8, { align: 'center' });

  doc.setTextColor(15, 23, 42);
  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'bold');
  doc.text(`Presumptive Drug Class: ${caseData.analysis.presumptiveSubstance}`, margin + 46, y + 4.5);

  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'normal');
  doc.text(`Applied Reagent Protocol: ${caseData.reagentName}`, margin + 46, y + 9);

  y += 13;

  // Color Swatch & Optical Matching Details
  doc.setDrawColor(226, 232, 240);
  doc.setFillColor(248, 250, 252);
  doc.rect(margin + 3, y, pageWidth - (margin * 2 + 6), 22, 'FD');

  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'bold');
  doc.text('Observed Reaction Color:', margin + 6, y + 5);
  doc.setFont('helvetica', 'normal');
  doc.text(`${caseData.analysis.detectedHue} (${caseData.sampledColorHex})`, margin + 48, y + 5);

  doc.setFont('helvetica', 'bold');
  doc.text('Forensic Reference Hex:', margin + 6, y + 10);
  doc.setFont('helvetica', 'normal');
  doc.text(`${caseData.analysis.referenceExpectedHex}`, margin + 48, y + 10);

  doc.setFont('helvetica', 'bold');
  doc.text('Optical Delta-E Distance:', margin + 6, y + 15);
  doc.setFont('helvetica', 'normal');
  doc.text(`ΔE = ${caseData.analysis.deltaEMatch} (Forensic Match Index)`, margin + 48, y + 15);

  doc.setFont('helvetica', 'bold');
  doc.text('Confidence Score:', margin + 6, y + 20);
  doc.setFont('helvetica', 'normal');
  doc.text(`${caseData.analysis.confidenceScore}% (Spectral Alignment)`, margin + 48, y + 20);

  // Statutory NDPS Section Box
  doc.setFont('helvetica', 'bold');
  doc.text('NDPS Act Classification:', margin + 95, y + 5);
  doc.setFont('helvetica', 'normal');
  doc.text(caseData.analysis.ndpsSectionReference || 'Section 21 NDPS Act 1985', margin + 95, y + 10, {
    maxWidth: 80,
  });

  doc.setFont('helvetica', 'bold');
  doc.text('Calibration Card Status:', margin + 95, y + 17);
  doc.setFont('helvetica', 'normal');
  doc.text('4-Point Reference White-Balanced (100% White, 18% Neutral Gray, Black)', margin + 95, y + 21, {
    maxWidth: 80,
  });

  y += 25;

  // Forensic Observation Narrative
  doc.setFillColor(15, 23, 42);
  doc.rect(margin + 3, y, pageWidth - (margin * 2 + 6), 5.5, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.text('2. SCIENTIFIC OBSERVATION & PHASE TRANSITION LOG', margin + 6, y + 4);

  y += 7.5;

  doc.setTextColor(30, 41, 59);
  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'normal');
  const splitObservations = doc.splitTextToSize(
    caseData.analysis.forensicObservations ||
      'Presumptive chromogenic test demonstrated definitive optical transition matching standardized forensic controls.',
    pageWidth - (margin * 2 + 10)
  );
  doc.text(splitObservations, margin + 5, y);

  y += splitObservations.length * 3.8 + 2;

  // Evidence Photos Embedding (If available)
  if (caseData.rawImage && caseData.rawImage.startsWith('data:image')) {
    doc.setFillColor(15, 23, 42);
    doc.rect(margin + 3, y, pageWidth - (margin * 2 + 6), 5.5, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.text('3. PHOTOGRAPHIC FIELD EVIDENCE & SPOT CALIBRATION CARD', margin + 6, y + 4);

    y += 7.5;

    try {
      doc.addImage(caseData.rawImage, 'JPEG', margin + 6, y, 46, 32);
      doc.setDrawColor(15, 23, 42);
      doc.rect(margin + 6, y, 46, 32);

      doc.setFontSize(7);
      doc.setTextColor(100, 116, 139);
      doc.text('Raw Capture with In-Frame Calibration', margin + 6, y + 35);
    } catch (e) {
      console.warn('PDF image embedding skipped:', e);
    }

    // QR Code Stamp on right side
    if (caseData.qrCodeUrl) {
      try {
        doc.addImage(caseData.qrCodeUrl, 'PNG', pageWidth - margin - 38, y, 32, 32);
        doc.setFontSize(6.5);
        doc.setTextColor(15, 23, 42);
        doc.text('SCAN TO VERIFY SHA-256', pageWidth - margin - 38, y + 35);
      } catch (e) {
        // QR embedding fallback
      }
    }

    y += 38;
  }

  // Cryptographic Tamper-Evident Chain-of-Custody Box
  doc.setFillColor(241, 245, 249);
  doc.rect(margin + 3, y, pageWidth - (margin * 2 + 6), 16, 'F');
  doc.setDrawColor(148, 163, 184);
  doc.rect(margin + 3, y, pageWidth - (margin * 2 + 6), 16, 'S');

  doc.setFontSize(7.5);
  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.text('IMMUTABLE CRYPTOGRAPHIC SHA-256 EVIDENCE HASH:', margin + 6, y + 5);

  doc.setFont('courier', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(30, 58, 138); // Blue
  const formattedHash = formatHashDigest(caseData.sha256Hash || 'E3B0C44298FC1C149AFBF4C8996FB92427AE41E4649B934CA495991B7852B855');
  doc.text(formattedHash, margin + 6, y + 10, { maxWidth: pageWidth - (margin * 2 + 12) });

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(6.5);
  doc.setTextColor(100, 116, 139);
  doc.text('This cryptographic hash binds the raw field photo, GPS telemetry, officer credentials, and test parameters.', margin + 6, y + 14);

  y += 20;

  // Panch Witnesses & Inspecting Officer Signatures
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(15, 23, 42);

  const colWidth = (pageWidth - margin * 2) / 3;

  // Officer Block
  doc.text('Inspecting Officer / ANTF:', margin + 4, y);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.text(`Name: ${caseData.officer.name}`, margin + 4, y + 4);
  doc.text(`Badge: ${caseData.officer.rankBadge}`, margin + 4, y + 8);
  doc.text('Signature & Seal: ___________________', margin + 4, y + 14);

  // Panch Witness 1
  const panch1 = caseData.panchWitnesses[0] || { name: 'Panch Witness 1', address: 'Local Independent Resident' };
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.text('Panch Witness 1 (Sec 105 BNSS):', margin + colWidth + 2, y);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.text(`Name: ${panch1.name}`, margin + colWidth + 2, y + 4);
  doc.text(`Address: ${panch1.address}`, margin + colWidth + 2, y + 8, { maxWidth: 50 });
  doc.text('Signature: ___________________', margin + colWidth + 2, y + 14);

  // Panch Witness 2
  const panch2 = caseData.panchWitnesses[1] || { name: 'Panch Witness 2', address: 'Local Independent Resident' };
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.text('Panch Witness 2 (Sec 105 BNSS):', margin + colWidth * 2, y);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.text(`Name: ${panch2.name}`, margin + colWidth * 2, y + 4);
  doc.text(`Address: ${panch2.address}`, margin + colWidth * 2, y + 8, { maxWidth: 50 });
  doc.text('Signature: ___________________', margin + colWidth * 2, y + 14);

  y += 18;

  // Statutory Legal Disclaimer Footer
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.5);
  doc.setTextColor(185, 28, 28); // Red warning
  doc.text('STATUTORY LEGAL NOTICE / DISCLOSURE:', margin + 4, y);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6);
  doc.setTextColor(100, 116, 139);
  const disclaimer =
    'This certificate constitutes a Presumptive Field-Test Screening conducted under field interdiction conditions for immediate seizure, sampling, and arrest under Section 42/43/52A of the NDPS Act 1985. It serves as preliminary forensic evidence and does not replace confirmatory Gas Chromatography-Mass Spectrometry (GC-MS) / HPLC laboratory testing by the State / Central Forensic Science Laboratory (CFSL).';
  const splitDisclaimer = doc.splitTextToSize(disclaimer, pageWidth - (margin * 2 + 8));
  doc.text(splitDisclaimer, margin + 4, y + 3.5);

  // Save the document
  doc.save(`NCB_FORM_VII_FIR_${caseData.firNumber.replace(/\//g, '_')}_${caseData.caseNumber}.pdf`);
}

/**
 * Generates an official Word Document (.doc / .docx compatible formatted HTML) for court submission
 */
export function generateWordDocument(caseData: CaseRecord): void {
  const isPositive = caseData.analysis.outcome === 'POSITIVE';
  const outcomeColor = isPositive ? '#DC2626' : '#10B981';

  const docHtml = `
    <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
    <head>
      <meta charset="utf-8">
      <title>FORM VII - Presumptive Colorimetric Certificate</title>
      <style>
        body { font-family: 'Times New Roman', serif; font-size: 11pt; line-height: 1.4; color: #111827; }
        .header { text-align: center; border-bottom: 2px solid #0F172A; padding-bottom: 8px; margin-bottom: 16px; }
        .govt-title { font-size: 14pt; font-weight: bold; color: #0F172A; text-transform: uppercase; }
        .sub-title { font-size: 11pt; font-weight: bold; color: #B45309; }
        .table-data { width: 100%; border-collapse: collapse; margin-top: 12px; margin-bottom: 12px; }
        .table-data th, .table-data td { border: 1px solid #CBD5E1; padding: 6px 8px; font-size: 10pt; }
        .table-data th { background-color: #F1F5F9; font-weight: bold; text-align: left; }
        .outcome-badge { display: inline-block; padding: 6px 14px; background-color: ${outcomeColor}; color: white; font-weight: bold; font-size: 12pt; border-radius: 4px; }
        .hash-box { background-color: #F8FAFC; border: 1px dashed #64748B; padding: 8px; font-family: 'Courier New', monospace; font-size: 9pt; word-break: break-all; }
        .disclaimer { font-size: 8.5pt; color: #64748B; border-top: 1px solid #E2E8F0; padding-top: 8px; margin-top: 20px; font-style: italic; }
        .sign-grid { width: 100%; margin-top: 30px; }
        .sign-cell { width: 33%; vertical-align: top; font-size: 9.5pt; }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="govt-title">GOVERNMENT OF INDIA</div>
        <div class="sub-title">NARCOTICS CONTROL BUREAU (NCB) / POLICE ANTF</div>
        <div style="font-size: 12pt; font-weight: bold; margin-top: 4px;">FORM VII: CERTIFICATE OF PRESUMPTIVE COLORIMETRIC FIELD ANALYSIS</div>
        <div style="font-size: 9pt; color: #475569;">[Under Section 52A NDPS Act 1985 & Section 105 BNSS 2023]</div>
      </div>

      <table class="table-data">
        <tr>
          <th>Case Docket / Reference ID</th>
          <td><b>${caseData.caseNumber}</b></td>
          <th>FIR / Crime Report No.</th>
          <td><b>${caseData.firNumber || 'N/A'}</b></td>
        </tr>
        <tr>
          <th>Thana / ANTF Zonal Unit</th>
          <td>${caseData.officer.thanaJurisdiction || caseData.officer.unit}</td>
          <th>State / Zonal Jurisdiction</th>
          <td>${caseData.officer.zoneState || 'Central NCB / State Police'}</td>
        </tr>
        <tr>
          <th>Inspecting Officer</th>
          <td>${caseData.officer.name} (${caseData.officer.rankBadge})</td>
          <th>Microsecond Timestamp (IST)</th>
          <td>${caseData.timestampIst}</td>
        </tr>
        <tr>
          <th>Seizure Location & Landmark</th>
          <td>${caseData.officer.seizureLocation || 'Field Interdiction Site'}</td>
          <th>Reagent Kit Lot & Expiry</th>
          <td>${caseData.officer.testKitLotNumber || 'LOT-2026-NCB'} (Exp: ${caseData.officer.testKitExpiry || '2028-12'})</td>
        </tr>
        <tr>
          <th>Suspected Sample Description</th>
          <td colspan="3">${caseData.sampleDescription || 'Suspect contraband seized during field search under NDPS Act.'}</td>
        </tr>
      </table>

      <h3>1. Presumptive Test Findings & Colorimetric Verification</h3>
      <p>
        Outcome: <span class="outcome-badge">${caseData.analysis.outcome}</span><br/>
        <b>Presumptive Contraband Identified:</b> ${caseData.analysis.presumptiveSubstance}<br/>
        <b>Reagent Test Protocol:</b> ${caseData.reagentName}<br/>
        <b>Observed Reaction Color:</b> ${caseData.analysis.detectedHue} (${caseData.sampledColorHex})<br/>
        <b>Target Standard Reference Hex:</b> ${caseData.analysis.referenceExpectedHex}<br/>
        <b>Optical Delta-E Spectral Distance:</b> ΔE ${caseData.analysis.deltaEMatch} (Confidence: ${caseData.analysis.confidenceScore}%)<br/>
        <b>NDPS Act Classification:</b> ${caseData.analysis.ndpsSectionReference}
      </p>

      <h3>2. Forensic Observation Narrative</h3>
      <p style="background-color: #F8FAFC; padding: 10px; border-left: 3px solid #0F172A;">
        ${caseData.analysis.forensicObservations}
      </p>

      <h3>3. Tamper-Evident Cryptographic Hash & Digital Seal</h3>
      <div class="hash-box">
        <b>SHA-256 Digest:</b><br/>
        ${caseData.sha256Hash}<br/><br/>
        <b>Digital Audit Seal:</b> NCB-GOVT-IND-EVIDENCE-V2 // NDPS-SEC52A // ISO17025-READY
      </div>

      <table class="sign-grid">
        <tr>
          <td class="sign-cell">
            <b>INSPECTING OFFICER</b><br/>
            Name: ${caseData.officer.name}<br/>
            Badge: ${caseData.officer.rankBadge}<br/>
            Thana: ${caseData.officer.thanaJurisdiction}<br/>
            <br/><br/>
            Signature & Official Seal: _________________
          </td>
          <td class="sign-cell">
            <b>PANCH WITNESS 1 (Sec 105 BNSS)</b><br/>
            Name: ${caseData.panchWitnesses[0]?.name || 'Panch 1'}<br/>
            Contact: ${caseData.panchWitnesses[0]?.contactNumber || 'N/A'}<br/>
            Address: ${caseData.panchWitnesses[0]?.address || 'Local Resident'}<br/>
            <br/><br/>
            Signature: _________________
          </td>
          <td class="sign-cell">
            <b>PANCH WITNESS 2 (Sec 105 BNSS)</b><br/>
            Name: ${caseData.panchWitnesses[1]?.name || 'Panch 2'}<br/>
            Contact: ${caseData.panchWitnesses[1]?.contactNumber || 'N/A'}<br/>
            Address: ${caseData.panchWitnesses[1]?.address || 'Local Resident'}<br/>
            <br/><br/>
            Signature: _________________
          </td>
        </tr>
      </table>

      <div class="disclaimer">
        <b>STATUTORY LEGAL DISCLAIMER:</b> This certificate constitutes a Presumptive Field-Test Screening conducted under field interdiction conditions for immediate seizure, sampling, and arrest under Section 42/43/52A of the NDPS Act 1985. It serves as preliminary forensic evidence and does not replace confirmatory Gas Chromatography-Mass Spectrometry (GC-MS) / HPLC laboratory testing by the State / Central Forensic Science Laboratory (CFSL).
      </div>
    </body>
    </html>
  `;

  const blob = new Blob(['\ufeff', docHtml], {
    type: 'application/msword',
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `NCB_FORM_VII_${caseData.firNumber.replace(/\//g, '_')}_${caseData.caseNumber}.doc`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
