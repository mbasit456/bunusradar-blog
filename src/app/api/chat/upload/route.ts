import { NextRequest, NextResponse } from 'next/server';
import { processUploadedFile } from '@/lib/documentParser';
import { saveUploadedDocument, getUploadedDocument } from '@/lib/documentStore';
import { compareDocumentVersions } from '@/lib/pdfForensics';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

const MAX_FILE_SIZE = 25 * 1024 * 1024; // 25 MB
const ALLOWED_EXTENSIONS = new Set([
  'pdf',
  'docx',
  'doc',
  'txt',
  'md',
  'csv',
  'tsv',
  'json',
  'png',
  'jpg',
  'jpeg',
  'webp',
]);

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const rawFiles = formData.getAll('files');
    const clientTempIds = formData.getAll('clientTempIds').map(id => String(id));

    const files: File[] = [];
    if (rawFiles && rawFiles.length > 0) {
      for (const item of rawFiles) {
        if (item && typeof item === 'object' && 'arrayBuffer' in item) {
          files.push(item as File);
        }
      }
    }

    if (files.length === 0) {
      const singleFile = formData.get('file');
      if (singleFile && typeof singleFile === 'object' && 'arrayBuffer' in singleFile) {
        files.push(singleFile as File);
      }
    }

    if (files.length === 0) {
      return NextResponse.json({ error: 'No files provided for upload.' }, { status: 400 });
    }

    if (files.length > 5) {
      return NextResponse.json({ error: 'Maximum 5 files can be uploaded per message.' }, { status: 400 });
    }

    const processedDocs = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const clientTempId = clientTempIds[i] || undefined;
      const originalName = file.name || 'document';
      let ext = (originalName.split('.').pop() || '').toLowerCase();

      // If ext is missing or not recognized, infer from MIME type
      if (!ext || ext === originalName.toLowerCase() || !ALLOWED_EXTENSIONS.has(ext)) {
        const mime = (file.type || '').toLowerCase();
        if (mime.includes('pdf')) ext = 'pdf';
        else if (mime.includes('wordprocessingml') || mime.includes('officedocument')) ext = 'docx';
        else if (mime.includes('msword')) ext = 'doc';
        else if (mime.includes('png')) ext = 'png';
        else if (mime.includes('jpeg') || mime.includes('jpg')) ext = 'jpg';
        else if (mime.includes('webp')) ext = 'webp';
        else if (mime.includes('csv')) ext = 'csv';
        else if (mime.includes('markdown')) ext = 'md';
        else if (mime.includes('text/plain')) ext = 'txt';
        else if (mime.includes('json')) ext = 'json';
        else ext = ext || 'txt';
      }

      if (!ALLOWED_EXTENSIONS.has(ext)) {
        ext = 'txt';
      }

      if (file.size > MAX_FILE_SIZE) {
        return NextResponse.json(
          {
            error: `File "${originalName}" exceeds the maximum allowed size limit of 25MB.`,
          },
          { status: 400 }
        );
      }

      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      try {
        const processed = await processUploadedFile(buffer, originalName, file.type || `application/${ext}`);
        saveUploadedDocument(processed, buffer);
        processedDocs.push({
          ...processed,
          clientTempId,
        });
      } catch (procErr: any) {
        return NextResponse.json(
          { error: `Error processing "${originalName}": ${procErr.message}` },
          { status: 422 }
        );
      }
    }

    // If exactly 2 PDFs are uploaded, compute a multi-version structural comparison automatically
    let comparison = null;
    const pdfDocs = processedDocs.filter(d => d.isPdf && d.forensics);
    if (pdfDocs.length === 2 && pdfDocs[0].forensics && pdfDocs[1].forensics) {
      comparison = compareDocumentVersions(
        pdfDocs[0].forensics,
        pdfDocs[0].extractedText,
        pdfDocs[1].forensics,
        pdfDocs[1].extractedText
      );
    }

    return NextResponse.json({
      success: true,
      documents: processedDocs,
      comparison,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'Server error while processing uploaded files.' },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const fileId = searchParams.get('fileId');
    const isDownload = searchParams.get('download') === 'true';

    if (!fileId) {
      return NextResponse.json({ error: 'Missing fileId parameter.' }, { status: 400 });
    }

    // Prevent path traversal
    const safeFileId = fileId.replace(/[^a-zA-Z0-9_-]/g, '');
    const record = getUploadedDocument(safeFileId);

    if (!record) {
      return NextResponse.json({ error: 'File not found or upload session expired.' }, { status: 404 });
    }

    const { metadata, buffer } = record;
    const dispositionType = isDownload ? 'attachment' : 'inline';
    const safeFileName = metadata.name.replace(/[^a-zA-Z0-9._-]/g, '_');

    return new NextResponse(new Uint8Array(buffer), {
      status: 200,
      headers: {
        'Content-Type': metadata.mimeType || 'application/octet-stream',
        'Content-Disposition': `${dispositionType}; filename="${safeFileName}"`,
        'Content-Length': buffer.length.toString(),
        'Cache-Control': 'private, max-age=3600',
        'X-Content-Type-Options': 'nosniff',
      },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Failed to serve document.' }, { status: 500 });
  }
}
