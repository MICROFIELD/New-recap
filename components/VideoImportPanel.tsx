"use client";

import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import type { ChangeEvent, FormEvent } from "react";
import { useMemo, useState } from "react";

import { getFirebaseStorageClient } from "@/lib/firebase/client";
import { createImportProject } from "@/lib/recap/import-project";
import type { StudioProject } from "@/lib/types/recap-project";

type VideoImportPanelProps = {
  onProjectCreated: (project: StudioProject) => void;
};

type ProcessingMode = "file" | "url" | null;

function sanitizeFileName(fileName: string) {
  return fileName.replace(/[^a-zA-Z0-9._-]/g, "-").replace(/-+/g, "-").toLowerCase();
}

export function VideoImportPanel({ onProjectCreated }: VideoImportPanelProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState("");
  const [processingMode, setProcessingMode] = useState<ProcessingMode>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const isProcessing = processingMode !== null;
  const fileSizeLabel = useMemo(() => {
    if (!selectedFile) {
      return null;
    }

    return `${(selectedFile.size / 1024 / 1024).toFixed(1)} MB`;
  }, [selectedFile]);

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0] ?? null;
    setErrorMessage(null);
    setSuccessMessage(null);
    setUploadProgress(0);

    if (file && !file.type.startsWith("video/")) {
      setSelectedFile(null);
      setErrorMessage("Please choose a valid video file.");
      return;
    }

    setSelectedFile(file);
  }

  async function handleFileSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!selectedFile) {
      setErrorMessage("Select a video file before uploading.");
      return;
    }

    setProcessingMode("file");
    setErrorMessage(null);
    setSuccessMessage(null);
    setUploadProgress(1);

    try {
      const storage = getFirebaseStorageClient();
      const storagePath = `recap-videos/${Date.now()}-${crypto.randomUUID()}-${sanitizeFileName(selectedFile.name)}`;
      const storageRef = ref(storage, storagePath);
      const uploadTask = uploadBytesResumable(storageRef, selectedFile, {
        contentType: selectedFile.type
      });

      await new Promise<void>((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            setUploadProgress(progress);
          },
          reject,
          resolve
        );
      });

      const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
      const project = await createImportProject({
        contentType: selectedFile.type,
        downloadURL,
        fileName: selectedFile.name,
        fileSize: selectedFile.size,
        storagePath,
        type: "file"
      });

      onProjectCreated(project);
      setSuccessMessage("Video uploaded and project created in Firestore.");
      setSelectedFile(null);
      setUploadProgress(100);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Unable to upload video.");
    } finally {
      setProcessingMode(null);
    }
  }

  async function handleUrlSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedUrl = videoUrl.trim();

    if (!trimmedUrl) {
      setErrorMessage("Paste a video URL before submitting.");
      return;
    }

    try {
      const url = new URL(trimmedUrl);

      if (url.protocol !== "http:" && url.protocol !== "https:") {
        throw new Error("Use an http or https video URL.");
      }
    } catch {
      setErrorMessage("Enter a valid http or https video URL.");
      return;
    }

    setProcessingMode("url");
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const project = await createImportProject({ sourceUrl: trimmedUrl, type: "url" });
      onProjectCreated(project);
      setSuccessMessage("URL submitted and project created in Firestore.");
      setVideoUrl("");
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Unable to submit video URL.");
    } finally {
      setProcessingMode(null);
    }
  }

  return (
    <section className="glass-card rounded-[2rem] p-5" id="import">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-cyan-100/80">Step 01</p>
          <h2 className="mt-1 text-2xl font-black tracking-tight">Import video</h2>
        </div>
        <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-bold text-white/70">Upload or URL</span>
      </div>

      <form className="mt-5" onSubmit={handleFileSubmit}>
        <label className="flex min-h-44 cursor-pointer flex-col items-center justify-center rounded-[1.75rem] border border-dashed border-white/30 bg-white/10 px-5 text-center transition active:scale-[0.99]">
          <input accept="video/*" className="sr-only" disabled={isProcessing} onChange={handleFileChange} type="file" />
          <span className="grid h-14 w-14 place-items-center rounded-2xl bg-cyan-300/20 text-3xl">
            {processingMode === "file" ? <Spinner /> : "⇧"}
          </span>
          <span className="mt-4 text-lg font-black">{selectedFile ? selectedFile.name : "Tap to upload video"}</span>
          <span className="mt-1 text-sm text-white/60">
            {fileSizeLabel ? `${fileSizeLabel} selected` : "MP4, MOV, WebM • optimized for mobile recaps"}
          </span>
        </label>

        {processingMode === "file" && (
          <div className="mt-4">
            <div className="flex justify-between text-xs font-bold text-white/60">
              <span>Uploading to Firebase Storage</span>
              <span>{uploadProgress}%</span>
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-cyan-300 to-fuchsia-300 transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          </div>
        )}

        <button
          className="touch-target mt-4 w-full rounded-3xl bg-cyan-200 px-5 text-sm font-black text-studio-ink transition active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
          disabled={!selectedFile || isProcessing}
          type="submit"
        >
          {processingMode === "file" ? "Uploading..." : "Upload file to Firebase"}
        </button>
      </form>

      <form className="mt-4 rounded-3xl border border-white/12 bg-black/15 p-3" onSubmit={handleUrlSubmit}>
        <label className="text-xs font-bold uppercase tracking-[0.2em] text-white/45" htmlFor="video-url">
          Paste video URL
        </label>
        <div className="mt-2 flex gap-2">
          <input
            className="min-h-12 flex-1 rounded-2xl border border-white/10 bg-white/10 px-4 text-sm text-white outline-none placeholder:text-white/35 focus:border-cyan-200/60 disabled:opacity-50"
            disabled={isProcessing}
            id="video-url"
            onChange={(event) => setVideoUrl(event.target.value)}
            placeholder="https://youtube.com/shorts/..."
            type="url"
            value={videoUrl}
          />
          <button
            className="touch-target rounded-2xl bg-white px-4 text-sm font-black text-studio-ink transition active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={!videoUrl.trim() || isProcessing}
            type="submit"
          >
            {processingMode === "url" ? <Spinner /> : "Add"}
          </button>
        </div>
      </form>

      {(errorMessage || successMessage) && (
        <p className={`mt-4 rounded-2xl px-4 py-3 text-sm font-semibold ${errorMessage ? "bg-red-400/15 text-red-100" : "bg-emerald-300/15 text-emerald-100"}`}>
          {errorMessage ?? successMessage}
        </p>
      )}
    </section>
  );
}

function Spinner() {
  return <span className="h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent" aria-label="Loading" />;
}
