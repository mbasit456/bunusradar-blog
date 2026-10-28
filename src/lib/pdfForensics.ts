export interface PdfMetadata {
  title?: string;
  author?: string;
  subject?: string;
  creator?: string;
  producer?: string;
  creationDate?: string;
  creationDateParsed?: string;
  modDate?: string;
  modDateParsed?: string;
  pdfVersion?: string;
  isLinearized?: boolean;
  xmpCreateDate?: string;
  xmpModifyDate?: string;
  xmpMetadataDate?: string;
  xmpCreatorTool?: string;
  xmpProducer?: string;
  xmpHistory?: Array<{ action: string; when?: string; softwareAgent?: string }>;
}

export interface PdfRevision {
  revisionIndex: number;
  eofOffset: number;
  startXrefOffset: number;
  byteLength: number;
  isIncremental: boolean;
}

export interface PdfAnnotation {
  subtype: string;
  page?: number;
  rect?: number[];
  contents?: string;
  isSuspicious: boolean;
  reason?: string;
}

export interface PdfFinding {
  id: string;
  title: string;
  severity: 'Informational' | 'Low' | 'Medium' | 'High';
  page?: number;
  evidence: string;
  whyItMatters: string;
  alternativeExplanation: string;
  recommendedNextSteps: string;
}

export interface DocumentComparisonResult {
  doc1Name: string;
  doc2Name: string;
  pageCountDiff: { doc1: number; doc2: number; delta: number };
  addedTextSnippets: string[];
  removedTextSnippets: string[];
  changedDatesAndNumbers: Array<{ original: string; revised: string; context: string }>;
  metadataDiff: Record<string, { doc1?: string; doc2?: string }>;
  revisionComparison: { doc1Revisions: number; doc2Revisions: number };
  overallAssessment: string;
}

export interface PdfForensicReport {
  overview: {
    fileName: string;
    fileSize: number;
    fileSizeBytesFormatted: string;
    pdfVersion: string;
    pageCount: number;
    hasExtractableText: boolean;
    isScannedOrImageOnly: boolean;
    totalTextCharacters: number;
    metadata: PdfMetadata;
  };
  summary: {
    verdict: 'NO_SIGNIFICANT_SIGNS' | 'POSSIBLE_EDITING' | 'STRONG_EVIDENCE_OF_MODIFICATION' | 'INCONCLUSIVE';
    verdictTitle: string;
    confidence: 'Low' | 'Medium' | 'High';
    criticalAnomaliesCount: number;
    totalFindingsCount: number;
    executiveSummary: string;
    limitations: string[];
  };
  revisions: {
    revisionCount: number;
    hasIncrementalUpdates: boolean;
    history: PdfRevision[];
    trailingBytesAfterEof: number;
  };
  annotations: {
    totalCount: number;
    suspiciousCount: number;
    items: PdfAnnotation[];
  };
  signatures: {
    hasDigitalSignatures: boolean;
    signatureCount: number;
    isByteRangeCoveringEntireFile: boolean;
    details: string[];
  };
  fonts: {
    fontFamilies: string[];
    isUnusualFontMixDetected: boolean;
  };
  findings: PdfFinding[];
  pageTextSamples: Array<{ pageNumber: number; text: string }>;
  finalAssessment: string;
}

// Known third-party editing / modification tools
const KNOWN_EDITING_TOOLS = [
  'ilovepdf',
  'smallpdf',
  'sejda',
  'pdfescape',
  'canva',
  'pdf24',
  'sodapdf',
  'docfly',
  'lumin',
  'formswift',
  'pdfelement',
  'master pdf',
  'nitro',
  'foxit',
  'libreoffice',
  'gimp',
  'inkscape',
  'qoppa',
  'acrobat web',
  'pdf-xchange',
];

const KNOWN_ORIGINAL_AUTHORING_TOOLS = [
  'word',
  'indesign',
  'quark',
  'distiller',
  'google docs',
  'latex',
  'pages',
  'powerpoint',
  'excel',
];

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

