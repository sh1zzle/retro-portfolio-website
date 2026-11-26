"use client";

import dynamic from "next/dynamic";
import { useSyncExternalStore } from "react";

const MicroSlats = dynamic(() => import("@/app/_components/micro-slats"), { ssr: false });

/* Below tablet width the window covers nearly the whole screen, so the
   effect would only cost battery. Without WebGL2 the slats cannot draw,
   and the CSS wallpaper (with its dot grid) stays as the background. */
const WIDE = "(min-width: 768px)";

let webgl2: boolean | null = null;
function supportsWebGL2() {
  if (webgl2 === null) {
    try {
      webgl2 = document.createElement("canvas").getContext("webgl2") !== null;
    } catch {
      webgl2 = false;
    }
  }
  return webgl2;
}

function subscribe(onChange: () => void) {
  const query = window.matchMedia(WIDE);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}
const shouldRender = () => window.matchMedia(WIDE).matches && supportsWebGL2();
const onServer = () => false;

/* Animated wallpaper layer: Micro Slats drawn transparently over the
   cream wallpaper, in a warm low-contrast tone with orange glints. */
export default function DesktopSlats() {
  const on = useSyncExternalStore(subscribe, shouldRender, onServer);
  if (!on) return null;
  return (
    <div className="desktop-slats" aria-hidden>
      <MicroSlats
        preset="tide"
        speed={0}
        color="#b3a285"
        fog={0.15}
        perspective={0}
        glintColor="#f49a3a"
        backgroundColor="transparent"
        slatWidth={5}
        slatHeight={5}
        gap={7}
        roundness={1}
        hoverScale={1}
        hoverRadius={70}
      />
    </div>
  );
}
