"use client";

import { useEffect } from "react";
import { onAdQueueIdle } from "@/components/ads/ad-script-queue";

interface ExternalAdScriptProps {
  src: string;
  id: string;
  delayMs?: number;
}

export function ExternalAdScript({ src, id, delayMs = 0 }: ExternalAdScriptProps) {
  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    const loadScript = () => {
      if (document.getElementById(id)) return;

      const script = document.createElement("script");
      script.id = id;
      script.src = src;
      script.async = true;
      document.body.appendChild(script);
    };

    const scheduleLoad = () => {
      timeoutId = setTimeout(loadScript, delayMs);
    };

    onAdQueueIdle(scheduleLoad);

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      document.getElementById(id)?.remove();
    };
  }, [src, id, delayMs]);

  return null;
}