// Parse PDF standard date string: D:YYYYMMDDHHmmSS[OHH'mm']
export function parsePdfDate(pdfDateStr?: string): { iso?: string; date?: Date } {
  if (!pdfDateStr) return {};
  const clean = pdfDateStr.replace(/^D:/, '').replace(/'/g, '');
  const match = clean.match(/^(\d{4})(\d{2})?(\d{2})?(\d{2})?(\d{2})?(\d{2})?([+\-Z])?(\d{2})?(\d{2})?/);
  if (!match) return {};

  const year = parseInt(match[1], 10);
  const month = match[2] ? parseInt(match[2], 10) - 1 : 0;
  const day = match[3] ? parseInt(match[3], 10) : 1;
  const hour = match[4] ? parseInt(match[4], 10) : 0;
  const min = match[5] ? parseInt(match[5], 10) : 0;
  const sec = match[6] ? parseInt(match[6], 10) : 0;

  const dateObj = new Date(Date.UTC(year, month, day, hour, min, sec));
  if (isNaN(dateObj.getTime())) return {};

  return { iso: dateObj.toISOString(), date: dateObj };
}

// Extract strings from PDF info dictionary
function extractLiteralString(bufferStr: string, key: string): string | undefined {
  const regex = new RegExp(`/${key}\\s*\\(([^)]*)\\)`, 'i');
  const match = bufferStr.match(regex);
  if (match) return match[1].trim();

  // Also check hex encoded string /Key <48656c6c6f>
  const hexRegex = new RegExp(`/${key}\\s*<([0-9a-fA-F]+)>`, 'i');
  const hexMatch = bufferStr.match(hexRegex);
  if (hexMatch) {
    try {
      return Buffer.from(hexMatch[1], 'hex').toString('utf-8').trim();
    } catch {
      return undefined;
    }
  }
  return undefined;
}

// Extract XMP Metadata stream
function extractXmpMetadata(bufferStr: string): Partial<PdfMetadata> {
  const result: Partial<PdfMetadata> = {};
  const xmpMatch = bufferStr.match(/<x:xmpmeta[\s\S]*?<\/x:xmpmeta>/i);
  if (!xmpMatch) return result;

  const xmp = xmpMatch[0];

  const createDateMatch = xmp.match(/<xmp:CreateDate>([^<]+)<\/xmp:CreateDate>/i);
  if (createDateMatch) result.xmpCreateDate = createDateMatch[1].trim();

  const modifyDateMatch = xmp.match(/<xmp:ModifyDate>([^<]+)<\/xmp:ModifyDate>/i);
  if (modifyDateMatch) result.xmpModifyDate = modifyDateMatch[1].trim();

  const metaDateMatch = xmp.match(/<xmp:MetadataDate>([^<]+)<\/xmp:MetadataDate>/i);
  if (metaDateMatch) result.xmpMetadataDate = metaDateMatch[1].trim();

  const creatorToolMatch = xmp.match(/<xmp:CreatorTool>([^<]+)<\/xmp:CreatorTool>/i);
  if (creatorToolMatch) result.xmpCreatorTool = creatorToolMatch[1].trim();

  const producerMatch = xmp.match(/<pdf:Producer>([^<]+)<\/pdf:Producer>/i);
  if (producerMatch) result.xmpProducer = producerMatch[1].trim();

  // Extract history entries
  const historyEntries: Array<{ action: string; when?: string; softwareAgent?: string }> = [];
  const historySeqMatch = xmp.match(/<xmpMM:History>[\s\S]*?<\/xmpMM:History>/i);
  if (historySeqMatch) {
    const liMatches = Array.from(historySeqMatch[0].matchAll(/<rdf:li\s+([^>]+)\/>/gi));
    liMatches.forEach(m => {
      const attrs = m[1];
      const action = attrs.match(/stEvt:action="([^"]+)"/i)?.[1] || 'saved';
      const when = attrs.match(/stEvt:when="([^"]+)"/i)?.[1];
      const software = attrs.match(/stEvt:softwareAgent="([^"]+)"/i)?.[1];
      historyEntries.push({ action, when, softwareAgent: software });
    });
  }
  if (historyEntries.length > 0) {
    result.xmpHistory = historyEntries;
  }

  return result;
}

