import type { ImportProjectPayload, ImportProjectResponse } from "@/lib/types/recap-project";

export async function createImportProject(payload: ImportProjectPayload) {
  const response = await fetch("/api/import", {
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json"
    },
    method: "POST"
  });

  const data = (await response.json()) as ImportProjectResponse | { error?: string };

  if (!response.ok || !("project" in data)) {
    throw new Error("error" in data && data.error ? data.error : "Import request failed.");
  }

  return data.project;
}
