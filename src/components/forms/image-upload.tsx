"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ImageUploadProps {
  previewUrl?: string;
  file: File | null;
  onChange: (file: File | null, previewUrl: string) => void;
  error?: string;
}

export function ImageUpload({ previewUrl, file, onChange, error }: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [localPreview, setLocalPreview] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (localPreview?.startsWith("blob:")) {
        URL.revokeObjectURL(localPreview);
      }
    };
  }, [localPreview]);

  const handleFile = useCallback(
    (selected: File) => {
      const url = URL.createObjectURL(selected);
      setLocalPreview(url);
      onChange(selected, url);
    },
    [onChange]
  );

  const handleClear = () => {
    if (localPreview?.startsWith("blob:")) {
      URL.revokeObjectURL(localPreview);
    }
    setLocalPreview(null);
    onChange(null, "");
    if (inputRef.current) inputRef.current.value = "";
  };

  const displayUrl = localPreview ?? previewUrl;

  return (
    <div className="space-y-2">
      {displayUrl ? (
        <div className="relative aspect-video w-full max-w-md overflow-hidden rounded-xl border border-hairline">
          <Image src={displayUrl} alt="Cover preview" fill className="object-cover" unoptimized={displayUrl.startsWith("blob:")} />
          <Button
            type="button"
            variant="secondary"
            size="icon"
            className="absolute right-2 top-2 h-8 w-8"
            onClick={handleClear}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className={cn(
            "flex aspect-video w-full max-w-md flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-hairline bg-surface-indigo/50 transition-colors hover:bg-surface-indigo",
            error && "border-destructive"
          )}
        >
          <Upload className="h-8 w-8 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            Click to upload cover image
          </span>
        </button>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const selected = e.target.files?.[0];
          if (selected) handleFile(selected);
        }}
      />
      {file && (
        <p className="text-xs text-muted-foreground">{file.name}</p>
      )}
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