export async function analyzePdfForensics(
  buffer: Buffer,
  fileName: string
): Promise<PdfForensicReport> {
  const fileSize = buffer.length;
  const rawString = buffer.toString('binary');
  const asciiString = buffer.toString('latin1');

  // 1. Check Magic Bytes & PDF Version
  const headerMatch = asciiString.slice(0, 1024).match(/%PDF-(\d+\.\d+)/);
  const pdfVersion = headerMatch ? headerMatch[1] : 'Unknown';

  // 2. Incremental Revisions Analysis
  // Scan for %%EOF markers
  const eofMatches = Array.from(asciiString.matchAll(/%%EOF/g));
  const revisionCount = Math.max(eofMatches.length, 1);
  const revisions: PdfRevision[] = [];

  for (let i = 0; i < eofMatches.length; i++) {
    const eofOffset = eofMatches[i].index ?? 0;
    // Find preceding startxref
    const chunkBeforeEof = asciiString.slice(Math.max(0, eofOffset - 256), eofOffset);
    const startXrefMatch = chunkBeforeEof.match(/startxref\s+(\d+)/);
    const startXrefOffset = startXrefMatch ? parseInt(startXrefMatch[1], 10) : 0;

    revisions.push({
      revisionIndex: i + 1,
      eofOffset: eofOffset + 5,
      startXrefOffset,
      byteLength: eofOffset + 5,
      isIncremental: i > 0,
    });
  }

  // Trailing bytes after the last %%EOF
  const lastEofIndex = eofMatches.length > 0 ? (eofMatches[eofMatches.length - 1].index ?? 0) + 5 : fileSize;
  const trailingBytesAfterEof = Math.max(0, fileSize - lastEofIndex);

  // 3. Metadata Extraction
  const title = extractLiteralString(asciiString, 'Title');
  const author = extractLiteralString(asciiString, 'Author');
  const subject = extractLiteralString(asciiString, 'Subject');
  const creator = extractLiteralString(asciiString, 'Creator');
  const producer = extractLiteralString(asciiString, 'Producer');
  const creationDate = extractLiteralString(asciiString, 'CreationDate');
  const modDate = extractLiteralString(asciiString, 'ModDate');

  const creationDateParsed = parsePdfDate(creationDate);
  const modDateParsed = parsePdfDate(modDate);

  // XMP Metadata
  const xmpMeta = extractXmpMetadata(rawString);

  const metadata: PdfMetadata = {
    title,
    author,
    subject,
    creator,
    producer,
    creationDate,
    creationDateParsed: creationDateParsed.iso,
    modDate,
    modDateParsed: modDateParsed.iso,
    pdfVersion,
    isLinearized: /Linearized/i.test(asciiString.slice(0, 2048)),
    ...xmpMeta,
  };

  // 4. Annotations & Overlays Analysis
  const annotations: PdfAnnotation[] = [];
  const annotMatches = Array.from(asciiString.matchAll(/\/Subtype\s*\/([a-zA-Z0-9]+)/g));
  const freeTextMatches = Array.from(asciiString.matchAll(/\/Subtype\s*\/FreeText/g));
  const squareMatches = Array.from(asciiString.matchAll(/\/Subtype\s*\/Square/g));
  const stampMatches = Array.from(asciiString.matchAll(/\/Subtype\s*\/Stamp/g));
  const inkMatches = Array.from(asciiString.matchAll(/\/Subtype\s*\/Ink/g));
  const widgetMatches = Array.from(asciiString.matchAll(/\/Subtype\s*\/Widget/g));

  if (freeTextMatches.length > 0) {
    annotations.push({
      subtype: 'FreeText',
      isSuspicious: true,
      reason: 'FreeText overlay annotations detected. Often used to superimpose new text, numbers, or dates over existing documents.',
    });
  }
  if (squareMatches.length > 0) {
    annotations.push({
      subtype: 'Square',
      isSuspicious: true,
      reason: 'Square shape annotations detected. May indicate amateur attempts to whiteout or cover up underlying content.',
    });
  }
  if (stampMatches.length > 0) {
    annotations.push({
      subtype: 'Stamp',
      isSuspicious: false,
      reason: 'Stamp annotations present (e.g. approval seal or visual signature stamp).',
    });
  }
  if (inkMatches.length > 0) {
    annotations.push({
      subtype: 'Ink',
      isSuspicious: false,
      reason: 'Hand-drawn Ink annotations present (e.g. digital stylus drawing or manual initials).',
    });
  }
  if (widgetMatches.length > 0) {
    annotations.push({
      subtype: 'Widget',
      isSuspicious: false,
      reason: 'Interactive Form Field widgets present.',
    });
  }

  // 5. Digital Signatures & ByteRange Analysis
  const sigMatches = Array.from(asciiString.matchAll(/\/Type\s*\/Sig/g));
  const byteRangeMatches = Array.from(asciiString.matchAll(/\/ByteRange\s*\[\s*(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s*\]/g));
  const signatureDetails: string[] = [];
  let isByteRangeCoveringEntireFile = true;

  if (sigMatches.length > 0) {
    signatureDetails.push(`Detected ${sigMatches.length} digital signature object(s) (/Type /Sig).`);
  }

  for (const match of byteRangeMatches) {
    const offset1 = parseInt(match[1], 10);
    const len1 = parseInt(match[2], 10);
    const offset2 = parseInt(match[3], 10);
    const len2 = parseInt(match[4], 10);
    const totalCovered = offset2 + len2;

    if (totalCovered < fileSize - 128) {
      isByteRangeCoveringEntireFile = false;
      signatureDetails.push(
        `Digital signature byte-range covers ${totalCovered} bytes out of ${fileSize} total bytes. Content or incremental updates exist after the signed boundary.`
      );
    } else {
      signatureDetails.push(`Digital signature covers the document up to byte ${totalCovered} of ${fileSize}.`);
    }
  }

  // 6. Font Extraction & Analysis
  const fontMatches = Array.from(asciiString.matchAll(/\/BaseFont\s*\/([a-zA-Z0-9+\-_]+)/g));
  const fontFamiliesSet = new Set<string>();
  for (const m of fontMatches) {
    const rawFont = m[1];
    // Strip subset prefix e.g. ABCDEF+ArialMT -> ArialMT
    const cleanFont = rawFont.replace(/^[A-Z]{6}\+/, '');
    fontFamiliesSet.add(cleanFont);
  }
  const fontFamilies = Array.from(fontFamiliesSet);

  // 7. Resilient Native Text and Page Structure Extraction
  let pageCount = 1;
  const countMatch = asciiString.match(/\/Type\s*\/Pages[^>]*\/Count\s+(\d+)/);
  if (countMatch && countMatch[1]) {
    pageCount = Math.max(1, parseInt(countMatch[1], 10));
  } else {
    const pageObjectMatches = asciiString.match(/\/Type\s*\/Page\b/g);
    if (pageObjectMatches && pageObjectMatches.length > 0) {
      pageCount = pageObjectMatches.length;
    }
  }

  let totalTextCharacters = 0;
  const extractedChunks: string[] = [];

  // Match text in literal strings (...) Tj or ' or "
  const literalRegex = /\(([^)]+)\)\s*(?:Tj|'|")/g;
  let litMatch: RegExpExecArray | null;
  while ((litMatch = literalRegex.exec(asciiString)) !== null) {
    const clean = litMatch[1].replace(/\\([nrtbf()\\])/g, '$1').trim();
    if (clean.length > 1) {
      extractedChunks.push(clean);
      totalTextCharacters += clean.length;
    }
  }

  // Match text in array operators [(...) 10 (...)] TJ
  const arrayRegex = /\[(.*?)\]\s*TJ/g;
  let arrMatch: RegExpExecArray | null;
  while ((arrMatch = arrayRegex.exec(asciiString)) !== null) {
    const inner = arrMatch[1];
    const subMatches = inner.match(/\(([^)]+)\)/g);
    if (subMatches) {
      const combined = subMatches
        .map(s => s.slice(1, -1).replace(/\\([nrtbf()\\])/g, '$1'))
        .join('');
      if (combined.trim().length > 1) {
        extractedChunks.push(combined.trim());
        totalTextCharacters += combined.trim().length;
      }
    }
  }

  const pageTextSamples: Array<{ pageNumber: number; text: string }> = [];
  if (extractedChunks.length > 0) {
    const chunkSize = Math.max(1, Math.ceil(extractedChunks.length / Math.max(1, pageCount)));
    for (let p = 0; p < Math.min(pageCount, 10); p++) {
      const slice = extractedChunks.slice(p * chunkSize, (p + 1) * chunkSize).join(' ');
      if (slice.trim().length > 0) {
        pageTextSamples.push({
          pageNumber: p + 1,
          text: slice.slice(0, 1000),
        });
      }
    }
  }

  // If no stream text was parsed, check for uncompressed readable text lines
  if (totalTextCharacters < 20) {
    const textLines = asciiString
      .split(/[\r\n]+/)
      .map(line => line.trim())
      .filter(line => line.length > 3 && /^[\x20-\x7E\xA0-\xFF]+$/.test(line) && !line.startsWith('/') && !line.startsWith('%') && !/^(xref|trailer|startxref|endobj|obj|stream|endstream)$/.test(line));
    if (textLines.length > 0) {
      const fallbackSample = textLines.slice(0, 30).join(' ');
      totalTextCharacters = fallbackSample.length;
      pageTextSamples.push({
        pageNumber: 1,
        text: fallbackSample.slice(0, 1000),
      });
    }
  }

  const hasExtractableText = totalTextCharacters > 30;

  const isScannedOrImageOnly = !hasExtractableText && asciiString.includes('/Subtype /Image');

  // 8. Structural Forensic Findings Generation
  const findings: PdfFinding[] = [];
  let findingIdCounter = 1;

  // Check A: Incremental Revisions
  if (revisionCount > 1) {
    findings.push({
      id: `FIND-${findingIdCounter++}`,
      title: 'Multiple Incremental PDF Revisions Detected',
      severity: revisionCount > 2 ? 'High' : 'Medium',
      evidence: `The document contains ${revisionCount} distinct %%EOF markers and xref update blocks. Revisions occur at byte offsets: ${revisions
        .map(r => r.eofOffset)
        .join(', ')}.`,
      whyItMatters:
        'Incremental updates represent post-creation modifications where new or updated objects were appended to the file rather than saving a fresh single-pass document.',
      alternativeExplanation:
        'Legitimate workflow actions such as digital signing, form field filling, or adding sticky notes also use incremental updates to preserve document integrity.',
      recommendedNextSteps:
        'Inspect what objects were added or superseded in revision 2+. Verify whether modified objects altered financial figures, legal clauses, or dates.',
    });
  }

  // Check B: Timestamp Delta & Inversion
  if (creationDateParsed.date && modDateParsed.date) {
    const diffMs = modDateParsed.date.getTime() - creationDateParsed.date.getTime();
    const diffMinutes = Math.round(diffMs / (1000 * 60));

    if (diffMs < -60000) {
      // Creation date is in the future relative to Modification date!
      findings.push({
        id: `FIND-${findingIdCounter++}`,
        title: 'Inverted Metadata Timestamp Anomaly',
        severity: 'High',
        evidence: `CreationDate (${metadata.creationDate}) is recorded AFTER ModDate (${metadata.modDate}). Discrepancy of ${Math.abs(
          Math.round(diffMinutes / 60)
        )} hours.`,
        whyItMatters:
          'A file cannot be modified prior to its creation timestamp under normal circumstances. This strongly indicates manual metadata manipulation or incorrect system clock tampering during tampering.',
        alternativeExplanation:
          'Rare misconfiguration of client clock during document assembly, or export from an automated script with hardcoded timestamps.',
        recommendedNextSteps:
          'Treat the timestamp claims as unreliable and corroborate with external transmission metadata or digital signature timestamps.',
      });
    } else if (diffMinutes > 15) {
      const diffHours = (diffMinutes / 60).toFixed(1);
      const isDaysLater = diffMinutes > 1440;
      findings.push({
        id: `FIND-${findingIdCounter++}`,
        title: 'Significant Post-Creation Modification Timestamp Delta',
        severity: isDaysLater ? 'Medium' : 'Low',
        evidence: `CreationDate is ${creationDateParsed.iso} while ModDate is ${modDateParsed.iso} (delta: ${
          isDaysLater ? `${(diffMinutes / 1440).toFixed(1)} days` : `${diffHours} hours`
        }).`,
        whyItMatters:
          'Confirms the document was re-opened and re-saved significantly after initial generation.',
        alternativeExplanation:
          'The author may have made routine editorial updates or saved a draft before final export.',
        recommendedNextSteps:
          'Cross-reference the modification date with the document audit trail or invoice issuance date.',
      });
    }
  }

  // Check C: Producer / Creator Mismatch & Online PDF Editors
  const producerLower = (metadata.producer || '').toLowerCase();
  const creatorLower = (metadata.creator || '').toLowerCase();
  const xmpCreatorLower = (metadata.xmpCreatorTool || '').toLowerCase();
  const xmpProducerLower = (metadata.xmpProducer || '').toLowerCase();

  const detectedEditingSoftware = KNOWN_EDITING_TOOLS.find(
    tool =>
      producerLower.includes(tool) ||
      creatorLower.includes(tool) ||
      xmpCreatorLower.includes(tool) ||
      xmpProducerLower.includes(tool)
  );

  const detectedAuthoringSoftware = KNOWN_ORIGINAL_AUTHORING_TOOLS.find(
    tool => creatorLower.includes(tool) || xmpCreatorLower.includes(tool)
  );

  if (detectedEditingSoftware) {
    findings.push({
      id: `FIND-${findingIdCounter++}`,
      title: 'Third-Party PDF Editing Tool Signature Identified',
      severity: detectedAuthoringSoftware ? 'High' : 'Medium',
      evidence: `Producer/Creator metadata matches known PDF editor software: "${detectedEditingSoftware}". Original creator was "${
        metadata.creator || 'Unknown'
      }" and producer is "${metadata.producer || 'Unknown'}".`,
      whyItMatters:
        'Software like online PDF editors (e.g. iLovePDF, Sejda, Canva, PDFescape) are often employed to quickly alter text, swap numbers, or insert fraudulent signatures on official records.',
      alternativeExplanation:
        'The sender may have used an online tool for legitimate document compression, merging multiple pages, or converting image formats.',
      recommendedNextSteps:
        'Request the original uncompressed source document from the issuer and verify recipient/issuer copies directly.',
    });
  }

  // Check D: XMP vs Info Metadata Discrepancy
  if (
    metadata.modDateParsed &&
    metadata.xmpModifyDate &&
    metadata.modDateParsed.slice(0, 16) !== metadata.xmpModifyDate.slice(0, 16)
  ) {
    findings.push({
      id: `FIND-${findingIdCounter++}`,
      title: 'Discrepancy Between /Info Dictionary and XMP Metadata Stream',
      severity: 'Medium',
      evidence: `/Info ModDate is "${metadata.modDateParsed}" while XMP xmp:ModifyDate is "${metadata.xmpModifyDate}".`,
      whyItMatters:
        'Discrepancies between low-level PDF dictionary metadata and higher-level XMP RDF metadata typically occur when editing tools only update one metadata container, leaving traces of prior versions.',
      alternativeExplanation:
        'Some PDF utilities fail to synchronize XMP packets during rapid batch export.',
      recommendedNextSteps:
        'Examine XMP history events to see which software modified the document without syncing dictionary values.',
    });
  }

  // Check E: Suspicious Overlay Annotations
  if (freeTextMatches.length > 0 || squareMatches.length > 0) {
    findings.push({
      id: `FIND-${findingIdCounter++}`,
      title: 'Suspicious Visual Overlay Annotations Present',
      severity: 'High',
      evidence: `Found ${freeTextMatches.length} /FreeText overlay(s) and ${squareMatches.length} /Square overlay(s).`,
      whyItMatters:
        'Overlays can sit on top of the underlying page stream, masking original figures, dates, or terms without truly removing the underlying text.',
      alternativeExplanation:
        'Legitimate document review with sticky text comments or highlighting.',
      recommendedNextSteps:
        'Inspect the raw content stream beneath the overlay box to see whether obscured text differs from visible text.',
    });
  }

  // Check F: Digital Signature ByteRange Integrity
  if (sigMatches.length > 0 && !isByteRangeCoveringEntireFile) {
    findings.push({
      id: `FIND-${findingIdCounter++}`,
      title: 'Unverified Content Appended After Digital Signature Boundary',
      severity: 'High',
      evidence: 'The digital signature /ByteRange does not cover the trailing bytes of the document.',
      whyItMatters:
        'Any modification appended after a digital signature byte-range is not cryptographically protected by the original signer, meaning page contents may have been altered post-signing.',
      alternativeExplanation:
        'Some signing workflows append timestamp tokens or audit logs legitimately.',
      recommendedNextSteps:
        'Validate the signature using Adobe Acrobat Reader or OpenSSL to verify whether the certificate covers the current document state.',
    });
  }

  // Check G: Trailing Bytes After Last %%EOF
  if (trailingBytesAfterEof > 128) {
    findings.push({
      id: `FIND-${findingIdCounter++}`,
      title: 'Extraneous Data Appended Beyond PDF End-of-File',
      severity: 'Low',
      evidence: `Detected ${trailingBytesAfterEof} bytes appended after the final %%EOF token.`,
      whyItMatters:
        'Trailing data can hide concealed payloads, web links, or indicate incomplete transmission/file stitching.',
      alternativeExplanation:
        'Anti-virus scanning tags or web download wrappers sometimes append trailing telemetry.',
      recommendedNextSteps: 'Check trailing hex dump for readable ASCII strings or file headers.',
    });
  }

  // Check H: Scanned / Flattened Document Warning
  if (isScannedOrImageOnly) {
    findings.push({
      id: `FIND-${findingIdCounter++}`,
      title: 'Image-Only / Scanned Document (No Vector Text)',
      severity: 'Informational',
      evidence:
        'The document contains zero extractable text characters and consists entirely of raster image elements.',
      whyItMatters:
        'When documents are scanned or flattened into bitmaps, vector text forensics (font consistency, character spacing, object stream diffs) cannot be performed directly on text objects.',
      alternativeExplanation:
        'Standard physical paper scanning or deliberate flattening for distribution.',
      recommendedNextSteps:
        'Perform Optical Character Recognition (OCR) and visual artifact inspection for font misalignment or stamp splicing.',
    });
  }

  // 9. Calculate Overall Assessment & Verdict
  const criticalAnomaliesCount = findings.filter(f => f.severity === 'High').length;
  const mediumAnomaliesCount = findings.filter(f => f.severity === 'Medium').length;
  const totalFindingsCount = findings.length;

  let verdict: 'NO_SIGNIFICANT_SIGNS' | 'POSSIBLE_EDITING' | 'STRONG_EVIDENCE_OF_MODIFICATION' | 'INCONCLUSIVE';
  let verdictTitle: string;
  let confidence: 'Low' | 'Medium' | 'High' = 'High';
  let executiveSummary = '';

  if (isScannedOrImageOnly && criticalAnomaliesCount === 0) {
    verdict = 'INCONCLUSIVE';
    verdictTitle = 'Inconclusive - Scanned / Image-Only Document';
    confidence = 'Low';
    executiveSummary =
      'The uploaded PDF is a flattened raster image with no extractable text streams or vector object layers. While no overt metadata corruption was found, raster documents require image-level artifact examination to determine whether pixels were tampered with.';
  } else if (criticalAnomaliesCount >= 1 || (mediumAnomaliesCount >= 2 && revisionCount > 1)) {
    verdict = 'STRONG_EVIDENCE_OF_MODIFICATION';
    verdictTitle = 'Strong Evidence of Post-Creation Modification';
    confidence = 'High';
    executiveSummary = `Forensic analysis identified tangible structural and metadata indicators of post-creation editing. Specifically, ${criticalAnomaliesCount} high-severity anomaly(ies) were recorded, including ${
      detectedEditingSoftware ? `use of third-party editor "${detectedEditingSoftware}", ` : ''
    }${revisionCount > 1 ? `${revisionCount} incremental revision saves, ` : ''}${
      freeTextMatches.length > 0 ? 'visual overlay annotations, ' : ''
    }which differ from pristine original export behavior.`;
  } else if (mediumAnomaliesCount >= 1 || revisionCount > 1 || findings.some(f => f.severity === 'Low')) {
    verdict = 'POSSIBLE_EDITING';
    verdictTitle = 'Possible Editing Detected - Further Review Recommended';
    confidence = 'Medium';
    executiveSummary =
      'Observable properties indicate the document may have undergone secondary saving, metadata updates, or revision appending. While not definitive proof of malicious fraud, the observable markers distinguish this file from a pristine single-pass document.';
  } else {
    verdict = 'NO_SIGNIFICANT_SIGNS';
    verdictTitle = 'No Significant Signs of Editing Detected';
    confidence = 'High';
    executiveSummary =
      'The document presents consistent structural characteristics typical of a pristine, single-pass export. Metadata timestamps align chronologically, no incremental revision splices were found, and no overlay annotations were observed.';
  }

  const limitations = [
    'A PDF can be edited without being fraudulent (e.g. routine clerical corrections, form completion, or digital signing).',
    'Sophisticated nation-state or expert alterations that re-render and re-distill an entire document can remove incremental history markers.',
    'Forensic analysis evaluates structural, metadata, and object-level evidence within the file and should be paired with external verification.',
  ];

  const finalAssessment = `${verdictTitle}: Based on the available evidence, ${executiveSummary} Note that this evaluation is an assessment of observable technical properties, not a legal declaration of authenticity.`;

  return {
    overview: {
      fileName,
      fileSize,
      fileSizeBytesFormatted: formatBytes(fileSize),
      pdfVersion,
      pageCount,
      hasExtractableText,
      isScannedOrImageOnly,
      totalTextCharacters,
      metadata,
    },
    summary: {
      verdict,
      verdictTitle,
      confidence,
      criticalAnomaliesCount,
      totalFindingsCount,
      executiveSummary,
      limitations,
    },
    revisions: {
      revisionCount,
      hasIncrementalUpdates: revisionCount > 1,
      history: revisions,
      trailingBytesAfterEof,
    },
    annotations: {
      totalCount: annotMatches.length,
      suspiciousCount: freeTextMatches.length + squareMatches.length,
      items: annotations,
    },
    signatures: {
      hasDigitalSignatures: sigMatches.length > 0,
      signatureCount: sigMatches.length,
      isByteRangeCoveringEntireFile,
      details: signatureDetails,
    },
    fonts: {
      fontFamilies,
      isUnusualFontMixDetected: fontFamilies.length > 6,
    },
    findings,
    pageTextSamples,
    finalAssessment,
  };
}

