import { NextResponse } from "next/server";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

import { getFirebaseDbClient } from "@/lib/firebase/client";
import type { ImportProjectPayload, ImportProjectResponse, StudioProject } from "@/lib/types/recap-project";

export const runtime = "nodejs";

type ImportRequestBody = {
  contentType?: unknown;
  downloadURL?: unknown;
  fileName?: unknown;
  fileSize?: unknown;
  sourceUrl?: unknown;
  storagePath?: unknown;
  type?: unknown;
};

function isHttpUrl(value: unknown): value is string {
  if (typeof value !== "string") {
    return false;
  }

  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function validateImportPayload(body: ImportRequestBody): ImportProjectPayload {
  if (body.type === "url" && isHttpUrl(body.sourceUrl)) {
    return {
      sourceUrl: body.sourceUrl,
      type: "url"
    };
  }

  if (
    body.type === "file" &&
    typeof body.fileName === "string" &&
    typeof body.fileSize === "number" &&
    typeof body.contentType === "string" &&
    typeof body.storagePath === "string" &&
    isHttpUrl(body.downloadURL)
  ) {
    return {
      contentType: body.contentType,
      downloadURL: body.downloadURL,
      fileName: body.fileName,
      fileSize: body.fileSize,
      storagePath: body.storagePath,
      type: "file"
    };
  }

  throw new Error("Invalid import payload. Submit a valid video URL or uploaded Firebase Storage file details.");
}

function toStudioProject(id: string, payload: ImportProjectPayload): StudioProject {
  const createdAt = new Date().toISOString();

  if (payload.type === "file") {
    return {
      createdAt,
      id,
      sourceLabel: payload.fileName,
      status: "imported",
      title: payload.fileName,
      type: "file"
    };
  }

  return {
    createdAt,
    id,
    sourceLabel: payload.sourceUrl,
    status: "imported",
    title: new URL(payload.sourceUrl).hostname,
    type: "url"
  };
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ImportRequestBody;
    const payload = validateImportPayload(body);
    const db = getFirebaseDbClient();

    const document = {
      ...payload,
      createdAt: serverTimestamp(),
      status: "imported",
      submittedAt: serverTimestamp(),
      type: payload.type,
      updatedAt: serverTimestamp()
    };

    const projectRef = await addDoc(collection(db, "recap_projects"), document);
    const response: ImportProjectResponse = {
      project: toStudioProject(projectRef.id, payload)
    };

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to create recap project.";
    const status = message.startsWith("Invalid import payload") ? 400 : 500;

    return NextResponse.json({ error: message }, { status });
  }
}
