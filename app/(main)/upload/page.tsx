'use client';

import {
  upload,
  ImageKitAbortError,
  ImageKitInvalidRequestError,
  ImageKitServerError,
  ImageKitUploadNetworkError,
  Image,
} from '@imagekit/next';
import { useRef, useState } from 'react';

export default function UploadPage() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const abortController = new AbortController();

  const handleUpload = async () => {
    const file = fileInputRef.current?.files?.[0];
    if (!file) return;

    // 1. Get auth params from your API
    const authRes = await fetch('/api/upload-auth');
    if (!authRes.ok) throw new Error('Auth failed');
    const { token, expire, signature, publicKey } = await authRes.json();

    // 2. Call upload with explicit auth fields
    const response = await upload({
      file,
      fileName: file.name,
      folder: '/portfolio/test',
      token,
      expire,
      signature,
      publicKey,
      onProgress: (event) => {
        setProgress((event.loaded / event.total) * 100);
      },
      abortSignal: abortController.signal,
    });

    setUploadedUrl(response.url ?? null);
  };


  return (
    <div>
      <input type="file" ref={fileInputRef} />
      <button type="button" onClick={handleUpload}>
        Upload
      </button>
      <p>Progress: {progress}%</p>

      {uploadedUrl && (
        <div className="mt-4">
          <p>Uploaded image:</p>
          <Image
            width={500}
            height={500}
            src={uploadedUrl}
            alt="Uploaded"
            className="max-w-sm"
          />
        </div>
      )}
    </div>
  );
}