// Compare two document versions
export function compareDocumentVersions(
  doc1Report: PdfForensicReport,
  doc1Text: string,
  doc2Report: PdfForensicReport,
  doc2Text: string
): DocumentComparisonResult {
  const pageDelta = doc2Report.overview.pageCount - doc1Report.overview.pageCount;

  // Simple token / line diff
  const lines1 = doc1Text.split('\n').map(l => l.trim()).filter(Boolean);
  const lines2 = doc2Text.split('\n').map(l => l.trim()).filter(Boolean);

  const set1 = new Set(lines1);
  const set2 = new Set(lines2);

  const added = lines2.filter(l => !set1.has(l)).slice(0, 15);
  const removed = lines1.filter(l => !set2.has(l)).slice(0, 15);

  // Detect changed numbers or dates between the two
  const numberRegex = /\b\d+([.,]\d+)?\b/g;
  const numbers1 = Array.from(doc1Text.matchAll(numberRegex)).map(m => m[0]);
  const numbers2 = Array.from(doc2Text.matchAll(numberRegex)).map(m => m[0]);

  const changedDatesAndNumbers: Array<{ original: string; revised: string; context: string }> = [];
  const minLen = Math.min(numbers1.length, numbers2.length);
  for (let i = 0; i < minLen && changedDatesAndNumbers.length < 10; i++) {
    if (numbers1[i] !== numbers2[i]) {
      changedDatesAndNumbers.push({
        original: numbers1[i],
        revised: numbers2[i],
        context: `Numeric change observed at occurrence ${i + 1}`,
      });
    }
  }

  const metadataDiff: Record<string, { doc1?: string; doc2?: string }> = {};
  const metaKeys: Array<keyof PdfMetadata> = [
    'title',
    'author',
    'creator',
    'producer',
    'creationDate',
    'modDate',
  ];

  for (const k of metaKeys) {
    const v1 = doc1Report.overview.metadata[k] as string | undefined;
    const v2 = doc2Report.overview.metadata[k] as string | undefined;
    if (v1 !== v2) {
      metadataDiff[k] = { doc1: v1 || 'None', doc2: v2 || 'None' };
    }
  }

  const overallAssessment = `Comparison of "${doc1Report.overview.fileName}" (Version 1) and "${
    doc2Report.overview.fileName
  }" (Version 2): Found ${added.length} added text lines, ${removed.length} removed lines, ${
    changedDatesAndNumbers.length
  } altered numeric or date figures, and ${
    doc2Report.revisions.revisionCount - doc1Report.revisions.revisionCount
  } additional revision iterations in Version 2.`;

  return {
    doc1Name: doc1Report.overview.fileName,
    doc2Name: doc2Report.overview.fileName,
    pageCountDiff: {
      doc1: doc1Report.overview.pageCount,
      doc2: doc2Report.overview.pageCount,
      delta: pageDelta,
    },
    addedTextSnippets: added,
    removedTextSnippets: removed,
    changedDatesAndNumbers,
    metadataDiff,
    revisionComparison: {
      doc1Revisions: doc1Report.revisions.revisionCount,
      doc2Revisions: doc2Report.revisions.revisionCount,
    },
    overallAssessment,
  };
}
