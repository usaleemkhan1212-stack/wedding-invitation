"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, MotionConfig } from "framer-motion";
import { OpeningGate } from "@/components/OpeningGate";
import { Hero } from "@/components/Hero";
import { MusicPlayer, type MusicPlayerHandle } from "@/components/MusicPlayer";

const STORAGE_KEY = "invitation-opened";

/**
 * Owns the "opened" state: shows the sealed opening screen first, then
 * reveals the hero and the rest of the invitation (passed as children).
 */
export function InvitationShell({ children, footer }: { children: React.ReactNode; footer: React.ReactNode }) {
  const [opened, setOpened] = useState(false);
  // True when a returning visitor skips the gate: remove it without its exit animation.
  const [skipGate, setSkipGate] = useState(false);
  const musicRef = useRef<MusicPlayerHandle>(null);

  // Returning visitors in the same tab skip the opening screen.
  useEffect(() => {
    // The invitation should always start from the top, not a restored position.
    history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
    try {
      if (sessionStorage.getItem(STORAGE_KEY) === "1") {
        setSkipGate(true);
        setOpened(true);
      }
    } catch {
      /* storage unavailable */
    }
  }, []);

  // Lock page scroll while the gate is showing.
  useEffect(() => {
    document.documentElement.style.overflow = opened ? "" : "hidden";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [opened]);

  const open = useCallback(() => {
    // Start the music inside the tap itself, so the browser allows sound.
    musicRef.current?.play();
    setOpened(true);
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* storage unavailable */
    }
    // Move keyboard/screen-reader focus to the invitation heading.
    window.setTimeout(() => document.getElementById("hero-title")?.focus({ preventScroll: true }), 400);
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      {!skipGate && <AnimatePresence>{!opened && <OpeningGate key="gate" onOpen={open} />}</AnimatePresence>}

      <main id="top" inert={!opened} className="relative">
        <Hero opened={opened} />
        {children}
      </main>
      <div inert={!opened}>{footer}</div>
      <MusicPlayer ref={musicRef} visible={opened} />
    </MotionConfig>
  );
}
