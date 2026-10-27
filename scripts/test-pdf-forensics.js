const assert = require('assert');
const { analyzePdfForensics, compareDocumentVersions } = require('../src/lib/pdfForensics.ts');
const { validateMagicBytes, processUploadedFile } = require('../src/lib/documentParser.ts');

async function runTests() {
  console.log('=== Starting PDF Forensics & Document Processing Test Suite ===\n');

  // Test 1: Pristine Single-Pass PDF
  console.log('Test 1: Testing Pristine Single-Pass PDF...');
  const pristinePdfBuffer = Buffer.from(
    '%PDF-1.4\n' +
    '1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n' +
    '2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n' +
    '3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R >>\nendobj\n' +
    '4 0 obj\n<< /Length 44 >>\nstream\nBT /F1 12 Tf 100 700 Td (Official Invoice 2024) Tj ET\nendstream\nendobj\n' +
    '5 0 obj\n<< /Producer (Adobe Distiller 11.0) /CreationDate (D:20240115100000Z) /ModDate (D:20240115100000Z) >>\nendobj\n' +
    'xref\n0 6\n0000000000 65535 f \n' +
    'trailer\n<< /Size 6 /Root 1 0 R /Info 5 0 R >>\n' +
    'startxref\n340\n' +
    '%%EOF'
  );

  const report1 = await analyzePdfForensics(pristinePdfBuffer, 'pristine_invoice.pdf');
  assert.strictEqual(report1.revisions.revisionCount, 1, 'Should have 1 revision');
  assert.strictEqual(report1.summary.verdict, 'NO_SIGNIFICANT_SIGNS', 'Should detect no significant signs');
  console.log('✓ Pristine PDF test passed: Verdict =', report1.summary.verdictTitle);

  // Test 2: Modified PDF with Incremental Revisions & Third-Party Online Editor
  console.log('\nTest 2: Testing Modified PDF with Incremental Save and Editor Signature...');
  const modifiedPdfBuffer = Buffer.from(
    '%PDF-1.4\n' +
    '1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n' +
    '2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n' +
    '3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] >>\nendobj\n' +
    'xref\n0 4\n' +
    'trailer\n<< /Root 1 0 R >>\nstartxref\n120\n%%EOF\n' +
    // Incremental Revision 2 appended
    '4 0 obj\n<< /Producer (iLovePDF) /Creator (Microsoft Word) /CreationDate (D:20240115100000Z) /ModDate (D:20240620153000Z) >>\nendobj\n' +
    'xref\n4 1\n0000000220 00000 n \n' +
    'trailer\n<< /Root 1 0 R /Info 4 0 R /Prev 120 >>\nstartxref\n320\n%%EOF'
  );

  const report2 = await analyzePdfForensics(modifiedPdfBuffer, 'tampered_invoice.pdf');
  assert.strictEqual(report2.revisions.revisionCount, 2, 'Should detect 2 incremental revisions');
  assert(report2.findings.some(f => f.title.includes('Incremental PDF Revisions')), 'Should have incremental revision finding');
  assert(report2.findings.some(f => f.title.includes('Third-Party PDF Editing Tool')), 'Should flag third-party editor signature');
  assert.strictEqual(report2.summary.verdict, 'STRONG_EVIDENCE_OF_MODIFICATION', 'Should flag strong evidence of modification');
  console.log('✓ Modified PDF test passed: Verdict =', report2.summary.verdictTitle);
  console.log('  Findings detected:', report2.findings.map(f => f.title).join('; '));

  // Test 3: Overlay Annotation Detection (FreeText / Square Mask)
  console.log('\nTest 3: Testing Suspicious Visual Overlay Annotation Detection...');
  const overlayPdfBuffer = Buffer.from(
    '%PDF-1.4\n' +
    '1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n' +
    '2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n' +
    '3 0 obj\n<< /Type /Page /Parent 2 0 R /Annots [4 0 R] >>\nendobj\n' +
    '4 0 obj\n<< /Type /Annot /Subtype /FreeText /Rect [100 200 300 240] /Contents ($95,000.00) >>\nendobj\n' +
    'trailer\n<< /Root 1 0 R >>\nstartxref\n250\n%%EOF'
  );

  const report3 = await analyzePdfForensics(overlayPdfBuffer, 'overlay_contract.pdf');
  assert(report3.findings.some(f => f.title.includes('Suspicious Visual Overlay Annotations')), 'Should detect FreeText overlay');
  console.log('✓ Overlay annotation test passed: Finding =', report3.findings.find(f => f.title.includes('Overlay')).title);

  // Test 4: Inverted Timestamp Anomaly (Clock manipulation)
  console.log('\nTest 4: Testing Inverted Timestamp Clock Manipulation...');
  const invertedTimePdf = Buffer.from(
    '%PDF-1.4\n' +
    '1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n' +
    '2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n' +
    '3 0 obj\n<< /Type /Page /Parent 2 0 R >>\nendobj\n' +
    '4 0 obj\n<< /CreationDate (D:20250501120000Z) /ModDate (D:20240101120000Z) >>\nendobj\n' +
    'trailer\n<< /Root 1 0 R /Info 4 0 R >>\nstartxref\n200\n%%EOF'
  );

  const report4 = await analyzePdfForensics(invertedTimePdf, 'time_manipulated.pdf');
  assert(report4.findings.some(f => f.title.includes('Inverted Metadata Timestamp Anomaly')), 'Should detect inverted timestamp');
  console.log('✓ Inverted timestamp test passed: Finding =', report4.findings.find(f => f.title.includes('Inverted')).title);

  // Test 5: Multi-Document Comparison
  console.log('\nTest 5: Testing Version Comparison Between 2 Documents...');
  const comparison = compareDocumentVersions(
    report1,
    'Contract agreement dated January 15 2024 between Company A and Company B for total sum of $10,000 payable upon delivery.',
    report2,
    'Contract agreement dated June 20 2024 between Company A and Company B for total sum of $85,000 payable upon delivery with amended terms.'
  );

  assert.strictEqual(comparison.doc1Name, 'pristine_invoice.pdf');
  assert.strictEqual(comparison.doc2Name, 'tampered_invoice.pdf');
  assert(comparison.changedDatesAndNumbers.length > 0, 'Should detect numeric differences ($10,000 vs $85,000)');
  console.log('✓ Multi-document comparison test passed:', comparison.overallAssessment);
  console.log('  Detected changes:', comparison.changedDatesAndNumbers);

  // Test 6: Magic Bytes Validation & File Type Security
  console.log('\nTest 6: Testing Magic Bytes Security & File Validation...');
  assert.strictEqual(validateMagicBytes(Buffer.from('%PDF-1.5...'), 'pdf'), true, 'Valid PDF magic bytes');
  assert.strictEqual(validateMagicBytes(Buffer.from('Not a pdf file'), 'pdf'), false, 'Reject invalid PDF magic bytes');
  assert.strictEqual(validateMagicBytes(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]), 'png'), true, 'Valid PNG');
  assert.strictEqual(validateMagicBytes(Buffer.from([0xff, 0xd8, 0xff, 0xe0]), 'jpg'), true, 'Valid JPEG');
  assert.strictEqual(validateMagicBytes(Buffer.from([0x50, 0x4b, 0x03, 0x04, 0x00]), 'docx'), true, 'Valid DOCX zip header');
  console.log('✓ Magic bytes validation test passed for all file types.');

  console.log('\n=== ALL 6 TESTS COMPLETED SUCCESSFULLY! ===');
}

runTests().catch(err => {
  console.error('Test failed with error:', err);
  process.exit(1);
});
