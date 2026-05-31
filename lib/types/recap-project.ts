export type RecapImportType = "file" | "url";

export type RecapProjectStatus = "imported" | "queued" | "processing" | "failed";

export type FileImportPayload = {
  type: "file";
  fileName: string;
  fileSize: number;
  contentType: string;
  storagePath: string;
  downloadURL: string;
};

export type UrlImportPayload = {
  type: "url";
  sourceUrl: string;
};

export type ImportProjectPayload = FileImportPayload | UrlImportPayload;

export type StudioProject = {
  id: string;
  title: string;
  type: RecapImportType;
  status: RecapProjectStatus;
  createdAt: string;
  sourceLabel: string;
};

export type ImportProjectResponse = {
  project: StudioProject;
};
