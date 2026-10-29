"use client";

import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from "react";
import { wedding } from "@/config/wedding";

/** The small part of the YouTube IFrame API used here. */
type YTPlayer = {
  playVideo: () => void;
  pauseVideo: () => void;
  setVolume: (volume: number) => void;
  destroy: () => void;
};

type YTNamespace = {
  Player: new (
    element: HTMLElement,
    options: {
      videoId: string;
      width: number;
      height: number;
      playerVars: Record<string, number | string>;
      events: {
        onReady: () => void;
        onStateChange: (event: { data: number }) => void;
      };
    },
  ) => YTPlayer;
  PlayerState: { PLAYING: number; PAUSED: number; ENDED: number };
};

declare global {
  interface Window {
    YT?: YTNamespace;
    onYouTubeIframeAPIReady?: () => void;
  }
}

let apiPromise: Promise<YTNamespace> | null = null;

function loadYouTubeApi(): Promise<YTNamespace> {
  if (window.YT?.Player) return Promise.resolve(window.YT);
  if (!apiPromise) {
    apiPromise = new Promise((resolve) => {
      const previous = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        previous?.();
        resolve(window.YT!);
      };
      const script = document.createElement("script");
      script.src = "https://www.youtube.com/iframe_api";
      script.async = true;
      document.head.appendChild(script);
    });
  }
  return apiPromise;
}

export type MusicPlayerHandle = { play: () => void };

/**
 * Hidden YouTube player for background music plus a floating play/pause
 * button. Call `play()` from a user gesture (the seal tap) so browsers allow sound.
 */
export const MusicPlayer = forwardRef<MusicPlayerHandle, { visible: boolean }>(function MusicPlayer({ visible }, ref) {
  const { music } = wedding;
  const hostRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YTPlayer | null>(null);
  const readyRef = useRef(false);
  const pendingPlayRef = useRef(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!music.enabled || !hostRef.current) return;
    let cancelled = false;
    const mount = document.createElement("div");
    hostRef.current.appendChild(mount);

    loadYouTubeApi().then((YT) => {
      if (cancelled) return;
      playerRef.current = new YT.Player(mount, {
        videoId: music.youtubeId,
        width: 1,
        height: 1,
        playerVars: {
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          loop: 1,
          playlist: music.youtubeId, // required for `loop` to work on a single video
          start: music.startSeconds,
          playsinline: 1,
          rel: 0,
        },
        events: {
          onReady: () => {
            readyRef.current = true;
            playerRef.current?.setVolume(music.volume);
            if (pendingPlayRef.current) playerRef.current?.playVideo();
          },
          onStateChange: ({ data }) => {
            if (data === YT.PlayerState.PLAYING) setPlaying(true);
            if (data === YT.PlayerState.PAUSED || data === YT.PlayerState.ENDED) setPlaying(false);
          },
        },
      });
    });

    return () => {
      cancelled = true;
      playerRef.current?.destroy();
      playerRef.current = null;
      readyRef.current = false;
    };
  }, [music.enabled, music.youtubeId, music.startSeconds, music.volume]);

  const play = useCallback(() => {
    if (readyRef.current) playerRef.current?.playVideo();
    else pendingPlayRef.current = true;
  }, []);

  useImperativeHandle(ref, () => ({ play }), [play]);

  if (!music.enabled) return null;

  return (
    <>
      {/* Off-screen host for the YouTube iframe; it must exist (not display:none) to play. */}
      <div
        ref={hostRef}
        aria-hidden="true"
        className="pointer-events-none fixed -left-[9999px] top-0 h-px w-px overflow-hidden opacity-0 [&_iframe]:h-px [&_iframe]:w-px"
      />
      {visible && (
        <button
          type="button"
          onClick={() => (playing ? playerRef.current?.pauseVideo() : play())}
          aria-label={playing ? music.pauseLabel : music.playLabel}
          aria-pressed={playing}
          className="fixed bottom-4 right-4 z-40 grid h-12 w-12 place-items-center rounded-full bg-royal-800 text-gold-200 shadow-[0_10px_24px_-8px_rgba(30,15,51,0.7)] ring-1 ring-gold-300/60 transition hover:bg-royal-900 active:scale-95"
        >
          {playing ? (
            <span className="flex h-4 items-end gap-[3px]" aria-hidden="true">
              <span className="music-bar w-[3px] bg-current" />
              <span className="music-bar w-[3px] bg-current [animation-delay:-0.3s]" />
              <span className="music-bar w-[3px] bg-current [animation-delay:-0.6s]" />
            </span>
          ) : (
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
              <path d="M9 18V6l10-2v12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
              <circle cx="6.5" cy="18" r="2.5" />
              <circle cx="16.5" cy="16" r="2.5" />
            </svg>
          )}
        </button>
      )}
    </>
  );
});
