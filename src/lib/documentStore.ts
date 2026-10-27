import fs from 'fs';
import path from 'path';
import os from 'os';
import { ProcessedDocument } from './documentParser';

interface StoredFileRecord {
  metadata: ProcessedDocument;
  buffer: Buffer;
  expiresAt: number;
}

const FILE_TTL_MS = 2 * 60 * 60 * 1000; // 2 hours
const MAX_CACHE_ENTRIES = 50;

// In-memory store
const memoryStore = new Map<string, StoredFileRecord>();

const TEMP_STORAGE_DIR = path.join(os.tmpdir(), 'gravity_secure_docs');

function ensureTempDir(): string {
  if (!fs.existsSync(TEMP_STORAGE_DIR)) {
    fs.mkdirSync(TEMP_STORAGE_DIR, { recursive: true });
  }
  return TEMP_STORAGE_DIR;
}

// Cleanup expired files
function pruneExpiredFiles(): void {
  const now = Date.now();
  Array.from(memoryStore.entries()).forEach(([id, record]) => {
    if (record.expiresAt < now) {
      memoryStore.delete(id);
      try {
        const filePath = path.join(TEMP_STORAGE_DIR, `${id}.bin`);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      } catch {
        // Ignore file unlink errors
      }
    }
  });

  // Cap size
  if (memoryStore.size > MAX_CACHE_ENTRIES) {
    const oldestKey = memoryStore.keys().next().value;
    if (oldestKey) {
      memoryStore.delete(oldestKey);
    }
  }
}

export function saveUploadedDocument(doc: ProcessedDocument, buffer: Buffer): void {
  pruneExpiredFiles();

  const expiresAt = Date.now() + FILE_TTL_MS;

  memoryStore.set(doc.id, {
    metadata: doc,
    buffer,
    expiresAt,
  });

  try {
    const dir = ensureTempDir();
    // Sanitize ID
    const safeId = doc.id.replace(/[^a-zA-Z0-9_-]/g, '');
    const diskPath = path.join(dir, `${safeId}.bin`);
    fs.writeFileSync(diskPath, buffer);
  } catch {
    // If disk write fails, memoryStore still serves the document
  }
}

export function getUploadedDocument(fileId: string): { metadata: ProcessedDocument; buffer: Buffer } | null {
  pruneExpiredFiles();

  const record = memoryStore.get(fileId);
  if (record) {
    return { metadata: record.metadata, buffer: record.buffer };
  }

  // Fallback to disk
  try {
    const safeId = fileId.replace(/[^a-zA-Z0-9_-]/g, '');
    const diskPath = path.join(TEMP_STORAGE_DIR, `${safeId}.bin`);
    if (fs.existsSync(diskPath)) {
      const buf = fs.readFileSync(diskPath);
      return {
        metadata: {
          id: safeId,
          name: 'document.pdf',
          mimeType: 'application/pdf',
          extension: 'pdf',
          sizeBytes: buf.length,
          sizeFormatted: `${(buf.length / 1024).toFixed(1)} KB`,
          extractedText: '',
          textSnippet: '',
          pageCount: 1,
          isPdf: true,
          isImage: false,
          uploadedAt: new Date().toISOString(),
        },
        buffer: buf,
      };
    }
  } catch {
    return null;
  }

  return null;
}
