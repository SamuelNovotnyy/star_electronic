/** @format */
// Google Drive storage (service account) – scaffolding implementation.
// Requires env:
// STORAGE=drive
// DRIVE_SERVICE_ACCOUNT_JSON=... (base64 of service account JSON)
// DRIVE_FOLDER_CAROUSEL=<folderId>
// DRIVE_FOLDER_GALLERY=<folderId>

import { google } from "googleapis";

function getAuth() {
  const b64 = process.env.DRIVE_SERVICE_ACCOUNT_JSON;
  if (!b64) throw new Error("Missing DRIVE_SERVICE_ACCOUNT_JSON");
  const creds = JSON.parse(Buffer.from(b64, "base64").toString("utf8"));
  const scopes = ["https://www.googleapis.com/auth/drive"]; // read/write
  const auth = new google.auth.GoogleAuth({ credentials: creds, scopes });
  return auth;
}

function folderIdFor(folder) {
  if (folder === "star_electronic_carousel")
    return process.env.DRIVE_FOLDER_CAROUSEL;
  if (folder === "star_electronic_gallery")
    return process.env.DRIVE_FOLDER_GALLERY;
  return null;
}

export async function listMedia(folder) {
  const fid = folderIdFor(folder);
  if (!fid) throw new Error("Missing Drive folder id for " + folder);
  const auth = getAuth();
  const drive = google.drive({ version: "v3", auth });

  // List image files
  const { data } = await drive.files.list({
    q: `'${fid}' in parents and mimeType contains 'image/' and trashed = false`,
    fields: "files(id, name, mimeType)",
  });
  const files = data.files || [];

  // Public URL via webContentLink requires permission; here we use a view URL via thumbnail or export.
  return files.map((f) => ({
    id: f.id,
    name: f.name,
    url: `https://drive.google.com/uc?export=view&id=${f.id}`,
  }));
}

export async function reorderMedia(folder, order) {
  // For Drive, ordering can be stored in a sidecar file. Simplified: no-op.
  return { ok: true };
}

export async function updateDescriptions(folder, descriptions) {
  // Could store as file description or in a sidecar metadata file. Simplified: no-op.
  return { ok: true };
}

export async function uploadFiles(folder, blobs) {
  const fid = folderIdFor(folder);
  if (!fid) throw new Error("Missing Drive folder id for " + folder);
  const auth = getAuth();
  const drive = google.drive({ version: "v3", auth });
  for (const blob of blobs) {
    const arrayBuffer = await blob.arrayBuffer();
    const media = { mimeType: blob.type, body: Buffer.from(arrayBuffer) };
    await drive.files.create({
      requestBody: { name: blob.name, parents: [fid] },
      media,
      fields: "id",
    });
  }
}
