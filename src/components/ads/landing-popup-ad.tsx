"use client";

import { useEffect } from "react";

const POPUP_SCRIPT_ID = "landing-popup-ad";
const POPUP_SCRIPT_SRC =
  "https://pl30382443.effectivecpmnetwork.com/d5/60/0e/d5600ef201e610d81d07bd12ec5b43bc.js";

function injectPopupScript() {
  document.getElementById(POPUP_SCRIPT_ID)?.remove();

  const script = document.createElement("script");
  script.id = POPUP_SCRIPT_ID;
  script.src = POPUP_SCRIPT_SRC;
  script.async = true;
  document.body.appendChild(script);
}

export function LandingPopupAd() {
  useEffect(() => {
    const showPopup = () => {
      injectPopupScript();
    };

    const delayMs = 500;
    let timeoutId: ReturnType<typeof setTimeout>;

    const schedulePopup = () => {
      timeoutId = setTimeout(showPopup, delayMs);
    };

    if (document.readyState === "complete") {
      schedulePopup();
    } else {
      window.addEventListener("load", schedulePopup, { once: true });
    }

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("load", schedulePopup);
    };
  }, []);

  return null;
}
