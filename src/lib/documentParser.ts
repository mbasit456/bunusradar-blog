import mammoth from 'mammoth';
import { analyzePdfForensics, PdfForensicReport } from './pdfForensics';

export interface ProcessedDocument {
  id: string;
  name: string;
  mimeType: string;
  extension: string;
  sizeBytes: number;
  sizeFormatted: string;
  extractedText: string;
  textSnippet: string;
  pageCount: number;
  isPdf: boolean;
  isImage: boolean;
  forensics?: PdfForensicReport;
  previewUrl?: string;
  uploadedAt: string;
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

export function validateMagicBytes(buffer: Buffer, extension: string): boolean {
  if (buffer.length < 4) return false;

  const ext = extension.toLowerCase().replace(/^\./, '');

  if (ext === 'pdf') {
    // PDF starts with %PDF- (within first 1024 bytes)
    const header = buffer.slice(0, 1024).toString('latin1');
    return header.includes('%PDF-');
  }

  if (ext === 'docx') {
    // DOCX is a zip archive starting with PK\x03\x04
    return buffer[0] === 0x50 && buffer[1] === 0x4b && buffer[2] === 0x03 && buffer[3] === 0x04;
  }

  if (ext === 'png') {
    // PNG starts with 89 50 4E 47 0D 0A 1A 0A
    return (
      buffer[0] === 0x89 &&
      buffer[1] === 0x50 &&
      buffer[2] === 0x4e &&
      buffer[3] === 0x47
    );
  }

  if (ext === 'jpg' || ext === 'jpeg') {
    // JPEG starts with FF D8 FF
    return buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff;
  }

  if (ext === 'webp') {
    // WEBP has RIFF at 0 and WEBP at 8
    const riff = buffer.slice(0, 4).toString('ascii');
    const webp = buffer.slice(8, 12).toString('ascii');
    return riff === 'RIFF' && webp === 'WEBP';
  }

  if (['txt', 'csv', 'md', 'json', 'tsv'].includes(ext)) {
    // Text formats should not contain null bytes in the first 1KB
    const checkLen = Math.min(buffer.length, 1024);
    for (let i = 0; i < checkLen; i++) {
      if (buffer[i] === 0) return false;
    }
    return true;
  }

  return true;
}

export async function processUploadedFile(
  buffer: Buffer,
  originalFilename: string,
  declaredMimeType: string
): Promise<ProcessedDocument> {
  const ext = (originalFilename.split('.').pop() || 'txt').toLowerCase();
  const id = `doc_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
  const sizeBytes = buffer.length;
  const sizeFormatted = formatBytes(sizeBytes);
  const uploadedAt = new Date().toISOString();

  // Validate magic numbers
  const isValidType = validateMagicBytes(buffer, ext);
  if (!isValidType) {
    throw new Error(
      `File validation failed: Content of "${originalFilename}" does not match declared type (.${ext}).`
    );
  }

  let extractedText = '';
  let pageCount = 1;
  let forensics: PdfForensicReport | undefined;
  const isPdf = ext === 'pdf';
  const isImage = ['png', 'jpg', 'jpeg', 'webp'].includes(ext);

  if (isPdf) {
    // Run full forensic analysis
    forensics = await analyzePdfForensics(buffer, originalFilename);
    pageCount = forensics.overview.pageCount;

    // Join page text samples or extract fuller text
    if (forensics.pageTextSamples && forensics.pageTextSamples.length > 0) {
      extractedText = forensics.pageTextSamples
        .map(p => `--- [Page ${p.pageNumber}] ---\n${p.text}`)
        .join('\n\n');
    } else {
      extractedText = '[Scanned / Image-Only PDF: No extractable vector text stream detected.]';
    }
  } else if (ext === 'docx') {
    try {
      const result = await mammoth.extractRawText({ buffer });
      extractedText = result.value || '';
      // Rough page estimate (300 words per page)
      const wordCount = extractedText.split(/\s+/).length;
      pageCount = Math.max(1, Math.ceil(wordCount / 300));
    } catch (e: any) {
      extractedText = `[Error parsing DOCX content: ${e.message}]`;
    }
  } else if (['txt', 'md', 'json'].includes(ext)) {
    extractedText = buffer.toString('utf-8');
    const lineCount = extractedText.split('\n').length;
    pageCount = Math.max(1, Math.ceil(lineCount / 40));
  } else if (['csv', 'tsv'].includes(ext)) {
    const raw = buffer.toString('utf-8');
    const lines = raw.split(/\r?\n/).filter(l => l.trim().length > 0);
    const header = lines[0] || '';
    const sample = lines.slice(0, 20).join('\n');
    extractedText = `Spreadsheet Data (${lines.length} rows):\nHeader: ${header}\n\nSample Preview (First 20 rows):\n${sample}`;
    pageCount = Math.max(1, Math.ceil(lines.length / 50));
  } else if (isImage) {
    extractedText = `[Image Document: ${originalFilename} (${sizeFormatted}, ${ext.toUpperCase()})]`;
    pageCount = 1;
  } else {
    extractedText = buffer.toString('utf-8').slice(0, 50000);
  }

  // Create preview snippet for chat prompt context
  const textSnippet =
    extractedText.length > 3000
      ? `${extractedText.slice(0, 3000)}\n\n[... content truncated for brevity, ${extractedText.length} total characters ...]`
      : extractedText;

  return {
    id,
    name: originalFilename,
    mimeType: declaredMimeType || `application/${ext}`,
    extension: ext,
    sizeBytes,
    sizeFormatted,
    extractedText,
    textSnippet,
    pageCount,
    isPdf,
    isImage,
    forensics,
    uploadedAt,
  };
}
